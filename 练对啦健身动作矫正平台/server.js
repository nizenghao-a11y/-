const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const DATA_FILE = process.env.DATA_FILE
  ? path.resolve(ROOT, process.env.DATA_FILE)
  : path.join(ROOT, "data", "app-data.json");
const DATA_DIR = path.dirname(DATA_FILE);
const PUBLIC_DIR = path.join(ROOT, "public");
const PORT = Number(process.env.PORT || 5173);

const BODY_PARTS = [
  "胸",
  "背",
  "肩",
  "手臂",
  "腿臀",
  "核心",
  "瑜伽体态",
  "其他"
];

const ACTION_CATEGORIES = {
  "胸": ["整体胸大肌", "上胸", "中胸", "下胸", "胸小肌", "前锯肌", "推类复合"],
  "背": [
    "整体背阔肌",
    "上背",
    "下背",
    "上斜方肌",
    "下斜方肌",
    "菱形肌",
    "大圆肌",
    "竖脊肌",
    "后链复合",
    "拉类复合"
  ],
  "肩": ["整体三角肌", "前束", "中束", "后束", "肩袖稳定", "推举复合"],
  "手臂": ["肱二头肌", "肱三头肌", "肱肌", "前臂屈肌", "前臂伸肌", "握力"],
  "臀腿": [
    "臀大肌",
    "臀中肌",
    "股四头肌",
    "大腿后侧链",
    "腘绳肌",
    "内收肌",
    "小腿",
    "髋主导复合",
    "膝主导复合"
  ],
  "核心": ["腹直肌", "腹横肌", "腹斜肌", "抗旋转", "抗伸展", "骨盆稳定"],
  "有氧": ["低强度有氧", "间歇冲刺", "跳绳", "跑步", "划船机", "椭圆机"],
  "拉伸": ["胸肩拉伸", "背部拉伸", "髋屈肌拉伸", "腘绳肌拉伸", "踝灵活", "脊柱活动"]
};

function flattenActionCategories() {
  return Object.entries(ACTION_CATEGORIES).flatMap(([group, children]) => {
    return children.map(name => `${group}/${name}`);
  });
}

function now() {
  return new Date().toISOString();
}

function id(prefix) {
  return `${prefix}_${crypto.randomBytes(5).toString("hex")}`;
}

function money(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function seedData() {
  const createdAt = now();
  return {
    meta: {
      version: 1,
      platformRevenue: 0,
      orderServiceRevenue: 0,
      actionTipServiceRevenue: 0,
      createdAt
    },
    users: [
      {
        id: "u_buyer",
        nickname: "刘晨",
        role: "user",
        userType: "normal",
        profileCompleted: true,
        trainingYears: 2,
        strengthTags: ["核心"],
        coachCertStatus: "none",
        accountStatus: "normal",
        createdAt
      },
      {
        id: "u_enthusiast",
        nickname: "阿杰",
        role: "user",
        userType: "normal",
        profileCompleted: true,
        trainingYears: 6,
        strengthTags: ["胸", "背"],
        coachCertStatus: "none",
        accountStatus: "normal",
        createdAt
      },
      {
        id: "u_coach",
        nickname: "王教练",
        role: "user",
        userType: "coach",
        profileCompleted: true,
        trainingYears: 9,
        strengthTags: ["腿臀", "肩", "瑜伽体态"],
        coachCertStatus: "approved",
        accountStatus: "normal",
        createdAt
      },
      {
        id: "u_new",
        nickname: "新用户",
        role: "user",
        userType: "normal",
        profileCompleted: false,
        trainingYears: 0,
        strengthTags: [],
        coachCertStatus: "none",
        accountStatus: "normal",
        createdAt
      },
      {
        id: "u_admin",
        nickname: "平台管理员",
        role: "admin",
        userType: "admin",
        profileCompleted: true,
        trainingYears: 0,
        strengthTags: [],
        coachCertStatus: "none",
        accountStatus: "normal",
        createdAt
      }
    ],
    wallets: [
      { userId: "u_buyer", balance: 500, frozen: 0 },
      { userId: "u_enthusiast", balance: 80, frozen: 0 },
      { userId: "u_coach", balance: 120, frozen: 0 },
      { userId: "u_new", balance: 200, frozen: 0 },
      { userId: "u_admin", balance: 0, frozen: 0 }
    ],
    walletTransactions: [],
    videoRequests: [],
    standardActions: [
      {
        id: "act_bent_row",
        coachUserId: "u_coach",
        actionName: "俯身杠铃划船",
        muscleGroup: "背",
        categoryTags: ["背/整体背阔肌", "背/上背", "背/菱形肌", "臀腿/大腿后侧链", "臀腿/髋主导复合"],
        movementType: "多关节复合",
        equipment: "杠铃",
        difficulty: "中级",
        videoUrl: "",
        gifUrl: "",
        coverUrl: "",
        keyPoints: "髋部折叠，脊柱保持中立位；杠铃沿大腿前侧上拉到下腹；肩胛先后缩再带动手肘。",
        status: "approved",
        isFeatured: true,
        tipTotal: 0,
        tipCount: 0,
        createdAt
      },
      {
        id: "act_lat_pulldown",
        coachUserId: "u_coach",
        actionName: "高位下拉",
        muscleGroup: "背",
        categoryTags: ["背/整体背阔肌", "背/大圆肌", "背/下斜方肌"],
        movementType: "垂直拉",
        equipment: "固定器械",
        difficulty: "新手",
        videoUrl: "",
        gifUrl: "",
        coverUrl: "",
        keyPoints: "保持胸椎微伸展，先下沉肩胛，再用肘部向身体两侧下拉。",
        status: "approved",
        isFeatured: true,
        tipTotal: 0,
        tipCount: 0,
        createdAt
      }
    ],
    actionTips: [],
    applications: [],
    reviewOrders: [],
    reviews: [],
    votes: [],
    arbitrations: [],
    chatPermissions: [],
    messages: []
  };
}

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData(), null, 2), "utf8");
  }
}

