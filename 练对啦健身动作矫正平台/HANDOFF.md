# Handoff - 练对啦健身动作矫正平台

## Purpose

This file is the short memory checkpoint for future Codex turns. Read this first before making product, frontend, backend, database, or documentation changes.

## Product Positioning

练对啦 is a WeChat mini-program prototype for low-cost human fitness/action critique.

It is not:

- a generic fitness course app
- an AI action-recognition product
- a broad social network
- a private chat or fan/follower platform

Core value:

- Users upload a short action video.
- Qualified human reviewers give structured feedback.
- The platform protects both the buyer and the reviewer with clear order, delivery, settlement, and dispute rules.

## Fixed Frontend Navigation

Bottom tabs remain exactly four:

- 练习
- 练对
- 论坛
- 我的

Do not add a fifth tab. New features must fit into an existing tab, page, module, or extension slot.

## Confirmed Product Boundaries

Do not add as core features:

- private chat
- follower/fan relationships
- broad social feed
- AI action analysis as trust source
- large copied course/video library
- copyrighted training video ingestion

Allowed placeholders:

- action library entrance marked as preparing/locked
- lightweight FAQ/form helper AI later
- forum focused on ranking, voting, and debate-light content
- advertising placeholders in forum/ranking surfaces
- future sport/rehab categories as tags/config, not separate systems

## Current Frontend State

Main implementation files:

- `public/app.js`
- `public/styles.css`
- `public/index.html`
- `scripts/smoke-test.js`

Local URL:

- `http://127.0.0.1:5173/?tab=liandui`
- `http://127.0.0.1:5173/?tab=liandui&view=market` for the current reviewer-side order market prototype

Current frontend includes:

- 练习 tab with equipment tutorials and locked action-library entrance
- 练对 tab with create-order wizard, reviewer-only order market, orders/status/detail, supplement-material flow
- 论坛 tab focused on ranking categories, voting/comment placeholders, action-case square
- 我的 tab with identity application, public qualification profile, wallet/service/settings entrances

Smoke test command:

```bash
node scripts/smoke-test.js
```

In this Windows workspace, the bundled node path is often:

```powershell
C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe
```

## 练对 Current UX

The 练对 tab keeps a homepage/landing step. Do not delete it.

Correct user path:

- tap bottom tab `练对`
- enter `首页`
- read the warm notice and service declaration
- tap `开始发单`
- confirm service boundary
- enter `发单` and choose critique type
- upload video

Current internal top navigation:

- `首页`
- `发单`
- `接单` (reviewer-qualified accounts only)
- `订单`

Homepage must keep:

- `练对啦温馨提示`
- primary card `我要找人看动作`
- primary button `开始发单`
- three guarantee chips:
  - `8-30秒 / 短视频即可`
  - `平台托管 / 超时自动确认`
  - `支持补拍 / 最多 2 次`
- `服务声明` with `查看全文 / 收起`
- `我的订单` compact summary with `全部订单`

The old "按场景发单" card remains removed. It should not come back unless the user explicitly asks.

## Current Homepage Notice Text

Use this exact value unless user changes it:

```text
练对啦温馨提示
我们专注于线上动作观察、发力分析与训练技巧建议，帮你看清问题、减少练偏。本服务不替代医疗诊断或线下面对面私教。训练中若出现疼痛、麻木等不适，请立即停止并线下就医。有旧伤或术后恢复情况，建议优先选择线下康复服务。
```

The notice card has intentionally smaller text and tighter padding so the card is compact.

## Service Declaration

The homepage service declaration has a short preview and a full expanded version.

Confirmed wording details:

- Use `平台及点评人员不会出具疾病诊断结论`
- Use `常规动作可由认证爱好者或专业人员承接`
- Avoid wording that implies absolute disclaimer of platform responsibility.
- Avoid `病灶` because it can create medical ambiguity.
- Avoid `固定结果`; use objective limitations and no absolute-effect promise instead.

