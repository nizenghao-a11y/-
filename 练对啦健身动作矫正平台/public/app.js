const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

const state = {
  tab: "practice",
  lianduiView: "home",
  mainCategoryId: "",
  selectedAddOns: [],
  userBonus: 0,
  orderRemark: "想问器械名",
  votedSpecialties: [],
  privacy: "public",
  lianduiStep: 0,
  bodyPart: "背部",
  viewAngle: "正面",
  hasPain: false,
  questionPreset: "想知道名称",
  orderStatus: "pending",
  reshootCount: 1,
  reshootReason: "缺少侧面视角，请补拍侧面动作",
  ranking: "equipment",
  forumView: "categories",
  selectedIdentities: [],
  reviewerQualified: true,
  reviewerCerts: ["strength", "posture", "rehab"],
  marketSort: "latest",
  acceptingOrderId: "",
  acceptedOrderId: "",
  orderCreated: false
};

const tabs = [
  { id: "practice", label: "练习", icon: "book" },
  { id: "liandui", label: "练对", icon: "target" },
  { id: "forum", label: "论坛", icon: "rank" },
  { id: "mine", label: "我的", icon: "user" }
];

const lianduiViews = [
  { id: "home", label: "首页" },
  { id: "create", label: "发单" },
  { id: "market", label: "接单", reviewerOnly: true },
  { id: "orders", label: "订单" }
];

const marketOrders = [
  {
    id: "LD20260610-012",
    category: "器械使用求教",
    scene: "健身房器械",
    body: "器械名称",
    addOns: [],
    bonus: 0,
    remark: "想问器械名",
    price: 0,
    delivery: "24小时内",
    privacy: "公开单",
    requiredCerts: ["strength"],
    posted: "1分钟前",
    material: "多张图片"
  },
  {
    id: "LD20260610-018",
    category: "力训 & 功能动作点评",
    scene: "器械力量",
    body: "背部",
    addOns: ["动作代偿专项分析", "关键帧 / 剪辑标注"],
    bonus: 6,
    remark: "重点看肩",
    price: 30.9,
    delivery: "24小时内",
    privacy: "公开单",
    requiredCerts: ["strength"],
    posted: "3分钟前",
    material: "正面 + 侧面"
  },
  {
    id: "LD20260610-021",
    category: "体态 & 肌肉综合分析",
    scene: "体态力线",
    body: "肩颈",
    addOns: ["呼吸模式 & 发力联动点评"],
    bonus: 0,
    remark: "圆肩明显",
    price: 24.9,
    delivery: "48小时内",
    privacy: "隐私单",
    requiredCerts: ["posture"],
    posted: "7分钟前",
    material: "正面"
  },
  {
    id: "LD20260610-026",
    category: "职业劳损 & 运动疼痛建议",
    scene: "久坐劳损",
    body: "腰背",
    addOns: [],
    bonus: 0,
    remark: "久坐腰酸",
    price: 39.9,
    delivery: "48小时内",
    privacy: "隐私单",
    requiredCerts: ["rehab"],
    posted: "12分钟前",
    material: "侧面 + 描述"
  }
];

const mainCategories = [
  {
    id: "equipmentConsult",
    name: "器械使用求教",
    price: 0,
    desc: "陌生器械不会使用？支持单张或多张图片，咨询器械名称、使用方式与调节方法。",
    scope: "陌生器械不会操作、不会调节档位 / 角度、想查询器械名称的用户",
    delivery: "24 小时内",
    requiredCerts: ["strength"],
    freeLead: true,
    allowAddOns: false,
    allowBonus: false,
    materialName: "器械图片",
    materialHint: "支持单张或多张图片。请尽量拍到器械全貌、调节旋钮、坐垫和把手位置。",
    standards: ["免费订单，仅回答器械名称、基础使用方式与调节方法", "不可选附加服务，不可自主加价", "不承诺训练效果，不替代线下器械安全指导"]
  },
  {
    id: "strengthFunctional",
    name: "力训 & 功能动作点评",
    price: 9.9,
    desc: "覆盖器械、徒手基础、功能性动作纠错与指导。",
    scope: "健身新手、力量训练爱好者、居家功能训练人群",
    delivery: "24 小时内",
    requiredCerts: ["strength"],
    standards: ["结论必填：正确 / 基本正确 / 有问题 / 无法判断", "写 1 个做对的点或主要问题", "50-100 字，不承诺训练效果"]
  },
  {
    id: "postureMuscle",
    name: "体态 & 肌肉综合分析",
    price: 19.9,
    desc: "覆盖体态力线、肌肉强弱、形体差异、骨架/胚型观察。",
    scope: "关注形体、肌肉均衡、体态问题的用户",
    delivery: "24-48 小时",
    requiredCerts: ["posture"],
    standards: ["结论 + 正确点 + 问题点", "至少 2 条观察", "120-250 字，给 1 条改进建议"]
  },
  {
    id: "painRehab",
    name: "职业劳损 & 运动疼痛建议",
    price: 39.9,
    desc: "覆盖久坐劳损、运动疼痛、旧伤风险动作建议。",
    scope: "上班族、有旧伤或运动劳损风险人群",
    delivery: "48 小时内",
    requiredCerts: ["rehab"],
    standards: ["说明风险点和可做范围", "给出保守建议", "200-400 字，不替代线下诊断"]
  }
];

const addOnServices = [
  {
    id: "compensation",
    name: "动作代偿专项分析",
    price: 5,
    desc: "排查发力借力、关节代偿问题。"
  },
  {
    id: "breathingLink",
    name: "呼吸模式 & 发力联动点评",
    price: 5,
    desc: "优化训练呼吸节奏与发力配合。"
  },
  {
    id: "keyframe",
    name: "关键帧 / 剪辑标注分析",
    price: 5,
    desc: "使用慢放、关键帧、剪辑标注工具辅助分析，并提交关键时间点说明。",
    sensitiveMaterial: true
  }
];

const createMainCategories = mainCategories.filter(item => item.id !== "postureMuscle");

const specialtyPreviews = [
  { id: "basketball", name: "篮球投篮", count: 3260 },
  { id: "running", name: "跑步", count: 2140 },
  { id: "football", name: "足球", count: 980 },
  { id: "badminton", name: "羽毛球", count: 760 },
  { id: "tableTennis", name: "乒乓球", count: 520 },
  { id: "other", name: "其他", count: 310 }
];

const lianduiSceneEntries = [
  { categoryId: "strengthFunctional", title: "力训", desc: "器械、徒手基础、功能性动作" },
  { categoryId: "postureMuscle", title: "体态", desc: "力线、肌肉强弱、形体差异" },
  { categoryId: "painRehab", title: "防护", desc: "劳损、疼痛或旧伤风险建议" }
];

const lianduiSteps = ["选择主品类", "附加服务", "加价备注", "上传素材", "提交订单"];

const lianduiStepTips = [
  "请选择你的咨询类型",
  "仅付费品类可选，免费器械单会自动跳过",
  "加价不插队，短备注只给点评人快速扫单",
  "按当前品类上传图片或短视频",
  "确认服务边界、隐私方式和订单金额"
];

const lianduiDisclosureItems = [
  {
    title: "服务边界",
    text: "本平台提供运动动作观察、发力分析、训练技巧建议类线上服务，不属于医疗诊断、康复治疗，也不等同于线下面对面一对一私教指导。平台及点评人员不会出具疾病诊断结论，不提供用药、手术、临床治疗相关建议。"
  },
  {
    title: "客观限制",
    text: "线上点评会受视频清晰度、拍摄角度、动作完整性、个人身体基础、既往伤病、当日状态、训练环境、器械条件等因素影响。我们会尽力提供专业参考，但动作掌握和训练效果仍取决于用户理解、执行、训练频率与身体适应度，不作绝对效果承诺。"
  },
  {
    title: "分级服务",
    text: "常规动作可由认证爱好者或专业人员承接；专项动作优先匹配专项训练师；疼痛、术后恢复、陈旧损伤等康复类订单仅开放康复防护类身份。请按自身情况选择对应服务。"
  },
  {
    title: "安全与隐私",
    text: "训练中若出现持续疼痛、麻木、头晕、关节刺痛等不适，请立即停止训练并线下就医。上传的视频和身体相关描述仅用于本次点评，隐私单素材仅对对应点评人可见，未经同意不会公开为案例。"
  }
];