function loadDb() {
  ensureDataFile();
  const db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  normalizeDb(db);
  return db;
}

function saveDb(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
}

function normalizeDb(db) {
  db.meta = db.meta || {};
  db.meta.platformRevenue = money(db.meta.platformRevenue || 0);
  db.meta.orderServiceRevenue = money(db.meta.orderServiceRevenue || db.meta.platformRevenue || 0);
  db.meta.actionTipServiceRevenue = money(db.meta.actionTipServiceRevenue || 0);
  db.standardActions = db.standardActions || seedData().standardActions;
  db.actionTips = db.actionTips || [];
  db.wallets = db.wallets || [];
  db.walletTransactions = db.walletTransactions || [];
  db.videoRequests = db.videoRequests || [];
  db.applications = db.applications || [];
  db.reviewOrders = db.reviewOrders || [];
  db.reviews = db.reviews || [];
  db.votes = db.votes || [];
  db.arbitrations = db.arbitrations || [];
  db.chatPermissions = db.chatPermissions || [];
  db.messages = db.messages || [];
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function sendError(res, status, message, details) {
  sendJson(res, status, { error: message, details });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", chunk => {
      raw += chunk;
      if (raw.length > 1024 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(new Error("JSON 格式错误"));
      }
    });
  });
}

function getActor(req, db) {
  const userId = req.headers["x-user-id"] || "u_buyer";
  const user = db.users.find(item => item.id === userId);
  if (!user) {
    const error = new Error("用户不存在");
    error.statusCode = 401;
    throw error;
  }
  return user;
}

function getWallet(db, userId) {
  let wallet = db.wallets.find(item => item.userId === userId);
  if (!wallet) {
    wallet = { userId, balance: 0, frozen: 0 };
    db.wallets.push(wallet);
  }
  return wallet;
}

function addTx(db, userId, type, amount, remark, refId) {
  const wallet = getWallet(db, userId);
  db.walletTransactions.unshift({
    id: id("tx"),
    userId,
    type,
    amount: money(amount),
    balanceAfter: money(wallet.balance),
    frozenAfter: money(wallet.frozen),
    remark,
    refId,
    createdAt: now()
  });
}

function assertNormalAccount(user) {
  if (user.accountStatus !== "normal") {
    const error = new Error("账号状态异常，暂不可操作");
    error.statusCode = 403;
    throw error;
  }
}

function canReviewRequest(user, request) {
  if (!user.profileCompleted) {
    return { ok: false, reason: "请先完善主页资料" };
  }
  if (user.accountStatus !== "normal") {
    return { ok: false, reason: "账号状态异常" };
  }
  if (request.buyerUserId === user.id) {
    return { ok: false, reason: "不能接自己的需求" };
  }
  if (request.requestType === "private_refine") {
    const approved = user.userType === "coach" && user.coachCertStatus === "approved";
    if (!approved) {
      return { ok: false, reason: "私密精修仅限认证教练" };
    }
  }
  return { ok: true };
}

function canViewRequest(user, request, db) {
  if (user.role === "admin") return true;
  if (request.requestType === "public_bounty") return true;
  if (request.buyerUserId === user.id) return true;
  return db.reviewOrders.some(order => {
    return order.requestId === request.id && order.reviewerUserId === user.id;
  });
}

function normalizeBodyPart(value) {
  return BODY_PARTS.includes(value) ? value : "其他";
}

function normalizeActionTags(tags, muscleGroup) {
  const allowed = new Set(flattenActionCategories());
  const incoming = Array.isArray(tags) ? tags : [];
  const normalized = incoming
    .map(item => String(item || "").trim())
    .filter(item => allowed.has(item));
  if (normalized.length) return Array.from(new Set(normalized));
  const fallbackGroup = ACTION_CATEGORIES[muscleGroup] ? muscleGroup : "背";
  return [`${fallbackGroup}/${ACTION_CATEGORIES[fallbackGroup][0]}`];
}