## Liandui Pricing / Category Direction V1.1

Latest product direction:

- Replace the old 9-type first step with a clearer pricing model:
  - main category single-select
  - add-on services multi-select
  - optional user self-added bonus
  - short order remark
  - preview-only sports specialty demand cards
- Frontend display name for the high-risk recovery/pain category must be:
  - `职业劳损 & 运动疼痛建议`
- Do not use `职业病康复` as the user-facing category name. It sounds too medical/diagnostic.
- Backend can still treat this as the high-threshold rehab/protection order type.
- This category should keep higher reviewer permissions: only qualified rehab/protection identities can accept it.

Confirmed main categories:

- `力训 & 功能动作点评` - ¥9.9
- `体态 & 肌肉综合分析` - ¥19.9
- `职业劳损 & 运动疼痛建议` - ¥39.9

Confirmed add-on services:

- `动作代偿专项分析` - +¥5
- `呼吸模式 & 发力联动点评` - +¥5

Recommended add-on to consider:

- `关键帧 / 剪辑标注分析` - suggested +¥10 or +¥15
- If enabled, apply the temporary material handling rule: reviewer may temporarily cache/download/export user video only for the current order's frame-by-frame analysis, keyframe screenshots, annotation, or delivery preparation. Reviewer must not save long-term, spread, publish, reuse, train models with, or use the material commercially. Local original video, cache, edit project files, and unsubmitted derivatives should be deleted within 24 hours after completion, cancellation, refund completion, or arbitration end.

Upcoming sports specialty cards:

- basketball shooting
- running
- football
- badminton
- table tennis
- other

These cards are gray/preview only. Button: `期待上线`. Track one click per user and total demand count. Reaching 10000 clicks means "platform evaluation for launch", not automatic launch.

Price formula:

```text
order_total = main_category_base_price + add_on_service_prices + user_bonus
```

Self-added bonus direction:

- Add to order total and show in reviewer-side order market.
- Should have a cap later to avoid abnormal orders.
- It does not promise queue-jump or faster delivery.

Short remark direction:

- Max 15 characters.
- Show in reviewer-side order market.
- Treat as a short highlight, not the full problem description.

Pricing / remark backend validation rules:

- Frontend must provide a 15-character remark input.
- Remark can be empty.
- Frontend should prevent input beyond 15 Chinese characters, but backend must still validate it.
- Backend must not trust frontend-submitted base price or add-on price.
- Backend recalculates base price from main category ID using admin/config price.
- Backend recalculates add-on prices from selected add-on IDs using admin/config prices.
- Backend only accepts the user bonus amount from frontend as a user-entered value.
- Final order price:

```text
final_price = backend_main_category_price + backend_add_on_total + user_bonus
```

- Backend must validate user bonus:
  - user_bonus >= 0
  - user_bonus <= 99 by configurable cap
  - user_bonus supports 0.1 yuan as the smallest unit
  - user_bonus must be numeric decimal/float
  - invalid value returns order creation failure
- Backend must validate remark length <= 15 characters to prevent polluted reviewer-side order market content.
- Once order is created, these values must be written into the order table and locked:
  - base price
  - add-on price total
  - selected add-on IDs
  - user bonus
  - total price
  - remark
- After creation, locked order price fields must not be overwritten, re-derived from changed config, or recalculated for display/settlement/refund. This keeps order display, settlement, and after-sales consistent.

## Liandui Reviewer Market V1.1

Current internal top navigation inside the `练对` tab is:

- `首页`
- `发单`
- `接单`
- `订单`

The labels are equal-width for the labels visible to the current account. If `接单` is hidden, the remaining labels still divide the width equally.

Permission rule:

- ordinary users must not see or click the `接单` label
- only users with completed reviewer qualification may see `接单`
- direct route access to `view=market` must also redirect or block when the user lacks reviewer qualification
- the current frontend prototype defaults to a simulated qualified reviewer so the page can be reviewed visually