const lianduiDisclosurePreview = [
  {
    title: "下单前请了解",
    text: "练对啦提供动作点评和发力建议，不替代医生面诊或线下面对面私教。线上点评会受视频、身体状态、器械环境等客观因素影响。"
  },
  {
    title: "高风险情况",
    text: "疼痛、旧伤、术后恢复请优先选择康复防护类服务或线下康复服务。隐私单素材未经同意不会公开为案例。"
  }
];

const bodyPartOptions = ["背部", "胸肌", "肩部", "手臂", "臀腿", "核心", "体态", "篮球", "康复", "自定义动作"];

const viewAngleOptions = ["正面", "侧面", "45 度", "背面"];

const questionOptions = ["发力感不清楚", "怕动作错", "找不到目标肌群", "有代偿", "确认是否正确"];

const orderStatusTabs = [
  { id: "pending", label: "待接单" },
  { id: "reviewing", label: "点评中" },
  { id: "needMaterial", label: "待补充素材" },
  { id: "acceptance", label: "待验收" },
  { id: "completed", label: "已完成" },
  { id: "dispute", label: "售后 / 仲裁" }
];

const orderStatusTips = {
  pending: "订单已发布，等待合适的点评人接单",
  reviewing: "点评人正在分析动作，请耐心等待",
  needMaterial: "请按照要求补拍并上传动作视频",
  acceptance: "点评已完成，请查看并确认验收",
  completed: "订单已完成，资金已按规则结算",
  dispute: "订单存在争议，可申请平台介入"
};

const reshootReasons = [
  "视频画面模糊，无法判断动作",
  "缺少正面视角，请补拍正面动作",
  "缺少侧面视角，请补拍侧面动作",
  "视频时长过短/动作不完整",
  "补充说明：请把动作起始和结束都拍完整"
];

const practiceSections = [
  {
    title: "器械怎么用？",
    badge: "速查",
    desc: "健身房器械不会调、不会坐、不会发力，先来这里查。",
    items: ["高位下拉", "坐姿划船", "腿举机", "史密斯机", "夹胸器", "龙门架"]
  },
  {
    title: "动作库",
    badge: "正在筹备",
    desc: "从热身到专项训练，按练习场景找动作。",
    items: ["练前热身", "胸肌", "背部", "肩部", "手臂", "臀腿", "核心", "体态矫正", "篮球投篮", "康复训练", "跑步入门", "瑜伽拉伸"]
  },
  {
    title: "专项入口",
    badge: "分类总览",
    desc: "按专项方向快速找内容，后面扩展也按这套顺序走。",
    items: ["练前热身", "胸肌", "背部", "肩部", "手臂", "臀腿", "核心", "体态矫正", "篮球投篮", "康复训练", "跑步入门", "瑜伽拉伸"]
  }
];

const practiceEntryIdeas = [
  {
    title: "健身房速查",
    desc: "正在筹备"
  },
  {
    title: "新手别乱练清单",
    desc: "先看哪些动作最容易练错、最容易加重过头。"
  }
];

const rankingGroups = [
  { id: "equipment", name: "器械", title: "器械排行榜", desc: "健身房常见器械，先看好不好上手、好不好调、适不适合新手。", tags: ["新手友好", "好调节", "常见器械"] },
  { id: "movement", name: "动作", title: "动作排行榜", desc: "按肌群、目标和争议度看动作，先解决哪个动作更值得练。", tags: ["肌肥大", "发力感", "容易练错"] },
  { id: "creator", name: "健身博主", title: "健身博主排行榜", desc: "看内容是否讲得清楚、是否适合新手、是否有真实参考价值。", tags: ["讲解清楚", "新手适合", "争议度"] },
  { id: "supplement", name: "补剂", title: "补剂排行榜", desc: "先做用户评分和避坑，不做夸张功效承诺。", tags: ["性价比", "口碑", "避坑"] },
  { id: "protein", name: "蛋白粉", title: "蛋白粉排行榜", desc: "按口味、价格、配料和用户反馈做轻量排行。", tags: ["口味", "配料", "价格"] },
  { id: "fatloss", name: "减脂食物", title: "减脂食物排行榜", desc: "把常见减脂食物按饱腹感、便利性和热量友好度整理。", tags: ["饱腹感", "便利", "热量友好"] }
];

const rankingItemsByGroup = {
  equipment: [
    { name: "高位下拉器", score: 4.6, tags: ["背部", "好上手", "争议：背感"] },
    { name: "坐姿划船机", score: 4.4, tags: ["中背", "稳定", "新手友好"] },
    { name: "腿举机", score: 4.2, tags: ["臀腿", "安全感", "容易贪重"] }
  ],
  movement: [
    { name: "高位下拉", score: 4.7, tags: ["背阔肌", "新手常练", "争议高"] },
    { name: "上斜哑铃卧推", score: 4.5, tags: ["上胸", "自由重量", "动作门槛"] },
    { name: "罗马尼亚硬拉", score: 4.3, tags: ["腘绳肌", "臀腿", "技术要求"] }
  ],
  creator: [
    { name: "自然训练派", score: 4.5, tags: ["讲解清楚", "训练记录", "用户评分"] },
    { name: "器械教学派", score: 4.3, tags: ["器械细", "新手友好", "动作拆解"] },
    { name: "专项体能派", score: 4.1, tags: ["跑跳", "篮球", "功能性"] }
  ],
  supplement: [
    { name: "肌酸", score: 4.6, tags: ["常见", "性价比", "争议低"] },
    { name: "咖啡因", score: 4.2, tags: ["训练前", "注意耐受", "反馈分化"] },
    { name: "复合维生素", score: 3.8, tags: ["基础", "不神化", "看饮食"] }
  ],
  protein: [
    { name: "乳清蛋白", score: 4.5, tags: ["方便", "口味多", "看配料"] },
    { name: "分离乳清", score: 4.2, tags: ["乳糖友好", "价格高", "清淡"] },
    { name: "植物蛋白", score: 3.9, tags: ["素食", "口感差异", "看氨基酸"] }
  ],
  fatloss: [
    { name: "鸡胸肉", score: 4.4, tags: ["高蛋白", "便宜", "容易吃腻"] },
    { name: "希腊酸奶", score: 4.2, tags: ["方便", "看糖分", "饱腹"] },
    { name: "土豆", score: 4.1, tags: ["饱腹", "别油炸", "主食替换"] }
  ]
};

