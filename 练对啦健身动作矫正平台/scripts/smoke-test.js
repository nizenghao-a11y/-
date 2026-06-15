const { spawn } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const NODE = process.execPath;
const PORT = 5199;

const child = spawn(NODE, ["server.js"], {
  cwd: ROOT,
  env: {
    ...process.env,
    PORT: String(PORT),
    DATA_FILE: "data/smoke-test-data.json"
  },
  stdio: ["ignore", "pipe", "pipe"]
});

let childOutput = "";
child.stdout.on("data", chunk => {
  childOutput += chunk.toString();
});
child.stderr.on("data", chunk => {
  childOutput += chunk.toString();
});

async function get(pathname) {
  const response = await fetch(`http://127.0.0.1:${PORT}${pathname}`);
  const text = await response.text();
  if (!response.ok) throw new Error(`${pathname}: ${response.status}`);
  return text;
}

async function waitForServer() {
  const started = Date.now();
  while (Date.now() - started < 6000) {
    try {
      await get("/api/health");
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
  throw new Error(`server did not start: ${childOutput}`);
}

function includesAll(source, values, label) {
  for (const value of values) {
    if (!source.includes(value)) throw new Error(`${label} missing: ${value}`);
  }
}

function excludesAll(source, values, label) {
  for (const value of values) {
    if (source.includes(value)) throw new Error(`${label} should not include: ${value}`);
  }
}

async function run() {
  await waitForServer();

  const html = await get("/");
  const appJs = await get("/app.js");
  const css = await get("/styles.css");

  includesAll(html, ["练对啦｜健身动作点评"], "html");
  includesAll(appJs, ["练习", "练对", "论坛", "我的"], "bottom tabs");
  includesAll(appJs, ["器械怎么用？", "动作库", "正在筹备"], "practice");

  includesAll(appJs, [
    "{ id: \"home\", label: \"首页\" }",
    "{ id: \"create\", label: \"发单\" }",
    "{ id: \"market\", label: \"接单\", reviewerOnly: true }",
    "{ id: \"orders\", label: \"订单\" }",
    "renderLianduiHome",
    "renderLianduiCreate",
    "renderLianduiMarket",
    "renderLianduiOrders"
  ], "liandui structure");

  includesAll(appJs, [
    "练对啦温馨提示",
    "我要找人看动作",
    "开始发单",
    "服务声明",
    "查看全文",
    "下单前请确认",
    "我已阅读并理解，自愿下单"
  ], "liandui home");

  includesAll(appJs, [
    "选择主品类",
    "附加服务多选",
    "加价备注",
    "上传素材",
    "提交订单",
    "自主加价",
    "15字备注"
  ], "create flow");

  includesAll(appJs, [
    "器械使用求教",
    "免费 ¥0",
    "支持单张或多张图片",
    "不可选附加服务",
    "不可自主加价",
    "力训 & 功能动作点评",
    "体态 & 肌肉综合分析",
    "职业劳损 & 运动疼痛建议",
    "动作代偿专项分析",
    "呼吸模式 & 发力联动点评",
    "关键帧 / 剪辑标注分析",
    "订单完成、取消、退款或仲裁结束后 24 小时内删除本地临时素材"
  ], "pricing model");

  includesAll(appJs, [
    "接单广场",
    "只展示与你资质匹配的订单",
    "自主加价",
    "康复高门槛",
    "立即接单",
    "该订单已被接走或取消"
  ], "market");

  includesAll(appJs, [
    "待接单",
    "点评中",
    "待补充素材",
    "待验收",
    "售后 / 仲裁",
    "重新上传视频（补拍）",
    "提交补充素材"
  ], "orders");

  excludesAll(appJs, [
    "职业病康复",
    "器械使用求教\" },",
    "selectedPackage",
    "selectedOrderType",
    "packageId",
    "orderTypes"
  ], "legacy");

  includesAll(css, [
    ".price-total-card",
    ".category-option",
    ".addon-option",
    ".bonus-box",
    ".remark-box",
    ".specialty-card",
    ".market-card"
  ], "styles");

  const messageResponse = await fetch(`http://127.0.0.1:${PORT}/api/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user-id": "u_buyer"
    },
    body: JSON.stringify({
      receiverId: "u_enthusiast",
      content: "测试私信"
    })
  });
  if (messageResponse.status !== 410) {
    throw new Error("private message API should stay disabled");
  }

  console.log("Smoke test passed");
}

run()
  .catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    child.kill();
  });