Order card privacy rule:

- do not show buyer avatar, nickname, contact method, social relationship, or private chat entry in the market
- cards only show order category, order ID, posting time, body/scene tags, public/private label, material summary, delivery time, optional short remark, add-on tags, and final total price
- the market shows only final total price; it does not split base price, add-on price, or user bonus

Backend filtering rules:

- ordinary strength/function and posture/body-analysis orders are visible to all certified reviewers
- `职业劳损 & 运动疼痛建议` orders are only visible to reviewers with rehab/protection qualification
- invalid orders, cancelled orders, taken orders, illegal prices, and overlong remarks must not be returned to the reviewer market

Accept-order interaction:

- button text: `立即接单`
- on click, the button enters disabled loading state: `接单中...`
- backend must check order status atomically
- if pending and valid: accept succeeds, card disappears from the market, and order enters the reviewer/user order list
- if already taken or cancelled: show `该订单已被接走或取消`, then refresh the list
- successful accept should not show an extra success popup; keep the workflow fast

Refresh / sorting:

- market auto-refreshes every 10 seconds
- mobile should support pull-to-refresh
- manual refresh is allowed in prototype
- sorting stays lightweight:
  - `最新发布` default
  - `价格从高到低`
- backend should sort and return the result; frontend only renders the returned list

Idempotency / concurrency:

- backend must make accept-order requests idempotent
- same reviewer/order can only submit one valid accept request
- once an order is accepted, backend immediately updates order status and syncs globally
- no bidding, no queue jump, no paid acceleration, no抢单加速

Exception rules:

- when network is unavailable, disable accept submission and allow retry after network recovery
- if buyer cancels during browsing, the order disappears from the market
- all communication, material viewing, supplement request, and final delivery must happen inside order detail, not in the market
- market must not contain reviewer ranking, public accept statistics, social interaction, or private chat

## Start Order Confirmation

Clicking `开始发单` should not directly enter the order flow.

Current behavior:

- Opens a bottom confirmation sheet: `下单前请确认`
- User must check: `我已阅读并理解，自愿下单`
- Only then can they enter the create-order wizard

This is intended to support visible risk notice and future evidence logging.

## 练对 Create Order Flow

Current 8 steps:

1. 点评类型
2. 动作/部位
3. 上传视频
4. 描述问题
5. 公开方式
6. 点评人
7. 价格标准
8. 资金托管

Current final-step settlement wording uses light escrow:

- WeChat/platform payment is held temporarily.
- After reviewer delivery, order enters a short acceptance window.
- If user does not raise an objection in time, system auto-confirms and settles to reviewer.

Avoid returning to "验收后结算" as the main tagline because it can imply prolonged buyer-side blocking.

## Order / Settlement Product Decision

Current decision:

- Keep simplified/light escrow.
- Do not copy Xianyu-style strong buyer-side escrow.
- Protect serious reviewers from indefinite buyer-side fund blocking.
- No unconditional refund.

Target rule:

- Payment is platform-held for initial trust.
- After reviewer delivers, user has a limited acceptance/dispute window, suggested 48 hours.
- If no objection in time, system auto-confirms and settles to reviewer.
- Refunds only for clear reasons:
  - service not delivered
  - delivery seriously mismatches order
  - reviewer cannot serve after required supplement attempts
  - clear violation or empty/irrelevant delivery
- Subjective "not useful" alone should not trigger direct refund.

This increases backend/database/admin complexity, but protects supply-side stability.

## Order States

Current visible frontend order states:

- 待接单
- 点评中
- 待补充素材
- 待验收
- 已完成
- 售后 / 仲裁

Potential backend states later may need to be more detailed:

- 待支付
- 待接单
- 已接单
- 已交付
- 验收中
- 自动确认待结算
- 已完成
- 售后中
- 部分退款
- 全额退款
- 已取消

## Supplement Material Flow

