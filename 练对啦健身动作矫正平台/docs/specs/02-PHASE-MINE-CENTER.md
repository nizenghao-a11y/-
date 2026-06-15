# Phase 02 - 我的 Center

## Page Goal

Make 我的 the global account, identity, and public credibility center. It should not compete with 练对; it should hold identity applications, public qualification profile, orders, wallet, service, and settings.

## User Path

1. User enters 我的.
2. User checks account state.
3. User applies for one or more identities.
4. User previews the public qualification profile.
5. User manages orders, wallet, customer service, and privacy settings.

## Core Modules

- profile card
- multi-identity application entry
- public qualification profile entry
- my orders entry
- wallet ledger entry
- my publishing entry
- customer service and rules

## Optional Modules

- reviewer qualification reminder
- upload-action permission reminder
- public profile preview
- pending tasks
- platform notices

## Extension Slots

- new identity type
- new sport-specific qualification
- new wallet revenue type
- invoice or settlement document

## Backend/Admin Dependencies

- identity and permission model
- audit materials
- public profile privacy filter
- order history
- wallet ledger
- customer-service tickets

## Acceptance Checks

- buyer and reviewer roles can both be represented
- users can apply for multiple identities independently
- identity options are grouped by: 通用基础健身类, 球类专项训练师, 体能与功能训练类, 康复与体态防护类, 柔韧与休闲运动类, 辅助科普类, 平台业余用户
- 训练爱好者 is a single identity with 普通 / 认证 state; do not create a separate 老手 identity
- 普通训练爱好者 can publish questions but cannot accept orders
- 认证训练爱好者 can accept only low-price, small ordinary action orders with daily limits
- basketball trainer is a first-class specialty identity
- public qualification profile is visible to users but hides real name, phone, ID number, and certificate originals
- wallet is separate from order list
- customer service and refund rules are visible
- no follower/fan relationship appears

## Identity Taxonomy

Identity grouping follows three layers:

- official or quasi-official sport/fitness systems: 社会体育指导员, 体育教练员, 运动防护师
- industry or association specialty credentials: basketball, football, badminton, table tennis, yoga, Pilates, running, functional training
- platform-reviewed non-certificate users: 训练爱好者 and专项爱好者

Frontend cards use user-friendly names. Backend audit keeps certificate type, issuing body, certificate image, certificate number if any, work history, training history, specialty tags, and approval level.

Do not expose certificate originals, phone, ID number, or real name on the public profile. Public profile can show only: nickname, approved identity label, level, specialty tags, public cases, rating, completed orders, and platform verification badge.

## Identity List

通用基础健身类:

- 健身教练（国职）: 初级 / 中级 / 高级. For综合肌群动作教学 and常规动作点评.
- 团体课教练: 入门 / 资深. For有氧 and团课动作.
- 力量训练师: 初级 / 中级 / 高级. For器械力量 and胸背腿大肌群动作.

球类专项训练师:

- 篮球训练师: 助理 / 普通 / 高级. For投篮、运球、篮下动作 and basketball-specific critique.
- 足球训练师: 入门 / 资深.
- 羽毛球训练师: 入门 / 资深.
- 乒乓球训练师: 入门 / 资深.

体能与功能训练类:

- 体能训练师: 初级 / 中级 / 高级.
- 功能性训练师: 入门 / 资深.
- 跑步专项训练师: 入门 / 资深.

康复与体态防护类:

- 运动康复师（PT）: 持证 / 资深.
- 体态矫正师: 入门 / 资深.
- 运动防护师: 持证 / 资深.
- 筋膜理疗师: 入门 / 资深.
- 产后康复训练师: 持证 / 资深.

柔韧与休闲运动类:

- 瑜伽训练师: 入门 / 资深.
- 普拉提训练师: 入门 / 资深.

辅助科普类:

- 运动营养师: 持证 / 资深. Forum/content support only; no pure action critique orders by default.

平台业余用户:

- 训练爱好者: 普通 / 认证. 普通 only publishes questions; 认证 can accept low-price ordinary action orders.
- 球类 / 跑步专项爱好者: platform-reviewed, only accepts matching low-price specialty orders.