function canUploadStandardAction(user) {
  return user.role === "admin" || (user.userType === "coach" && user.coachCertStatus === "approved");
}

function publicRequestPayload(request, user, db) {
  if (canViewRequest(user, request, db)) return request;
  return {
    id: request.id,
    requestType: request.requestType,
    bodyPart: request.bodyPart,
    status: request.status,
    hidden: true
  };
}

function settleOrder(db, order, resultType, refundAmount) {
  const request = db.videoRequests.find(item => item.id === order.requestId);
  const refund = money(Math.max(0, Math.min(refundAmount || 0, order.amount)));
  const settledAmount = money(order.amount - refund);
  const buyerWallet = getWallet(db, order.buyerUserId);
  const reviewerWallet = getWallet(db, order.reviewerUserId);

  buyerWallet.frozen = money(buyerWallet.frozen - order.amount);
  if (refund > 0) {
    buyerWallet.balance = money(buyerWallet.balance + refund);
    addTx(db, order.buyerUserId, "refund", refund, "点评订单退款", order.id);
  }

  if (settledAmount > 0) {
    const platformFee = money(settledAmount * 0.2);
    const reviewerIncome = money(settledAmount - platformFee);
    reviewerWallet.balance = money(reviewerWallet.balance + reviewerIncome);
    db.meta.platformRevenue = money(db.meta.platformRevenue + platformFee);
    db.meta.orderServiceRevenue = money((db.meta.orderServiceRevenue || 0) + platformFee);
    addTx(db, order.reviewerUserId, "income", reviewerIncome, "点评收入到账", order.id);
    order.platformFee = platformFee;
    order.reviewerIncome = reviewerIncome;
  } else {
    order.platformFee = 0;
    order.reviewerIncome = 0;
  }

  addTx(db, order.buyerUserId, "escrow_release", -money(order.amount - refund), "托管资金处理完成", order.id);
  order.status = resultType;
  order.completedAt = now();
  if (request) updateRequestStatus(db, request);
}

function updateRequestStatus(db, request) {
  const orders = db.reviewOrders.filter(order => order.requestId === request.id);
  const activeOrders = orders.filter(order => !["refunded", "cancelled"].includes(order.status));
  const doneOrders = activeOrders.filter(order => {
    return ["completed", "partial_refunded"].includes(order.status);
  });

  if (request.status === "cancelled") return;
  if (activeOrders.length > 0 && doneOrders.length === activeOrders.length && request.closedAt) {
    request.status = "completed";
  } else if (request.selectedCount >= request.reviewerLimit) {
    request.status = "filled";
  } else if (request.closedAt) {
    request.status = "closed";
  } else {
    request.status = "open";
  }
}

function computeLeaderboards(db) {
  const rows = [];
  for (const request of db.videoRequests) {
    if (request.requestType !== "public_bounty") continue;
    const orders = db.reviewOrders.filter(order => {
      return order.requestId === request.id && ["completed", "partial_refunded"].includes(order.status);
    });
    const reviewIds = orders.map(order => order.reviewId).filter(Boolean);
    const reviews = db.reviews.filter(review => reviewIds.includes(review.id));
    const avgReviewScore = reviews.length
      ? reviews.reduce((sum, review) => sum + Number(review.score || 0), 0) / reviews.length
      : 0;
    const votes = db.votes.filter(vote => vote.requestId === request.id);
    const correctVotes = votes.filter(vote => vote.voteType === "correct").length;
    const problemVotes = votes.filter(vote => vote.voteType === "problem").length;
    const totalVotes = correctVotes + problemVotes;
    const voteRatio = totalVotes ? correctVotes / totalVotes : 0;
    const hotScore = Math.min(totalVotes, 20) / 20;
    const score = money((avgReviewScore / 5) * 40 + voteRatio * 40 + hotScore * 20);
    rows.push({
      requestId: request.id,
      title: request.videoTitle,
      buyerUserId: request.buyerUserId,
      bodyPart: request.bodyPart,
      score,
      avgReviewScore: money(avgReviewScore),
      correctVotes,
      problemVotes,
      reviewCount: reviews.length
    });
  }

  const grouped = {};
  for (const part of BODY_PARTS) {
    const partRows = rows
      .filter(row => row.bodyPart === part)
      .sort((a, b) => b.score - a.score)
      .map((row, index) => ({ ...row, rank: index + 1 }));
    if (partRows.length) grouped[part] = partRows;
  }
  return grouped;
}