Current rule:

- Reviewer can require supplement material if video is unclear/incomplete.
- User sees `待补充素材`.
- User can re-upload material.
- Max supplement attempts: 2.
- Supplement time pauses delivery countdown.

User-facing text includes:

- `重新上传视频（补拍）`
- `提交补充素材`
- `放弃本次订单（申请退款）`

## Refund / Dispute Direction

Current UI still shows simple refund ratios:

- 0%
- 30%
- 50%
- 100%

Future work should refine this into `订单保障与结算规则 V1`, tying refund conditions to evidence and delivery standards.

Important direction:

- limit refund scenarios
- no no-reason refunds
- customer service/admin arbitration needs evidence fields
- backend must record dispute reason, evidence, reviewer delivery, admin result, refund amount/ratio, responsibility side

## Identity / Reviewer Rules

Confirmed direction:

- ordinary users cannot access order-taking from main user-side 练对 entry
- order-taking should be permission-gated from the entrance
- buyer should not see a broad "接单广场"
- identity application can be multi-select and separately reviewed
- public qualification homepage should be searchable by users, but privacy must be protected

Current identity language has evolved away from "老手" as a visible identity where it conflicts with "爱好者". Be careful: older docs may still contain old `小白/老手/大神` wording. Prefer the newer identity direction unless updating legacy docs.

## Forum Current Direction

Forum is not broad social.

Current direction:

- action/ranking categories first
- rankings include equipment, actions, fitness creators, supplements, protein powder, fat-loss foods
- discussion area exists as a reserved entrance
- action-case square belongs to forum, not 练习
- public orders/cases can be rated by users for usefulness

Avoid:

- private chat
- follower/fan mechanics
- broad feed
- generic social posts as main feature

## Practice Current Direction

Practice tab current direction:

- `器械怎么用？`
- locked/preparing action library entrance
- no "今日先学"
- action library should not be deleted; keep it as a future entrance
- categories include warmup, chest, back, shoulder, arms, glutes/legs, core, posture correction, basketball shooting, rehab training, running basics, yoga/stretching

## Backend / Database Notes

The light-escrow decision creates real backend/admin complexity. Do not hide it.

Future schema should support at least:

- order status timeline
- payment/escrow status
- auto-confirm deadline
- reviewer delivery timestamp
- acceptance window hours
- dispute deadline
- refund reason
- refund ratio/amount
- platform service fee
- reviewer settlement amount
- settlement status
- malicious/refund-abuse user flags
- reviewer dispute rate
- reviewer priority settlement tier
- admin arbitration record
- sensitive video/material visibility rules
- privacy/public case consent

Admin pages need:

- order list and state filters
- order detail with user evidence and reviewer delivery
- refund/arbitration decision controls
- identity/reviewer qualification management
- sensitive material and privacy handling
- ledger/wallet reconciliation

## Current Verification

Latest completed checks:

- `node --check public/app.js`
- `node scripts/smoke-test.js`
- local URL returned HTTP 200

Chrome screenshot was used to visually check the 练对 homepage. Temporary screenshot/profile files were cleaned.

## Current Dirty Worktree Notes

There are unrelated or pre-existing modified/untracked files in the workspace. Do not revert them without explicit user approval.

Recent intentionally touched files include:

- `public/app.js`
- `public/styles.css`
- `scripts/smoke-test.js`
- `public/index.html`

Other files such as `README.md`, `server.js`, docs, and skills may already be modified or untracked from earlier work. Treat them carefully.

## Recommended Next Steps

1. Write `ORDER_SETTLEMENT_RULES_V1.md` for light escrow, auto-confirm, refund limits, and arbitration.
2. Update product docs to replace old strong escrow language with light escrow.
3. Design backend schema for order/payment/dispute/settlement.
4. Design admin order/arbitration pages.
5. Then wire frontend state names to backend-ready status codes.

## Latest Update - 2026-06-10 Liandui Only