const identityGroups = [
  {
    title: "通用基础健身类",
    desc: "综合健身、器械力量和常规动作点评。",
    items: [
      { id: "fitness_coach", name: "健身教练（国职）", short: "健身教练", level: "初级 / 中级 / 高级", desc: "综合肌群动作教学、常规动作点评。", tags: ["国职", "全肌群", "常规动作"] },
      { id: "group_coach", name: "团体课教练", short: "团课教练", level: "入门 / 资深", desc: "有氧、操课类动作点评。", tags: ["有氧", "团课", "节奏动作"] },
      { id: "strength_trainer", name: "力量训练师", short: "力量训练师", level: "初级 / 中级 / 高级", desc: "器械力量、胸背腿等大肌群动作点评。", tags: ["器械", "胸背腿", "力量"] }
    ]
  },
  {
    title: "球类专项训练师",
    desc: "篮球优先，后续扩展主流球类专项。",
    items: [
      { id: "basketball_trainer", name: "篮球训练师", short: "篮球训练师", level: "助理 / 普通 / 高级", desc: "投篮、运球、篮下动作和篮球专项点评。", tags: ["篮球投篮", "核心主推", "专项单"] },
      { id: "football_trainer", name: "足球训练师", short: "足球训练师", level: "入门 / 资深", desc: "足球跑位、脚法和专项动作点评。", tags: ["足球", "脚法", "跑位"] },
      { id: "badminton_trainer", name: "羽毛球训练师", short: "羽毛球训练师", level: "入门 / 资深", desc: "挥拍、步伐和发力动作矫正。", tags: ["挥拍", "步伐", "专项"] },
      { id: "table_tennis_trainer", name: "乒乓球训练师", short: "乒乓训练师", level: "入门 / 资深", desc: "球拍发力、站姿和专项动作点评。", tags: ["乒乓", "站姿", "发力"] }
    ]
  },
  {
    title: "体能与功能训练类",
    desc: "热身、综合体能、跑姿和非器械训练。",
    items: [
      { id: "conditioning_trainer", name: "体能训练师", short: "体能训练师", level: "初级 / 中级 / 高级", desc: "热身、耐力、爆发力、综合体能点评。", tags: ["练前热身", "爆发力", "体能"] },
      { id: "functional_trainer", name: "功能性训练师", short: "功能训练师", level: "入门 / 资深", desc: "功能性动作、徒手训练和综合动作点评。", tags: ["功能训练", "徒手", "综合"] },
      { id: "running_trainer", name: "跑步专项训练师", short: "跑步训练师", level: "入门 / 资深", desc: "跑姿、呼吸、落地姿势矫正。", tags: ["跑步入门", "跑姿", "落地"] }
    ]
  },
  {
    title: "康复与体态防护类",
    desc: "高价值身份，适合体态、疼痛风险和康复训练场景。",
    items: [
      { id: "sports_rehab", name: "运动康复师（PT）", short: "运动康复师", level: "持证 / 资深", desc: "运动损伤修复、术后康复动作指导。", tags: ["康复训练", "高阶单", "持证"] },
      { id: "posture_corrector", name: "体态矫正师", short: "体态矫正师", level: "入门 / 资深", desc: "圆肩、驼背、骨盆前倾、高低肩等点评。", tags: ["体态矫正", "姿态", "核心垂类"] },
      { id: "sports_protector", name: "运动防护师", short: "运动防护师", level: "持证 / 资深", desc: "运动损伤预防、临场防护和运动急救指导。", tags: ["运动防护", "急救", "官方职业"] },
      { id: "fascia_therapist", name: "筋膜理疗师", short: "筋膜理疗师", level: "入门 / 资深", desc: "筋膜放松、肌肉紧张类动作与放松指导。", tags: ["筋膜", "放松", "紧张"] },
      { id: "postpartum_rehab", name: "产后康复训练师", short: "产后康复师", level: "持证 / 资深", desc: "产后体态、产后恢复动作专项点评。", tags: ["产后", "恢复", "小众刚需"] }
    ]
  },
  {
    title: "柔韧与休闲运动类",
    desc: "覆盖瑜伽、拉伸、普拉提等轻运动场景。",
    items: [
      { id: "yoga_trainer", name: "瑜伽训练师", short: "瑜伽训练师", level: "入门 / 资深", desc: "瑜伽体式、拉伸动作矫正。", tags: ["瑜伽拉伸", "体式", "柔韧"] },
      { id: "pilates_trainer", name: "普拉提训练师", short: "普拉提训练师", level: "入门 / 资深", desc: "普拉提动作、核心控制类动作点评。", tags: ["普拉提", "核心", "控制"] }
    ]
  },
  {
    title: "辅助科普类",
    desc: "补充专业维度，以论坛科普和答疑为主。",
    items: [
      { id: "sports_nutritionist", name: "运动营养师", short: "运动营养师", level: "持证 / 资深", desc: "结合训练给饮食建议，不参与纯动作点评。", tags: ["营养", "论坛科普", "不接动作单"] }
    ]
  },
  {
    title: "平台业余用户",
    desc: "无专业证书，按训练经历限制接单范围。",
    items: [
      { id: "training_enthusiast", name: "训练爱好者", short: "训练爱好者", level: "普通 / 认证", desc: "普通爱好者只能发单；认证后可接低价小额普通动作单。", tags: ["普通动作", "低价单", "日接单上限"] },
      { id: "sports_enthusiast", name: "球类 / 跑步专项爱好者", short: "专项爱好者", level: "平台审核", desc: "专项业余玩家，仅可承接对应专项低价订单。", tags: ["篮球", "跑步", "对应专项"] }
    ]
  }
];

function icon(name) {
  const paths = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 5.5v15"/><path d="M8 7h8"/><path d="M8 10h6"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/>',
    rank: '<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19H2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    lock: '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M20 16v4H4v-4"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
    wallet: '<path d="M4 7h15a2 2 0 0 1 2 2v9H4a2 2 0 0 1-2-2V5a2 2 0 0 0 2 2"/><path d="M16 13h2"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.chevron}</svg>`;
}