function buildMinePayload(db, actor) {
  const wallet = getWallet(db, actor.id);
  const userOrdersAsBuyer = db.reviewOrders.filter(order => order.buyerUserId === actor.id);
  const userOrdersAsProvider = db.reviewOrders.filter(order => order.reviewerUserId === actor.id);
  const uploadedActions = db.standardActions.filter(action => action.coachUserId === actor.id);
  const transactions = db.walletTransactions.filter(tx => tx.userId === actor.id);
  const approvedAssets = actor.profileCompleted ? 2 : 0;

  return {
    profile: {
      userId: actor.id,
      nickname: actor.nickname,
      avatarUrl: actor.avatarUrl || "",
      backgroundUrl: actor.backgroundUrl || "",
      userLevel: actor.userType === "coach" ? "大神" : actor.profileCompleted ? "爱好者" : "小白",
      profileStatus: actor.profileCompleted ? "已完善" : "未完善",
      qualificationStatus: actor.coachCertStatus === "approved" ? "通过" : actor.coachCertStatus === "pending" ? "审核中" : "未提交",
      canAcceptOrder: actor.userType === "coach" && actor.coachCertStatus === "approved",
      canUploadAction: actor.userType === "coach" && actor.coachCertStatus === "approved",
      trainingYears: actor.trainingYears || 0,
      strengthTags: actor.strengthTags || [],
      likes: actor.userType === "coach" ? 268 : 37,
      profileViews: actor.userType === "coach" ? 1820 : 240
    },
    auditCenter: {
      uploadRestrictedUntil: null,
      summary: {
        pending: 2,
        approved: approvedAssets,
        rejected: 1
      },
      assets: [
        {
          id: "asset_body_01",
          type: "身材实拍",
          status: "pending",
          rejectReason: "",
          createdAt: "2026-06-01T09:30:00.000Z"
        },
        {
          id: "asset_award_01",
          type: "获奖证明",
          status: "approved",
          rejectReason: "",
          createdAt: "2026-05-28T14:10:00.000Z"
        },
        {
          id: "asset_resume_01",
          type: "训练履历",
          status: "rejected",
          rejectReason: "图片不清晰，无法识别履历内容",
          createdAt: "2026-05-26T16:20:00.000Z"
        }
      ]
    },
    wallet: {
      availableBalance: money(wallet.balance),
      frozenBalance: money(wallet.frozen),
      withdrawableBalance: money(Math.max(0, wallet.balance - 10)),
      withdrawingBalance: 0,
      totalIncome: money(transactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0)),
      totalExpense: money(Math.abs(transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + tx.amount, 0))),
      withdrawRule: {
        minAmount: 10,
        feeText: "平台暂免提现手续费",
        arrivalText: "预计 T+1 到账，节假日顺延"
      },
      categories: [
        "赞赏收益",
        "点评佣金收益",
        "退款返还余额",
        "动作赞赏支出",
        "付费提问支出",
        "提现"
      ],
      transactions
    },
    orders: {
      asBuyer: userOrdersAsBuyer.map(order => ({
        id: order.id,
        role: "提问方",
        amount: order.amount,
        status: order.status,
        providerUserId: order.reviewerUserId,
        providerName: db.users.find(user => user.id === order.reviewerUserId)?.nickname || "",
        createdAt: order.createdAt,
        refundEnabled: ["accepted", "submitted", "arbitration"].includes(order.status)
      })),
      asProvider: userOrdersAsProvider.map(order => ({
        id: order.id,
        role: "接单方",
        amount: order.reviewerIncome,
        status: order.status,
        buyerUserId: order.buyerUserId,
        buyerName: db.users.find(user => user.id === order.buyerUserId)?.nickname || "",
        createdAt: order.createdAt
      }))
    },
    publications: {
      forumPosts: [
        {
          id: "post_001",
          title: "今天练背，划船终于找到发力感",
          type: "日常晒练帖",
          status: "已发布",
          createdAt: "2026-06-02T12:00:00.000Z"
        }
      ],
      questionPosts: [
        {
          id: "question_001",
          title: "深蹲膝盖内扣，求点评",
          type: "付费提问帖",
          status: "待接单",
          amount: 29,
          createdAt: "2026-06-03T08:00:00.000Z"
        }
      ],
      standardActions: uploadedActions.map(action => ({
        id: action.id,
        title: action.actionName,
        status: action.status,
        tipTotal: action.tipTotal || 0,
        categoryTags: action.categoryTags || [],
        editable: true
      }))
    },
    collections: [
      {
        id: "fav_001",
        title: "卧推动作科普：肩胛如何稳定",
        type: "动作科普帖",
        author: "王教练",
        createdAt: "2026-05-30T10:00:00.000Z"
      },
      {
        id: "fav_002",
        title: "硬拉圆背问题点评案例",
        type: "提问点评帖",
        author: "阿杰",
        createdAt: "2026-05-29T15:00:00.000Z"
      }
    ],
    support: {
      quickTags: ["提现问题", "订单退款", "资料审核", "动作上传申诉", "投诉举报"],
      tickets: [
        {
          id: "ticket_001",
          title: "动作上传审核进度咨询",
          status: "处理中",
          updatedAt: "2026-06-03T11:30:00.000Z"
        }
      ]
    },
    agreements: ["用户协议", "隐私政策", "付费规则", "分佣说明", "提现规则", "退款规则"]
  };
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(PUBLIC_DIR, requested));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const types = {
      ".html": "text/html; charset=utf-8",
      ".css": "text/css; charset=utf-8",
      ".js": "application/javascript; charset=utf-8",
      ".json": "application/json; charset=utf-8",
      ".svg": "image/svg+xml"
    };
    res.writeHead(200, {
      "Content-Type": types[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
}

async function routeApi(req, res) {
  const db = loadDb();
  const url = new URL(req.url, `http://${req.headers.host}`);
  const parts = url.pathname.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && url.pathname === "/api/health") {
      sendJson(res, 200, { ok: true, time: now() });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/bootstrap") {
      const actor = getActor(req, db);
      const requests = db.videoRequests.map(request => publicRequestPayload(request, actor, db));
      sendJson(res, 200, {
        actor,
        bodyParts: BODY_PARTS,
        actionCategories: ACTION_CATEGORIES,
        actionCategoryTags: flattenActionCategories(),
        users: db.users,
        wallets: db.wallets,
        walletTransactions: db.walletTransactions,
        videoRequests: requests,
        standardActions: db.standardActions,
        actionTips: db.actionTips,
        applications: db.applications,
        reviewOrders: db.reviewOrders,
        reviews: db.reviews,
        votes: db.votes,
        arbitrations: db.arbitrations,
        chatPermissions: db.chatPermissions,
        messages: db.messages,
        platformRevenue: db.meta.platformRevenue,
        orderServiceRevenue: db.meta.orderServiceRevenue,
        actionTipServiceRevenue: db.meta.actionTipServiceRevenue,
        leaderboards: computeLeaderboards(db)
      });
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/mine") {
      const actor = getActor(req, db);
      sendJson(res, 200, buildMinePayload(db, actor));
      return;
    }

    if (req.method === "PUT" && url.pathname === "/api/profile") {
      const actor = getActor(req, db);
      const body = await parseBody(req);
      actor.trainingYears = Math.max(0, Number(body.trainingYears || 0));
      actor.strengthTags = Array.isArray(body.strengthTags)
        ? body.strengthTags.map(normalizeBodyPart)
        : [];
      actor.profileCompleted = actor.trainingYears > 0 && actor.strengthTags.length > 0;
      actor.updatedAt = now();
      saveDb(db);
      sendJson(res, 200, { user: actor });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/actions") {
      const actor = getActor(req, db);
      assertNormalAccount(actor);
      if (!canUploadStandardAction(actor)) {
        sendError(res, 403, "仅认证教练或管理员可以上传标准动作");
        return;
      }
      const body = await parseBody(req);
      const muscleGroup = ACTION_CATEGORIES[body.muscleGroup] ? body.muscleGroup : "背";
      const actionName = String(body.actionName || "").trim();
      if (actionName.length < 2) {
        sendError(res, 400, "请填写动作名称");
        return;
      }
      const coachUserId = actor.role === "admin" && body.coachUserId
        ? String(body.coachUserId)
        : actor.id;
      const coach = db.users.find(user => user.id === coachUserId);
      if (!coach || !(coach.userType === "coach" && coach.coachCertStatus === "approved")) {
        sendError(res, 400, "请选择已认证教练作为动作发布者");
        return;
      }
      const action = {
        id: id("act"),
        coachUserId,
        actionName: actionName.slice(0, 60),
        muscleGroup,
        categoryTags: normalizeActionTags(body.categoryTags, muscleGroup),
        movementType: String(body.movementType || "未分类").slice(0, 40),
        equipment: String(body.equipment || "自重/通用").slice(0, 40),
        difficulty: String(body.difficulty || "新手").slice(0, 20),
        videoUrl: String(body.videoUrl || "").slice(0, 800),
        gifUrl: String(body.gifUrl || "").slice(0, 800),
        coverUrl: String(body.coverUrl || "").slice(0, 800),
        keyPoints: String(body.keyPoints || "").slice(0, 1000),
        status: actor.role === "admin" ? "approved" : "pending_review",
        isFeatured: Boolean(body.isFeatured && actor.role === "admin"),
        tipTotal: 0,
        tipCount: 0,
        createdAt: now()
      };
      db.standardActions.unshift(action);
      saveDb(db);
      sendJson(res, 201, { action });
      return;
    }

    if (req.method === "POST" && parts[1] === "actions" && parts[3] === "tip") {
      const actor = getActor(req, db);
      assertNormalAccount(actor);
      const action = db.standardActions.find(item => item.id === parts[2]);
      if (!action || action.status !== "approved") {
        sendError(res, 404, "动作不存在或未上架");
        return;
      }
      if (action.coachUserId === actor.id) {
        sendError(res, 400, "不能赞赏自己发布的动作");
        return;
      }
      const body = await parseBody(req);
      const amount = money(body.amount);
      if (amount <= 0) {
        sendError(res, 400, "赞赏金额必须大于 0");
        return;
      }
      const userWallet = getWallet(db, actor.id);
      if (userWallet.balance < amount) {
        sendError(res, 400, "余额不足，无法完成赞赏");
        return;
      }
      const platformFee = money(amount * 0.1);
      const coachIncome = money(amount - platformFee);
      const coachWallet = getWallet(db, action.coachUserId);
      userWallet.balance = money(userWallet.balance - amount);
      coachWallet.balance = money(coachWallet.balance + coachIncome);
      db.meta.platformRevenue = money(db.meta.platformRevenue + platformFee);
      db.meta.actionTipServiceRevenue = money((db.meta.actionTipServiceRevenue || 0) + platformFee);
      action.tipTotal = money((action.tipTotal || 0) + amount);
      action.tipCount = Number(action.tipCount || 0) + 1;
      const tip = {
        id: id("tip"),
        actionId: action.id,
        fromUserId: actor.id,
        coachUserId: action.coachUserId,
        amount,
        platformFee,
        coachIncome,
        createdAt: now()
      };
      db.actionTips.unshift(tip);
      addTx(db, actor.id, "action_tip", -amount, `赞赏标准动作：${action.actionName}`, tip.id);
      addTx(db, action.coachUserId, "action_tip_income", coachIncome, `标准动作赞赏收入：${action.actionName}`, tip.id);
      saveDb(db);
      sendJson(res, 201, { tip, action });
      return;
    }

    if (req.method === "POST" && parts[1] === "admin" && parts[2] === "actions" && parts[4] === "review") {
      const actor = getActor(req, db);
      if (actor.role !== "admin") {
        sendError(res, 403, "只有管理员可以审核动作");
        return;
      }
      const action = db.standardActions.find(item => item.id === parts[3]);
      if (!action) {
        sendError(res, 404, "动作不存在");
        return;
      }
      const body = await parseBody(req);
      action.status = body.status === "rejected" ? "rejected" : body.status === "offline" ? "offline" : "approved";
      action.isFeatured = Boolean(body.isFeatured);
      action.reviewedAt = now();
      action.reviewRemark = String(body.reviewRemark || "").slice(0, 300);
      saveDb(db);
      sendJson(res, 200, { action });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/requests") {
      const actor = getActor(req, db);
      assertNormalAccount(actor);
      if (!actor.profileCompleted) {
        sendError(res, 403, "请先完善主页资料");
        return;
      }
      const body = await parseBody(req);
      const pricePerReviewer = money(body.pricePerReviewer);
      const reviewerLimit = Math.max(1, Math.min(10, Number(body.reviewerLimit || 1)));
      if (pricePerReviewer <= 0) {
        sendError(res, 400, "单人点评佣金必须大于 0");
        return;
      }
      const requestType = body.requestType === "private_refine" ? "private_refine" : "public_bounty";
      const totalEscrow = money(pricePerReviewer * reviewerLimit);
      const wallet = getWallet(db, actor.id);
      if (wallet.balance < totalEscrow) {
        sendError(res, 400, "余额不足，无法托管该需求金额");
        return;
      }
      wallet.balance = money(wallet.balance - totalEscrow);
      wallet.frozen = money(wallet.frozen + totalEscrow);

      const request = {
        id: id("req"),
        buyerUserId: actor.id,
        videoTitle: String(body.videoTitle || "未命名动作视频").slice(0, 80),
        videoUrl: String(body.videoUrl || "").slice(0, 500),
        description: String(body.description || "").slice(0, 500),
        requestType,
        bodyPart: normalizeBodyPart(body.bodyPart),
        pricePerReviewer,
        reviewerLimit,
        selectedCount: 0,
        totalEscrow,
        status: "open",
        paidAt: now(),
        createdAt: now()
      };
      db.videoRequests.unshift(request);
      addTx(db, actor.id, "escrow_hold", -totalEscrow, "发布需求托管资金", request.id);
      saveDb(db);
      sendJson(res, 201, { request });
      return;
    }

    if (req.method === "POST" && parts[1] === "requests" && parts[3] === "apply") {
      const actor = getActor(req, db);
      assertNormalAccount(actor);
      const request = db.videoRequests.find(item => item.id === parts[2]);
      if (!request) {
        sendError(res, 404, "需求不存在");
        return;
      }
      const permission = canReviewRequest(actor, request);
      if (!permission.ok) {
        sendError(res, 403, permission.reason);
        return;
      }
      if (!["open", "filled"].includes(request.status) || request.selectedCount >= request.reviewerLimit) {
        sendError(res, 400, "该需求已停止接单");
        return;
      }
      const exists = db.applications.some(item => {
        return item.requestId === request.id && item.applicantUserId === actor.id;
      });
      if (exists) {
        sendError(res, 409, "你已申请过该需求");
        return;
      }
      const body = await parseBody(req);
      const application = {
        id: id("app"),
        requestId: request.id,
        applicantUserId: actor.id,
        note: String(body.note || "").slice(0, 300),
        status: "pending",
        createdAt: now()
      };
      db.applications.unshift(application);
      saveDb(db);
      sendJson(res, 201, { application });
      return;
    }

    if (req.method === "POST" && parts[1] === "applications" && parts[3] === "select") {
      const actor = getActor(req, db);
      const application = db.applications.find(item => item.id === parts[2]);
      if (!application) {
        sendError(res, 404, "申请不存在");
        return;
      }
      const request = db.videoRequests.find(item => item.id === application.requestId);
      if (!request) {
        sendError(res, 404, "需求不存在");
        return;
      }
      if (request.buyerUserId !== actor.id) {
        sendError(res, 403, "只有发布者可以选择点评人");
        return;
      }
      if (application.status !== "pending") {
        sendError(res, 400, "该申请已处理");
        return;
      }
      if (request.selectedCount >= request.reviewerLimit) {
        sendError(res, 400, "点评名额已满");
        return;
      }
      const reviewer = db.users.find(item => item.id === application.applicantUserId);
      const permission = canReviewRequest(reviewer, request);
      if (!permission.ok) {
        sendError(res, 403, permission.reason);
        return;
      }
      application.status = "selected";
      application.selectedAt = now();
      request.selectedCount += 1;

      const amount = request.pricePerReviewer;
      const order = {
        id: id("ord"),
        requestId: request.id,
        buyerUserId: request.buyerUserId,
        reviewerUserId: application.applicantUserId,
        applicationId: application.id,
        amount,
        platformFee: money(amount * 0.2),
        reviewerIncome: money(amount * 0.8),
        status: "accepted",
        createdAt: now(),
        acceptedAt: now()
      };
      db.reviewOrders.unshift(order);
      updateRequestStatus(db, request);
      saveDb(db);
      sendJson(res, 201, { order });
      return;
    }

    if (req.method === "POST" && parts[1] === "review-orders" && parts[3] === "submit") {
      const actor = getActor(req, db);
      const order = db.reviewOrders.find(item => item.id === parts[2]);
      if (!order) {
        sendError(res, 404, "点评订单不存在");
        return;
      }
      if (order.reviewerUserId !== actor.id) {
        sendError(res, 403, "只有接单点评人可以提交点评");
        return;
      }
      if (order.status !== "accepted") {
        sendError(res, 400, "当前状态不可提交点评");
        return;
      }
      const request = db.videoRequests.find(item => item.id === order.requestId);
      const body = await parseBody(req);
      const observations = Array.isArray(body.observations)
        ? body.observations.map(item => String(item).trim()).filter(Boolean).slice(0, 8)
        : [];
      const suggestion = String(body.suggestion || "").trim();
      const riskNote = String(body.riskNote || "").trim();
      const score = Math.max(1, Math.min(5, Number(body.score || 0)));
      if (!score) {
        sendError(res, 400, "请给出 1 到 5 星动作评分");
        return;
      }
      if (observations.length < 3 || suggestion.length < 6) {
        sendError(res, 400, "点评需至少包含 3 条具体观察和 1 条明确改进建议");
        return;
      }
      const review = {
        id: id("rev"),
        orderId: order.id,
        requestId: order.requestId,
        reviewerUserId: actor.id,
        reviewType: request && request.requestType === "private_refine" ? "refine" : "simple",
        score,
        observations,
        suggestion,
        riskNote,
        timelineMarks: Array.isArray(body.timelineMarks) ? body.timelineMarks.slice(0, 20) : [],
        createdAt: now()
      };
      db.reviews.unshift(review);
      order.reviewId = review.id;
      order.status = "submitted";
      order.submittedAt = now();
      saveDb(db);
      sendJson(res, 201, { review, order });
      return;
    }

    if (req.method === "POST" && parts[1] === "review-orders" && parts[3] === "confirm") {
      const actor = getActor(req, db);
      const order = db.reviewOrders.find(item => item.id === parts[2]);
      if (!order) {
        sendError(res, 404, "点评订单不存在");
        return;
      }
      if (order.buyerUserId !== actor.id) {
        sendError(res, 403, "只有下单用户可以验收");
        return;
      }
      if (order.status !== "submitted") {
        sendError(res, 400, "只有已提交点评可以验收");
        return;
      }
      settleOrder(db, order, "completed", 0);
      saveDb(db);
      sendJson(res, 200, { order });
      return;
    }

    if (req.method === "POST" && parts[1] === "review-orders" && parts[3] === "arbitrate") {
      const actor = getActor(req, db);
      const order = db.reviewOrders.find(item => item.id === parts[2]);
      if (!order) {
        sendError(res, 404, "点评订单不存在");
        return;
      }
      if (order.buyerUserId !== actor.id) {
        sendError(res, 403, "只有下单用户可以申请仲裁");
        return;
      }
      if (!["accepted", "submitted"].includes(order.status)) {
        sendError(res, 400, "当前状态不可申请仲裁");
        return;
      }
      const exists = db.arbitrations.find(item => item.orderId === order.id && item.status === "pending");
      if (exists) {
        sendError(res, 409, "该订单已有待处理仲裁");
        return;
      }
      const body = await parseBody(req);
      const arbitration = {
        id: id("arb"),
        orderId: order.id,
        requestId: order.requestId,
        applicantUserId: actor.id,
        reviewerUserId: order.reviewerUserId,
        reason: String(body.reason || "认为点评敷衍或缺乏客观性").slice(0, 600),
        status: "pending",
        createdAt: now()
      };
      db.arbitrations.unshift(arbitration);
      order.status = "arbitration";
      saveDb(db);
      sendJson(res, 201, { arbitration });
      return;
    }

    if (req.method === "POST" && parts[1] === "admin" && parts[2] === "arbitrations" && parts[4] === "resolve") {
      const actor = getActor(req, db);
      if (actor.role !== "admin") {
        sendError(res, 403, "只有管理员可以处理仲裁");
        return;
      }
      const arbitration = db.arbitrations.find(item => item.id === parts[3]);
      if (!arbitration) {
        sendError(res, 404, "仲裁不存在");
        return;
      }
      if (arbitration.status !== "pending") {
        sendError(res, 400, "仲裁已处理");
        return;
      }
      const order = db.reviewOrders.find(item => item.id === arbitration.orderId);
      if (!order || order.status !== "arbitration") {
        sendError(res, 400, "订单状态异常");
        return;
      }
      const body = await parseBody(req);
      const decision = body.decision || "no_refund";
      let refundAmount = 0;
      let finalStatus = "completed";
      if (decision === "full_refund") {
        refundAmount = order.amount;
        finalStatus = "refunded";
      } else if (decision === "partial_refund") {
        refundAmount = money(body.refundAmount || order.amount / 2);
        finalStatus = "partial_refunded";
      }
      settleOrder(db, order, finalStatus, refundAmount);
      arbitration.status = "resolved";
      arbitration.decision = decision;
      arbitration.refundAmount = refundAmount;
      arbitration.resolvedBy = actor.id;
      arbitration.resolvedAt = now();
      saveDb(db);
      sendJson(res, 200, { arbitration, order });
      return;
    }

    if (req.method === "POST" && parts[1] === "requests" && parts[3] === "vote") {
      const actor = getActor(req, db);
      assertNormalAccount(actor);
      const request = db.videoRequests.find(item => item.id === parts[2]);
      if (!request) {
        sendError(res, 404, "需求不存在");
        return;
      }
      if (request.requestType !== "public_bounty") {
        sendError(res, 403, "私密订单不可投票");
        return;
      }
      const body = await parseBody(req);
      const voteType = body.voteType === "problem" ? "problem" : "correct";
      const exists = db.votes.find(item => item.requestId === request.id && item.userId === actor.id);
      if (exists) {
        sendError(res, 409, "你已投票");
        return;
      }
      const vote = {
        id: id("vote"),
        requestId: request.id,
        userId: actor.id,
        voteType,
        createdAt: now()
      };
      db.votes.unshift(vote);
      saveDb(db);
      sendJson(res, 201, { vote });
      return;
    }

    if (req.method === "POST" && parts[1] === "requests" && parts[3] === "close") {
      const actor = getActor(req, db);
      const request = db.videoRequests.find(item => item.id === parts[2]);
      if (!request) {
        sendError(res, 404, "需求不存在");
        return;
      }
      if (request.buyerUserId !== actor.id) {
        sendError(res, 403, "只有发布者可以关闭需求");
        return;
      }
      if (request.closedAt) {
        sendError(res, 400, "需求已关闭");
        return;
      }
      const unusedSlots = Math.max(0, request.reviewerLimit - request.selectedCount);
      const refund = money(unusedSlots * request.pricePerReviewer);
      const wallet = getWallet(db, actor.id);
      if (refund > 0) {
        wallet.frozen = money(wallet.frozen - refund);
        wallet.balance = money(wallet.balance + refund);
        addTx(db, actor.id, "unused_escrow_refund", refund, "关闭需求退回未使用名额", request.id);
      }
      request.closedAt = now();
      updateRequestStatus(db, request);
      saveDb(db);
      sendJson(res, 200, { request, refund });
      return;
    }

    if (req.method === "POST" && url.pathname === "/api/messages") {
      sendError(res, 410, "私信体系已剔除，请使用订单内补充说明与客服仲裁");
      return;
    }

    if (req.method === "GET" && url.pathname === "/api/leaderboards") {
      sendJson(res, 200, { leaderboards: computeLeaderboards(db) });
      return;
    }

    sendError(res, 404, "接口不存在");
  } catch (error) {
    sendError(res, error.statusCode || 500, error.message || "服务器错误");
  }
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    routeApi(req, res);
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`练对啦基础软件已启动：http://localhost:${PORT}`);
});
