# 练对啦前端原型

这是一个零依赖 Node.js 静态原型，用来验证练对啦微信小程序的前端页面框架和核心业务路径。

当前版本已经从单一“练对”雏形升级为四个底部 Tab：

- 练习：器械怎么用、动作库正在筹备、专项入口
- 练对：发单、我的订单、交付标准、隐私单/公开单
- 论坛：分类榜单、动作案例广场、讨论区入口
- 我的：多身份申请、公开资质主页、订单、钱包、客服

## 运行

```powershell
& "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
```

打开：

```text
http://localhost:5173
```

## 验证

```powershell
& "C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" scripts\smoke-test.js
```

## 项目推进文件

- `AGENTS.md`：项目协作规则和不可跑偏边界
- `skills/lianduila-frontend-finalization/SKILL.md`：项目前端定型专用推进规则
- `docs/specs/00-FRONTEND_FINALIZATION_PROCESS.md`：前端定型总流程
- `docs/specs/01-PHASE-LIANDUI-CORE.md`：练对核心交易闭环
- `docs/specs/02-PHASE-MINE-CENTER.md`：我的账户中心
- `docs/specs/03-PHASE-PRACTICE-ENTRY.md`：练习入口和动作库筹备状态
- `docs/specs/04-PHASE-FORUM-RANKING.md`：论坛动作排名轻功能
- `docs/specs/05-PHASE-INTEGRATION-QA.md`：整合验收

## 产品边界

V1 不做：

- 私信聊天
- 粉丝关注体系
- 泛社区动态流
- AI 动作分析作为核心卖点
- 大型课程库
- 搬运版权视频

V1 保留入口但轻实现：

- 动作库
- 专业补充
- 广告合作
- 篮球、康复、跑步等专项扩展

## 说明

当前原型主要验证页面结构、模块位置、业务路径和后续扩展方式。它还没有接入真实微信登录、微信支付、视频存储、对象存储、后台审核和小程序端工程。