function money(value) {
  const number = Number(value);
  if (number === 0) return "¥0";
  return Number.isInteger(number) ? `¥${number}` : `¥${number.toFixed(1)}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function tag(text, tone = "") {
  return `<span class="tag ${tone}">${text}</span>`;
}

function panel(title, meta, body, className = "") {
  return `
    <section class="panel ${className}">
      <div class="panel-head">
        <h2>${title}</h2>
        ${meta ? `<span>${meta}</span>` : ""}
      </div>
      ${body}
    </section>
  `;
}

function pageShell(title, subtitle, body, heroClass = "") {
  return `
    <main class="screen">
      <header class="topbar">
        <div>
          <p>练对啦</p>
          <h1>${title}</h1>
          <span>${subtitle}</span>
        </div>
      </header>
      <div class="${heroClass}">
        ${body}
      </div>
    </main>
  `;
}

function selectedMainCategory() {
  return mainCategories.find(item => item.id === state.mainCategoryId) || null;
}

function selectedAddOnItems() {
  const category = selectedMainCategory();
  if (!category) return [];
  if (!category.allowAddOns && category.allowAddOns !== undefined) return [];
  return addOnServices.filter(item => state.selectedAddOns.includes(item.id));
}

function addOnTotal() {
  return selectedAddOnItems().reduce((sum, item) => sum + item.price, 0);
}

function normalizeBonus(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(50, Math.round(number)));
}

function cleanRemark(value) {
  return String(value || "").slice(0, 15);
}

function orderTotal() {
  const category = selectedMainCategory();
  if (!category) return 0;
  const bonus = category.allowBonus === false ? 0 : normalizeBonus(state.userBonus);
  return category.price + addOnTotal() + bonus;
}

function usesSensitiveMaterial() {
  return selectedAddOnItems().some(item => item.sensitiveMaterial);
}

function specialtyCount(item) {
  return item.count + (state.votedSpecialties.includes(item.id) ? 1 : 0);
}

function selectMainCategory(id) {
  const category = mainCategories.find(item => item.id === id);
  if (!category) return;
  state.mainCategoryId = id;
  if (category.allowAddOns === false) state.selectedAddOns = [];
  if (category.allowBonus === false) state.userBonus = 0;
  if (category.id === "painRehab") state.hasPain = true;
  if (category.id !== "painRehab") state.hasPain = false;
  if (category.id === "equipmentConsult" && !["想知道名称", "不会调节", "想问练哪里", "不会坐姿", "安全注意"].includes(state.questionPreset)) {
    state.questionPreset = "想知道名称";
  }
  if (category.id !== "equipmentConsult" && !questionOptions.includes(state.questionPreset)) {
    state.questionPreset = "发力感不清楚";
  }
}

function visibleLianduiViews() {
  return lianduiViews.filter(item => !item.reviewerOnly || state.reviewerQualified);
}

function reviewerCanSeeOrder(order) {
  if (!state.reviewerQualified) return false;
  if (order.requiredCerts.includes("rehab")) return state.reviewerCerts.includes("rehab");
  return true;
}

function visibleMarketOrders() {
  const orders = marketOrders.filter(order => reviewerCanSeeOrder(order) && state.acceptedOrderId !== order.id);
  if (state.marketSort === "priceDesc") {
    return [...orders].sort((a, b) => b.price - a.price);
  }
  return orders;
}

function acceptedMarketOrder() {
  return marketOrders.find(order => order.id === state.acceptedOrderId) || null;
}

function renderPractice() {
  return pageShell("练习", "不硬讲课，先把常用入口放清楚。", `
    <div class="module-grid">
      ${practiceSections.map(item => `
        <button class="module-card ${item.badge === "正在筹备" ? "locked" : ""}" ${item.targetTab ? `data-tab="${item.targetTab}"` : `data-toast="${item.badge === "正在筹备" ? item.title + "正在筹备" : "打开" + item.title}"`}>
          <div class="module-top">
            ${tag(item.badge, item.badge === "正在筹备" ? "warn" : "blue")}
            ${item.badge === "正在筹备" ? icon("lock") : icon("chevron")}
          </div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
          <div class="mini-tags">${item.items.map(text => `<span>${text}</span>`).join("")}</div>
        </button>
      `).join("")}
    </div>

    ${panel("更多入口", "", `
      <div class="idea-list">
        ${practiceEntryIdeas.map(item => `
          <button data-toast="${item.desc}">
            <strong>${item.title}</strong>
            <span>${item.desc}</span>
          </button>
        `).join("")}
      </div>
    `)}
  `);
}

function renderLianduiSubnav() {
  const views = visibleLianduiViews();
  return `
    <nav class="subnav" style="grid-template-columns: repeat(${views.length}, minmax(0, 1fr));" aria-label="练对内部导航">
      ${views.map(item => `
        <button class="${state.lianduiView === item.id ? "active" : ""}" data-liandui-view="${item.id}">${item.label}</button>
      `).join("")}
    </nav>
  `;
}

function renderLiandui() {
  const views = {
    home: renderLianduiHome,
    create: renderLianduiCreate,
    market: renderLianduiMarket,
    orders: renderLianduiOrders
  };
  return pageShell("练对", "拍一段动作，让合适的人帮你看清问题。", `
    ${renderLianduiSubnav()}
    ${(views[state.lianduiView] || renderLianduiHome)()}
  `);
}

function renderLianduiHome() {
  const disclosureItems = state.disclosureExpanded ? lianduiDisclosureItems : lianduiDisclosurePreview;
  return `
    <section class="notice-bar">
      ${icon("shield")}
      <span><strong>练对啦温馨提示</strong>我们专注于线上动作观察、发力分析与训练技巧建议，帮你看清问题、减少练偏。本服务不替代医疗诊断或线下面对面私教。训练中若出现疼痛、麻木等不适，请立即停止并线下就医。有旧伤或术后恢复情况，建议优先选择线下康复服务。</span>
    </section>

    <section class="liandui-hero">
      <div class="liandui-hero-copy">
        ${tag("练对一下", "green")}
        <h2>我要找人看动作</h2>
        <p>上传一段 8-30 秒动作视频，让合适的人看你哪里做对、哪里可能练偏、下一步怎么改。</p>
      </div>
      <div class="liandui-hero-actions">
        <button class="primary full" data-open-order-notice="true">开始发单</button>
      </div>
      <div class="hero-metrics">
        <div class="metric-chip metric-video">${icon("upload")}<span><strong>8-30秒</strong><em>短视频即可</em></span></div>
        <div class="metric-chip metric-escrow">${icon("wallet")}<span><strong>平台托管</strong><em>超时自动确认</em></span></div>
        <div class="metric-chip metric-reshoot">${icon("shield")}<span><strong>支持补拍</strong><em>最多 2 次</em></span></div>
      </div>
    </section>

    ${panel("服务声明", `<button class="text-link" data-toggle-disclosure="true">${state.disclosureExpanded ? "收起" : "查看全文"}</button>`, `
      <div class="disclosure-card">
        ${disclosureItems.map(item => `
          <section>
            <strong>${item.title}</strong>
            <span>${item.text}</span>
          </section>
        `).join("")}
      </div>
    `, "disclosure-panel")}

    ${panel("我的订单", "发出去的单都在这里跟进", `
      <div class="order-summary">
        <div>
          <strong>${state.orderCreated ? "1" : "0"}</strong>
          <span>进行中</span>
        </div>
        <div>
          <strong>0</strong>
          <span>待验收</span>
        </div>
        <button class="ghost" data-liandui-view="orders">全部订单</button>
      </div>
    `)}
    ${state.orderNoticeOpen ? renderOrderNoticeModal() : ""}
  `;
}

function renderOrderNoticeModal() {
  return `
    <section class="modal-backdrop" role="presentation">
      <div class="confirm-sheet" role="dialog" aria-modal="true" aria-label="下单前请确认">
        <div class="confirm-head">
          <strong>下单前请确认</strong>
          <button class="icon-button" data-close-order-notice="true" aria-label="关闭">${icon("chevron")}</button>
        </div>
        <p>您已阅读并了解「服务声明」中的业务边界与安全提醒。本服务为线上动作点评和训练建议，不替代医生面诊或线下面对面私教。</p>
        <button class="check-row ${state.orderNoticeChecked ? "active" : ""}" data-toggle-order-notice-check="true">
          <strong>我已阅读并理解，自愿下单</strong>
          <span>勾选后进入发单流程。</span>
        </button>
        <div class="confirm-actions">
          <button class="ghost" data-close-order-notice="true">再看看</button>
          <button class="primary ${state.orderNoticeChecked ? "" : "disabled"}" ${state.orderNoticeChecked ? `data-confirm-order-notice="true"` : `data-toast="请先勾选确认"`}>确认并发单</button>
        </div>
      </div>
    </section>
  `;
}

function renderCategoryStep() {
  const category = selectedMainCategory();
  if (category) {
    return `
      <section class="price-total-card">
        <div>
          ${tag(category.freeLead ? "引流款" : "已选择", category.freeLead ? "green" : "blue")}
          <strong>${category.name}</strong>
          <span>${category.desc}</span>
        </div>
        <em>${category.price === 0 ? "免费 ¥0" : money(category.price)}</em>
      </section>
      <button class="ghost full" data-reset-main-category="true">重新选择咨询类型</button>
    `;
  }

  return `
    <section class="price-total-card muted">
      <div>
        ${tag("请选择", "warn")}
        <strong>请选择你的咨询类型</strong>
        <span>先确定这单是免费器械咨询，还是付费动作点评。选中后当前模块会收起，自动进入下一步。</span>
      </div>
    </section>
    <div class="section-label">主品类列表</div>
    <div class="main-category-list">
      ${createMainCategories.map(item => `
        <button class="category-option" data-main-category="${item.id}">
          <div>
            <strong>${item.name}</strong>
            <span>${item.desc}</span>
            <small>${item.scope}</small>
          </div>
          <em>${item.price === 0 ? "免费 ¥0" : money(item.price)}</em>
        </button>
      `).join("")}
    </div>
  `;
}

function renderAddOnStep() {
  const category = selectedMainCategory();
  if (!category) return `<div class="notice-inline">请先选择主品类。</div>`;
  if (category.allowAddOns === false) return `<div class="notice-inline">器械使用求教为免费订单，已自动跳过附加服务。</div>`;
  return `
    ${renderOrderPriceSummary()}
    <div class="section-label">附加服务多选</div>
    <div class="addon-list">
      ${addOnServices.map(item => {
        const active = state.selectedAddOns.includes(item.id);
        return `
          <button class="addon-option ${active ? "active" : ""}" data-addon="${item.id}">
            <div>
              <strong>${item.name}</strong>
              <span>${item.desc}</span>
            </div>
            <em>+${money(item.price)}</em>
          </button>
        `;
      }).join("")}
    </div>
    ${usesSensitiveMaterial() ? `<div class="notice-inline strong">关键帧 / 剪辑标注分析：点评人可为本订单临时缓存、剪辑、标注素材；不得长期保存、传播、二次使用。订单完成、取消、退款或仲裁结束后 24 小时内删除本地临时素材。</div>` : ""}
  `;
}

function renderBonusRemarkStep() {
  const category = selectedMainCategory();
  if (!category) return `<div class="notice-inline">请先选择主品类。</div>`;
  if (category.allowBonus === false) return `<div class="notice-inline">器械使用求教为免费订单，已自动跳过加价和备注。</div>`;
  const bonus = normalizeBonus(state.userBonus);
  return `
    ${renderOrderPriceSummary()}
    <div class="bonus-box">
      <div>
        <strong>自主加价</strong>
        <span>¥0-¥50，步进 ¥1；加价进入订单总价，但不代表插队或更快交付。</span>
      </div>
      <div class="bonus-control">
        <button data-bonus-step="-1">-</button>
        <em>${money(bonus)}</em>
        <button data-bonus-step="1">+</button>
      </div>
      <div class="bonus-presets">
        ${[0, 3, 6, 10].map(value => `<button class="${bonus === value ? "active" : ""}" data-bonus-preset="${value}">+${money(value)}</button>`).join("")}
      </div>
    </div>

    <div class="remark-box">
      <div>
        <strong>15字备注</strong>
        <span>最多 15 个字，可为空。这里是给点评人快速扫单的短提示，不是完整问题描述。</span>
      </div>
      <div class="remark-current">
        <span>${state.orderRemark || "暂无备注"}</span>
        ${state.orderRemark ? `<button data-clear-remark="true">清空</button>` : ""}
      </div>
      <div class="remark-presets">
        ${["想重点看肩", "腰容易酸", "发力怪", "怕练偏", "想看发力"].map(text => `<button class="${state.orderRemark === text ? "active" : ""}" data-remark="${text}">${text}</button>`).join("")}
      </div>
    </div>
  `;
}

function renderOrderPriceSummary() {
  const category = selectedMainCategory();
  if (!category) return "";
  const addOns = selectedAddOnItems();
  const bonus = category.allowBonus === false ? 0 : normalizeBonus(state.userBonus);
  return `
    <div class="price-card">
      <div>
        <strong>${category.name}</strong>
        <span>${addOns.length ? addOns.map(item => item.name).join("、") : category.freeLead ? "免费器械咨询，不含附加服务" : "未选择附加服务"}</span>
      </div>
      <em>${category.price === 0 ? "免费 ¥0" : money(orderTotal())}</em>
    </div>
    <div class="detail-grid">
      <div><strong>交付时效</strong><span>${category.delivery}</span></div>
      <div><strong>${category.allowBonus === false ? "订单规则" : "自主加价"}</strong><span>${category.allowBonus === false ? "免费订单" : money(bonus)}</span></div>
    </div>
  `;
}

function renderLianduiCreate() {
  const category = selectedMainCategory();
  const currentStep = lianduiSteps[state.lianduiStep] || lianduiSteps[0];
  const isEquipmentConsult = category?.id === "equipmentConsult";
  const stepBody = [
    () => renderCategoryStep(),
    () => renderAddOnStep(),
    () => renderBonusRemarkStep(),
    () => `
      ${renderOrderPriceSummary()}
      <button class="upload-card" data-toast="${isEquipmentConsult ? "请上传单张或多张器械图片，尽量拍到器械全貌和调节位置。" : "请上传 8-30 秒动作视频，建议正面和侧面各一段。"}">
        ${icon("upload")}
        <strong>${isEquipmentConsult ? "添加器械图片" : "添加动作视频"}</strong>
        <span>${isEquipmentConsult ? category.materialHint : "建议 8-30 秒，动作全程清楚，不要求露脸；正面和侧面更容易判断。"}</span>
      </button>
      ${isEquipmentConsult ? `
        <div class="notice-inline">器械使用求教支持单张或多张图片，用来咨询器械名称、使用方式和调节方法。</div>
      ` : `
        <div class="chip-grid">
          ${viewAngleOptions.map(item => `
            <button class="${state.viewAngle === item ? "active" : ""}" data-view-angle="${item}">${item}视角</button>
          `).join("")}
        </div>
        <button class="check-row ${state.hasPain ? "active" : ""}" data-toggle-pain="true">
          <strong>是否存在身体疼痛？</strong>
          <span>${state.hasPain ? "已选择：有疼痛或受限，系统会提高点评人门槛。" : "没有疼痛就不勾选；有疼痛请如实选择。"}</span>
        </button>
        ${state.hasPain ? `<div class="notice-inline">有疼痛时会提高点评人门槛，优先匹配康复防护类身份。</div>` : ""}
      `}
    `,
    () => `
      ${renderOrderPriceSummary()}
      ${isEquipmentConsult ? `
        <div class="form-preview">
          <strong>你可以这样问</strong>
          <span>这是什么器械？怎么调坐垫？把手握哪里？适合练哪里？第一次用要注意什么？</span>
        </div>
      ` : `
        <div class="chip-grid">
          ${bodyPartOptions.map(item => `
            <button class="${state.bodyPart === item ? "active" : ""}" data-body-part="${item}">${item}</button>
          `).join("")}
        </div>
      `}
      <div class="chip-grid">
        ${(isEquipmentConsult ? ["想知道名称", "不会调节", "想问练哪里", "不会坐姿", "安全注意"] : questionOptions).map(item => `
          <button class="${state.questionPreset === item ? "active" : ""}" data-question-preset="${item}">${item}</button>
        `).join("")}
      </div>
      <div class="form-preview">
        <strong>补充描述</strong>
        <span>${isEquipmentConsult ? "写清楚你想问器械名称、调节方式、使用姿势还是注意事项。" : "可以写：哪里没感觉、哪里不舒服、想让点评人重点看什么。"}</span>
      </div>
      <div class="choice-row">
        <button class="${state.privacy === "public" ? "active" : ""}" data-privacy="public">
          <strong>公开单</strong>
          <span>匿名展示后可沉淀为公开案例，其他用户能给点评打有用度。</span>
        </button>
        <button class="${state.privacy === "private" ? "active" : ""}" data-privacy="private">
          <strong>隐私单</strong>
          <span>只自己可见；点评人范围自动提高到专业身份以上。</span>
        </button>
      </div>
      ${state.privacy === "private" ? `<div class="notice-inline">隐私单不会进入动作案例广场，且不可选择认证爱好者范围。</div>` : ""}
      <ul class="standard-list">
        ${category ? category.standards.map(item => `<li>${item}</li>`).join("") : ""}
        ${category && !isEquipmentConsult ? `<li>动作正确也要说明正确点，不能只写“没问题”。</li>` : ""}
        <li>平台及点评人员不会出具疾病诊断结论。</li>
      </ul>
      ${usesSensitiveMaterial() ? `<div class="notice-inline strong">已选择关键帧 / 剪辑标注分析：仅允许为本订单临时处理素材，不得长期保存、传播、二次使用；订单结束后 24 小时内删除本地临时素材。</div>` : ""}
      <div class="escrow-card">
        ${icon(category?.price === 0 ? "shield" : "wallet")}
        <div>
          <strong>${category?.price === 0 ? "免费发布" : "支付托管并发布"}</strong>
          <span>${category?.price === 0 ? "器械使用求教为免费订单，不产生托管金额；发布后进入待接单。" : "使用微信支付托管；点评交付后进入短验收期，超时未提出异议将自动确认并结算给点评人。"}</span>
        </div>
      </div>
      <div class="summary-list">
        <span>主品类：${category ? category.name : "未选择"}</span>
        <span>附加服务：${selectedAddOnItems().length ? selectedAddOnItems().map(item => item.name).join("、") : "无"}</span>
        <span>短备注：${state.orderRemark || "无"}</span>
        <span>公开方式：${state.privacy === "private" ? "隐私单" : "公开单"}</span>
        <span>订单总价：${category?.price === 0 ? "免费 ¥0" : money(orderTotal())}</span>
      </div>
    `
  ][state.lianduiStep]();

  return `
    <section class="step-progress">
      <div class="step-progress-head">
        <strong>${state.lianduiStep + 1}/${lianduiSteps.length} ${currentStep}</strong>
        <span>${category ? category.name : "请选择你的咨询类型"}</span>
      </div>
      <div class="step-dots">
        ${lianduiSteps.map((item, index) => `<button class="${index === state.lianduiStep ? "active" : index < state.lianduiStep ? "done" : ""}" data-liandui-step="${index}" aria-label="${item}"></button>`).join("")}
      </div>
    </section>

    ${panel(currentStep, lianduiStepTips[state.lianduiStep] || "", stepBody, "step-panel")}

    <div class="step-actions">
      <button class="ghost" data-step-prev="true" ${state.lianduiStep === 0 ? `data-toast="已经是第一步"` : ""}>上一步</button>
      ${state.lianduiStep === lianduiSteps.length - 1
        ? `<button class="primary" ${category ? `data-create-order="true"` : `data-toast="请先选择咨询类型"`}>${category?.price === 0 ? "免费发布" : `托管 ${money(orderTotal())} 并发布`}</button>`
        : `<button class="primary" data-step-next="true">下一步</button>`}
    </div>

    ${state.orderCreated ? `<div class="success">${icon("shield")}<div><strong>订单已发布</strong><span>已进入待接单，可在订单页继续跟进。</span></div></div>` : ""}
  `;
}

function renderLianduiMarket() {
  const orders = visibleMarketOrders();
  const sortOptions = [
    { id: "latest", label: "最新发布" },
    { id: "priceDesc", label: "价格从高到低" }
  ];
  if (!state.reviewerQualified) {
    return `
      <section class="empty-order">
        ${icon("lock")}
        <strong>接单资格未通过</strong>
        <span>完成资质认证后，系统才会开放接单入口。</span>
      </section>
    `;
  }

  return `
    ${panel("接单广场", "只展示与你资质匹配的订单", `
      <div class="market-summary">
        <div>
          <strong>${orders.length}</strong>
          <span>可接订单</span>
        </div>
        <div>
          <strong>${state.reviewerCerts.length}</strong>
          <span>已认证能力</span>
        </div>
        <div>
          <strong>${state.acceptedOrderId ? "1" : "0"}</strong>
          <span>今日已接</span>
        </div>
      </div>
    `)}

    ${panel("可接订单", "不显示头像昵称，只看订单关键信息", `
      <div class="market-toolbar">
        <div class="market-sort" role="group" aria-label="接单排序">
          ${sortOptions.map(item => `
            <button class="${state.marketSort === item.id ? "active" : ""}" data-market-sort="${item.id}">${item.label}</button>
          `).join("")}
        </div>
        <button class="ghost mini" data-refresh-market="true">刷新</button>
      </div>
      <div class="market-note">每 10 秒自动同步，移动端可下拉刷新。</div>
      ${orders.length ? `
        <div class="market-list">
          ${orders.map(order => `
            <article class="market-card">
              <div class="market-card-head">
                <div>
                  <strong>${order.category}</strong>
                  <span>${order.id} · ${order.posted}</span>
                </div>
                <em>${money(order.price)}</em>
              </div>
              <div class="market-tags">
                ${tag(order.scene, "blue")}
                ${tag(order.body)}
                ${tag(order.privacy, order.privacy === "隐私单" ? "warn" : "green")}
                ${tag(order.requiredCerts.includes("rehab") ? "康复高门槛" : "普通资质可见", order.requiredCerts.includes("rehab") ? "warn" : "")}
              </div>
              <div class="market-meta">
                <span>素材：${order.material}</span>
                <span>交付：${order.delivery}</span>
                <span>自主加价：${money(order.bonus || 0)}</span>
                ${order.remark ? `<span>备注：${order.remark}</span>` : ""}
              </div>
              ${order.addOns.length ? `<div class="mini-tags">${order.addOns.map(text => `<span>${text}</span>`).join("")}</div>` : ""}
              <button class="primary full" ${state.acceptingOrderId === order.id ? "disabled" : `data-accept-market-order="${order.id}"`}>
                ${state.acceptingOrderId === order.id ? "接单中..." : "立即接单"}
              </button>
            </article>
          `).join("")}
        </div>
      ` : `
        <section class="empty-order compact">
          ${icon("shield")}
          <strong>暂无匹配订单</strong>
          <span>已接单或不符合资质的订单不会展示在这里。</span>
        </section>
      `}
    `)}
  `;
}

function renderLianduiOrders() {
  const category = selectedMainCategory();
  const accepted = acceptedMarketOrder();
  const isReviewerOrder = Boolean(accepted);
  const currentStatus = orderStatusTabs.find(item => item.id === state.orderStatus) || orderStatusTabs[0];
  const needsMaterial = state.orderStatus === "needMaterial";
  const feedbackReady = ["acceptance", "completed", "dispute"].includes(state.orderStatus);
  const orderTitle = accepted ? accepted.category : category?.name || "未选择主品类";
  const orderDelivery = accepted ? accepted.delivery : category?.delivery || "-";
  const orderReviewerText = accepted
    ? "当前账号已接单"
    : category?.requiredCerts.includes("rehab")
      ? "康复防护类资质优先"
      : category?.freeLead
        ? "认证点评人可接"
        : "系统按品类和资质匹配";
  const originalQuestion = accepted
    ? `${accepted.scene}，重点看 ${accepted.body}。${accepted.remark ? `备注：${accepted.remark}。` : ""}`
    : category?.freeLead
      ? `器械使用求教，${state.questionPreset}。短备注：${state.orderRemark || "无"}。`
      : `${category?.name || "动作点评"}，${state.questionPreset}，重点看 ${state.bodyPart} 和 ${state.viewAngle}视角。短备注：${state.orderRemark || "无"}。`;
  const feedbackText = feedbackReady
    ? "结论：基本正确。做得好的点是动作轨迹稳定；需要注意的是后半程容易耸肩，建议先降低重量，把肩胛下沉保持住。"
    : needsMaterial
      ? "等待你补充素材后，点评人会继续完成正式点评。"
      : "点评完成后，这里会展示完整结论、正确点、问题点和改进建议。";
  const actionBlocks = {
    pending: `
      <button class="ghost" data-toast="订单取消后，托管金额原路退回">取消订单</button>
      <button class="ghost" data-order-status="dispute">联系客服</button>
    `,
    reviewing: `
      <button class="ghost" data-toast="点评人正在分析，完成后会通知你验收">查看进度</button>
      <button class="ghost" data-order-status="dispute">联系客服</button>
    `,
    acceptance: `
      <button class="primary" data-toast="确认后，资金将结算给点评人">确认验收</button>
      <button class="ghost" data-toast="可按 0/30/50/100% 档位申请退款">申请退款</button>
      <button class="ghost" data-order-status="dispute">客服介入</button>
    `,
    completed: `
      <button class="primary" data-toast="已保存为匿名公开案例">公开为案例</button>
      <button class="ghost" data-toast="订单记录已保存">查看记录</button>
    `,
    dispute: `
      <button class="primary" data-toast="已提交补充说明">补充说明</button>
      <button class="ghost" data-toast="客服会根据材料给出处理结果">查看处理进度</button>
    `
  };

  if (!state.orderCreated) {
    return `
      ${panel("订单状态", "发单和接单都在这里跟进", `
        <div class="order-status-tabs">
          ${orderStatusTabs.map(item => `<button class="${item.id === "pending" ? "active" : ""}" data-order-status="${item.id}">${item.label}</button>`).join("")}
        </div>
      `)}

      <section class="empty-order">
        ${icon("target")}
        <strong>还没有进行中的动作点评</strong>
        <span>发单或接单后，可以在这里查看补拍、交付、验收和售后进度。</span>
        <button class="primary" data-liandui-view="create">去发单</button>
      </section>
    `;
  }

  return `
    ${panel("订单状态", isReviewerOrder ? "我接到的点评订单" : "我发起的点评订单", `
      <div class="order-status-tabs">
        ${orderStatusTabs.map(item => `
          <button class="${state.orderStatus === item.id ? "active" : ""}" data-order-status="${item.id}">${item.label}</button>
        `).join("")}
      </div>
    `)}

    ${panel("订单详情", currentStatus.label, `
      <article class="order-detail ${state.orderStatus === "dispute" ? "dispute" : ""} ${needsMaterial ? "need-material" : ""}">
        <div class="status-banner ${needsMaterial ? "need-material" : ""}">
          <strong>当前状态：${currentStatus.label}</strong>
          <span>${orderStatusTips[state.orderStatus] || orderStatusTips.pending}</span>
        </div>
        ${needsMaterial ? `
          <div class="material-request">
            <strong>【待补拍】点评人要求补充视频/调整角度</strong>
            <span>点评人反馈：${state.reshootReason}</span>
            <em>已补拍 ${state.reshootCount}/2 次，补拍期间暂停计算交付时效。</em>
          </div>
        ` : ""}
        <div class="video-preview">
          ${icon("upload")}
          <span>${accepted ? `素材预览：${accepted.material}` : "动作视频预览"}</span>
        </div>
        <div class="detail-grid">
          <div><strong>创建时间</strong><span>2026-06-08 21:40</span></div>
          <div><strong>约定交付</strong><span>${orderDelivery}</span></div>
          <div><strong>主品类</strong><span>${orderTitle}</span></div>
          <div><strong>${isReviewerOrder ? "订单角色" : "点评人"}</strong><span>${orderReviewerText}</span></div>
        </div>
        <div class="info-block">
          <strong>用户原始问题</strong>
          <span>${originalQuestion}</span>
        </div>
        <div class="info-block">
          <strong>完整点评内容</strong>
          <span>${feedbackText}</span>
        </div>
        ${needsMaterial ? `
          <div class="supplement-actions">
            <button class="upload-card compact" data-toast="选择要补传的视频，建议补齐正面和侧面视角。">
              ${icon("upload")}
              <strong>重新上传视频（补拍）</strong>
              <span>上传完成后点击提交补充素材，订单自动回到点评中。</span>
            </button>
            <button class="primary full" data-submit-material="true">提交补充素材</button>
            <button class="ghost full" data-toast="待补充素材阶段可主动申请全额退款，无手续费">放弃本次订单（申请退款）</button>
          </div>
        ` : ""}
        <button class="check-row active" data-toast="公开后会以匿名方式展示到案例广场">
          <strong>公开为案例</strong>
          <span>公开单可沉淀到动作案例广场；隐私单默认不可公开。</span>
        </button>
        ${state.orderStatus === "dispute" ? `<div class="notice-inline strong">平台介入中：客服会查看视频、原始问题、点评内容和验收记录。</div>` : ""}
        <div class="tiny-rule">温馨提示：每个订单最多可补拍2次，请保证视频清晰、视角完整（正面+侧面为佳）。</div>
        <div class="detail-actions">
          ${needsMaterial ? `<button class="ghost" data-order-status="dispute">客服介入</button>` : actionBlocks[state.orderStatus] || actionBlocks.pending}
        </div>
      </article>
    `)}

    ${panel("退款规则", "固定四档", `
      <div class="refund-grid">
        <div><strong>0%</strong><span>交付完整</span></div>
        <div><strong>30%</strong><span>内容偏浅</span></div>
        <div><strong>50%</strong><span>缺关键项</span></div>
        <div><strong>100%</strong><span>敷衍或违规</span></div>
      </div>
    `)}
  `;
}

function renderForum() {
  const current = rankingGroups.find(item => item.id === state.ranking) || rankingGroups[0];
  const rankingItems = rankingItemsByGroup[current.id] || rankingItemsByGroup.equipment;

  if (state.forumView === "ranking") {
    return pageShell("论坛", current.title, `
      ${panel("榜单分类", current.desc, `
        <div class="ranking-tabs">
          ${rankingGroups.map(item => `
            <button class="${state.ranking === item.id ? "active" : ""}" data-ranking="${item.id}" data-forum-view="ranking">${item.name}</button>
          `).join("")}
        </div>
      `)}

      ${panel(current.title, "用户评分持续更新", `
        <div class="ranking-list">
          ${rankingItems.map((item, index) => `
            <article>
              <b>${index + 1}</b>
              <div>
                <strong>${item.name}</strong>
                <span>${item.tags.map(text => tag(text)).join("")}</span>
              </div>
              <em>${item.score}</em>
            </article>
          `).join("")}
        </div>
      `)}

      ${panel("继续看", "", `
        <div class="module-grid">
          <button class="module-card" data-forum-view="categories">
            <h3>返回分类</h3>
            <p>重新选择器械、动作、博主、补剂等榜单分类。</p>
          </button>
        </div>
      `)}
    `);
  }

  return pageShell("论坛", "先选分类，再看具体排行和讨论。", `
    ${panel("先选分类", "点进去再看具体排行", `
      <div class="category-grid">
        ${rankingGroups.map(item => `
          <button class="category-card" data-ranking="${item.id}" data-forum-view="ranking">
            <div>
              <strong>${item.title}</strong>
              <span>${item.desc}</span>
            </div>
            <div class="mini-tags">${item.tags.map(text => `<span>${text}</span>`).join("")}</div>
          </button>
        `).join("")}
      </div>
    `)}

    ${panel("动作案例广场", "公开订单才会出现在这里", `
      <div class="order-list">
        ${[
          ["高位下拉没背感", "点评有用 92%", "器械使用"],
          ["深蹲膝盖内扣", "点评有用 88%", "基础动作"],
          ["投篮出手点偏右", "点评有用 84%", "篮球投篮"]
        ].map(([title, score, type]) => `
          <article class="order-card">
            <div>
              <strong>${title}</strong>
              <span>${type} · 公开案例</span>
            </div>
            <em>${score}</em>
          </article>
        `).join("")}
      </div>
    `)}

    ${panel("讨论", "入口先保留", `
      <div class="module-grid two">
        <button class="module-card" data-toast="按好用、靠谱、性价比、适合新手等维度打分">
          <h3>我要打分</h3>
          <p>所有用户都可以参与评分，后续按分类进入具体打分页。</p>
        </button>
        <button class="module-card locked" data-toast="认证点评人后续可补充技术解释">
          <h3>榜单补充</h3>
          <p>认证用户后续可补充解释，避免榜单被刷分或误导。</p>
        </button>
        <button class="module-card locked" data-toast="讨论区入口先保留，后续围绕榜单和公开案例开放">
          <h3>讨论区</h3>
          <p>先不做泛社区，后续只围绕榜单、公开案例和训练问题开放。</p>
        </button>
      </div>
    `)}
  `);
}

function renderMine() {
  return pageShell("我的", "身份、订单、钱包和公开主页都在这里。", `
    <section class="profile-card">
      <div class="avatar">练</div>
      <div>
        <h2>训练用户</h2>
        <span>普通用户 · 可同时申请多个身份</span>
      </div>
      ${tag("未认证", "warn")}
    </section>

    ${panel("常用入口", "", `
      <div class="mine-grid">
        <button>${icon("shield")}<strong>身份申请</strong><span>爱好者、教练、专项训练师、康复防护</span></button>
        <button>${icon("user")}<strong>公开主页</strong><span>别人可查资质，但不展示隐私材料</span></button>
        <button>${icon("target")}<strong>我的订单</strong><span>发单、接单、售后记录</span></button>
        <button>${icon("wallet")}<strong>钱包流水</strong><span>托管、结算、提现</span></button>
      </div>
    `)}

    ${panel("可以申请的身份", "可多选，分开审核", `
      <div class="identity-grid">
        ${identityGroups.map(group => `
          <section class="identity-group">
            <div class="identity-group-head">
              <strong>${group.title}</strong>
              <span>${group.desc}</span>
            </div>
            <div class="identity-card-list">
              ${group.items.map(item => {
                const active = state.selectedIdentities.includes(item.id);
                return `
                  <button class="identity-card ${active ? "active" : ""}" data-identity="${item.id}">
                    <div>
                      <strong>${item.name}</strong>
                      <em>${item.level}</em>
                      <span>${item.desc}</span>
                    </div>
                    <div class="mini-tags">${item.tags.map(text => `<span>${text}</span>`).join("")}</div>
                  </button>
                `;
              }).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    `)}

    ${panel("公开资质主页", "所有用户可查，隐私材料不公开", `
      <div class="public-profile">
        <div>
          ${tag("平台认证展示", "blue")}
          <strong>练对啦用户主页</strong>
          <span>展示昵称、认证身份、专项标签、评分、公开案例；隐藏真实姓名、手机号、证件号和证书原件。</span>
        </div>
        <button class="ghost" data-toast="打开公开主页预览">预览主页</button>
      </div>
    `)}

    ${panel("服务", "", `
      <div class="settings-list">
        <button data-toast="打开客服与仲裁记录">客服与仲裁记录 ${icon("chevron")}</button>
        <button data-toast="打开资质材料管理">资质材料管理 ${icon("chevron")}</button>
        <button data-toast="查看隐私与视频过期策略">隐私与视频过期策略 ${icon("chevron")}</button>
      </div>
    `)}
  `);
}

function renderBottomNav() {
  return `
    <nav class="bottom-nav" aria-label="底部主导航">
      ${tabs.map(item => `
        <button class="${state.tab === item.id ? "active" : ""}" data-tab="${item.id}">
          ${icon(item.icon)}
          <span>${item.label}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function render() {
  const pages = {
    practice: renderPractice,
    liandui: renderLiandui,
    forum: renderForum,
    mine: renderMine
  };
  app.innerHTML = `
    <div class="app-scroll">
      ${(pages[state.tab] || renderPractice)()}
    </div>
    ${renderBottomNav()}
  `;
}

document.addEventListener("click", event => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.dataset.tab) {
    state.tab = target.dataset.tab;
    if (target.dataset.lianduiView) state.lianduiView = target.dataset.lianduiView;
    if (target.dataset.tab === "liandui" && !target.dataset.lianduiView) state.lianduiView = "home";
    render();
    return;
  }

  if (target.dataset.lianduiView) {
    state.tab = "liandui";
    state.lianduiView = target.dataset.lianduiView;
    if (target.dataset.lianduiView === "create" && !target.dataset.lianduiStep) state.lianduiStep = 0;
    render();
    return;
  }

  if (target.dataset.toggleDisclosure) {
    state.disclosureExpanded = !state.disclosureExpanded;
    render();
    return;
  }

  if (target.dataset.openOrderNotice) {
    state.orderNoticeOpen = true;
    state.orderNoticeChecked = false;
    render();
    return;
  }

  if (target.dataset.closeOrderNotice) {
    state.orderNoticeOpen = false;
    state.orderNoticeChecked = false;
    render();
    return;
  }

  if (target.dataset.toggleOrderNoticeCheck) {
    state.orderNoticeChecked = !state.orderNoticeChecked;
    render();
    return;
  }

  if (target.dataset.confirmOrderNotice) {
    state.orderNoticeOpen = false;
    state.orderNoticeChecked = false;
    state.tab = "liandui";
    state.lianduiView = "create";
    state.lianduiStep = 0;
    showToast("已确认服务说明，开始发单");
    render();
    return;
  }

  if (target.dataset.mainCategory) {
    selectMainCategory(target.dataset.mainCategory);
    const category = selectedMainCategory();
    state.lianduiStep = category?.allowAddOns === false ? 3 : 1;
    render();
    return;
  }

  if (target.dataset.resetMainCategory) {
    state.mainCategoryId = "";
    state.selectedAddOns = [];
    state.userBonus = 0;
    state.orderRemark = "";
    state.hasPain = false;
    state.lianduiStep = 0;
    render();
    return;
  }

  if (target.dataset.addon) {
    const category = selectedMainCategory();
    if (!category) {
      showToast("请先选择咨询类型");
      return;
    }
    if (category.allowAddOns === false) {
      showToast("器械使用求教为免费订单，不可选附加服务");
      return;
    }
    const id = target.dataset.addon;
    state.selectedAddOns = state.selectedAddOns.includes(id)
      ? state.selectedAddOns.filter(item => item !== id)
      : [...state.selectedAddOns, id];
    render();
    return;
  }

  if (target.dataset.bonusStep) {
    const category = selectedMainCategory();
    if (!category) {
      showToast("请先选择咨询类型");
      return;
    }
    if (category.allowBonus === false) {
      showToast("器械使用求教为免费订单，不可自主加价");
      return;
    }
    state.userBonus = normalizeBonus(Number(state.userBonus || 0) + Number(target.dataset.bonusStep));
    render();
    return;
  }

  if (target.dataset.bonusPreset) {
    const category = selectedMainCategory();
    if (!category) {
      showToast("请先选择咨询类型");
      return;
    }
    if (category.allowBonus === false) {
      showToast("器械使用求教为免费订单，不可自主加价");
      return;
    }
    state.userBonus = normalizeBonus(target.dataset.bonusPreset);
    render();
    return;
  }

  if (target.dataset.remark) {
    state.orderRemark = cleanRemark(target.dataset.remark);
    render();
    return;
  }

  if (target.dataset.clearRemark) {
    state.orderRemark = "";
    render();
    return;
  }

  if (target.dataset.specialtyVote) {
    const id = target.dataset.specialtyVote;
    if (!state.votedSpecialties.includes(id)) {
      state.votedSpecialties = [...state.votedSpecialties, id];
      showToast("已记录你的期待，上线前会进入平台评估");
    } else {
      showToast("你已经点过期待了");
    }
    render();
    return;
  }

  if (target.dataset.privacy) {
    state.privacy = target.dataset.privacy;
    render();
    return;
  }

  if (target.dataset.lianduiStep) {
    const nextStep = Number(target.dataset.lianduiStep);
    const category = selectedMainCategory();
    if (!category && nextStep > 0) {
      showToast("请先选择咨询类型");
      return;
    }
    if (category?.allowAddOns === false && [1, 2].includes(nextStep)) {
      state.lianduiStep = 3;
    } else {
      state.lianduiStep = nextStep;
    }
    render();
    return;
  }

  if (target.dataset.stepNext) {
    const category = selectedMainCategory();
    if (!category) {
      showToast("请先选择咨询类型");
      return;
    }
    if (state.lianduiStep === 0) {
      state.lianduiStep = category.allowAddOns === false ? 3 : 1;
    } else if (category.allowAddOns === false && state.lianduiStep < 3) {
      state.lianduiStep = 3;
    } else {
      state.lianduiStep = Math.min(lianduiSteps.length - 1, state.lianduiStep + 1);
    }
    render();
    return;
  }

  if (target.dataset.stepPrev) {
    const category = selectedMainCategory();
    if (category?.allowAddOns === false && state.lianduiStep === 3) {
      state.lianduiStep = 0;
    } else {
      state.lianduiStep = Math.max(0, state.lianduiStep - 1);
    }
    render();
    return;
  }

  if (target.dataset.bodyPart) {
    state.bodyPart = target.dataset.bodyPart;
    render();
    return;
  }

  if (target.dataset.viewAngle) {
    state.viewAngle = target.dataset.viewAngle;
    render();
    return;
  }

  if (target.dataset.togglePain) {
    state.hasPain = !state.hasPain;
    if (state.hasPain) selectMainCategory("painRehab");
    render();
    return;
  }

  if (target.dataset.questionPreset) {
    state.questionPreset = target.dataset.questionPreset;
    render();
    return;
  }

  if (target.dataset.marketSort) {
    state.marketSort = target.dataset.marketSort;
    render();
    return;
  }

  if (target.dataset.refreshMarket) {
    render();
    return;
  }

  if (target.dataset.acceptMarketOrder) {
    const orderId = target.dataset.acceptMarketOrder;
    const order = visibleMarketOrders().find(item => item.id === orderId);
    if (!order) {
      showToast("该订单已被接走或取消");
      render();
      return;
    }
    state.acceptingOrderId = orderId;
    render();
    window.setTimeout(() => {
      state.acceptingOrderId = "";
      if (!visibleMarketOrders().some(item => item.id === orderId)) {
        showToast("该订单已被接走或取消");
        render();
        return;
      }
      state.acceptedOrderId = orderId;
      state.orderCreated = true;
      state.orderStatus = "reviewing";
      state.lianduiView = "orders";
      render();
    }, 420);
    return;
  }

  if (target.dataset.orderStatus) {
    if (target.dataset.orderStatus === "needMaterial" && state.reshootCount >= 2) {
      showToast("该订单已达最大补拍次数，无法再次要求补充素材");
      return;
    }
    state.orderStatus = target.dataset.orderStatus;
    render();
    return;
  }

  if (target.dataset.submitMaterial) {
    state.orderStatus = "reviewing";
    state.reshootCount = Math.min(2, state.reshootCount + 1);
    showToast("补充素材已提交，订单已回到点评中");
    render();
    return;
  }

  if (target.dataset.ranking) {
    state.ranking = target.dataset.ranking;
    if (target.dataset.forumView) state.forumView = target.dataset.forumView;
    render();
    return;
  }

  if (target.dataset.forumView) {
    state.forumView = target.dataset.forumView;
    render();
    return;
  }

  if (target.dataset.identity) {
    const id = target.dataset.identity;
    state.selectedIdentities = state.selectedIdentities.includes(id)
      ? state.selectedIdentities.filter(item => item !== id)
      : [...state.selectedIdentities, id];
    render();
    return;
  }

  if (target.dataset.createOrder) {
    state.orderCreated = true;
    state.orderStatus = "pending";
    state.lianduiView = "orders";
    showToast("订单已进入订单中心");
    render();
    return;
  }

  if (target.dataset.toast) {
    showToast(target.dataset.toast);
  }
});

function applyInitialRoute() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  const view = params.get("view");
  const type = params.get("type");
  const status = params.get("status");
  const hasStep = params.has("step");
  const step = hasStep ? Number(params.get("step")) : -1;

  if (tabs.some(item => item.id === tab)) state.tab = tab;
  if (lianduiViews.some(item => item.id === view)) {
    state.tab = "liandui";
    state.lianduiView = view;
    if (state.lianduiView === "market" && !state.reviewerQualified) {
      state.lianduiView = "home";
    }
  }
  if (mainCategories.some(item => item.id === type)) selectMainCategory(type);
  if (hasStep && Number.isInteger(step) && step >= 0 && step < lianduiSteps.length) {
    state.tab = "liandui";
    state.lianduiView = "create";
    state.lianduiStep = step;
  }
  if (orderStatusTabs.some(item => item.id === status)) {
    state.tab = "liandui";
    state.lianduiView = "orders";
    state.orderCreated = true;
    state.orderStatus = status;
  }
  if (params.get("order") === "1") state.orderCreated = true;
}

applyInitialRoute();
render();

window.setInterval(() => {
  if (state.tab === "liandui" && state.lianduiView === "market" && !state.acceptingOrderId) {
    render();
  }
}, 10000);