Focus only on the `练对` block unless the user explicitly expands scope.

Current confirmed `练对` frontend direction:

- Keep the `练对` homepage. Do not delete it.
- User path stays: `练对` tab -> `首页` -> `开始发单` -> service confirmation -> `发单`.
- The old 9 critique-type entry and old reviewer package selector are replaced by:
  - main category single-select
  - add-on service multi-select
  - optional user self-added bonus
  - 15-character reviewer-market short remark
  - preview specialty demand voting

Current main categories:

- `器械使用求教` - free lead item, `免费 ¥0`
  - user-facing copy: `陌生器械不会使用？拍一张或多张图，咨询器械名称、使用方式与调节方法。`
  - supports single or multiple images
  - no add-on services
  - no user self-added bonus
  - backend must lock price to 0 and reject add-ons/bonus
- `力训 & 功能动作点评` - ¥9.9
- `体态 & 肌肉综合分析` - ¥19.9
- `职业劳损 & 运动疼痛建议` - ¥39.9
  - do not use user-facing wording `职业病康复`
  - backend can still classify it as high-threshold rehab/protection
  - only rehab/protection qualified reviewers can see/accept it

Current add-on services:

- `动作代偿专项分析` - +¥5
- `呼吸模式 & 发力联动点评` - +¥5
- `关键帧 / 剪辑标注分析` - +¥10
  - reviewer may use slow motion/keyframe/edit annotation tools only for current-order analysis
  - temporary cache/edit/annotation is allowed only for this order
  - no long-term save, spread, publish, reuse, model training, or commercial secondary use
  - local original video, cache, project files, screenshots, and unsubmitted derivatives must be deleted within 24 hours after completion, cancellation, refund, or arbitration end

Current user bonus rule:

- range: ¥0-¥50
- step: ¥1
- included in order total
- does not mean queue jump, priority, or faster delivery
- backend must ignore frontend-submitted base/add-on prices and recalculate from admin config
- backend only accepts validated user bonus and must lock base price, add-on total, bonus, total price, selected add-on IDs, and remark after order creation

Current short remark rule:

- max 15 Chinese characters
- can be empty
- shown in reviewer-side order market
- it is only a quick scan hint, not the full problem description

Current preview specialty rule:

- cards: basketball shooting, running, football, badminton, table tennis, other
- button text: `期待上线`
- one click per user
- reaching 10000 demand clicks means platform evaluation, not automatic launch

### 2026-06-10 Later Liandui Create Flow Update

The current `练对 -> 发单` page should use a single-page dynamic step module, not new top tabs.

Current visible create-order steps:

1. `选择主品类`
2. `附加服务`
3. `加价备注`
4. `上传素材`
5. `提交订单`

Interaction rules:

- Only the current step module is visible.
- After selecting a main category, the current module closes and the next module appears.
- The user can go back and modify previous choices.
- Selecting `器械使用求教` skips step 2 and step 3 and goes directly to `上传素材`.
- If no category is selected, step 1 shows the guide text `请选择你的咨询类型` and the main-category list.
- After a category is selected, show only the selected category summary plus a reset/reselect action; do not keep showing the full category list.

Current create-page main category cards:

- `器械使用求教` - free lead item, `免费 ¥0`, first in the list
- `力训 & 功能动作点评` - ¥9.9
- `职业劳损 & 运动疼痛建议` - ¥39.9

`体态 & 肌肉综合分析` is temporarily removed from the visible create-page main category card list. Do not show it in the current `发单` category list unless the user asks to bring it back.

Current add-on services:

- Add-ons are visible only for paid categories.
- Free `器械使用求教` hides/skips add-ons.
- `关键帧 / 剪辑标注分析` price is now +¥5, not +¥10.

Current equipment-consult material rule:

- `器械使用求教（免费 ¥0）` supports single or multiple images.
- It does not allow add-ons.
- It does not allow user bonus.
