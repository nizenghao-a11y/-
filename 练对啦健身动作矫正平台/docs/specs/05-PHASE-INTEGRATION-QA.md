# Phase 05 - Integration QA

## Goal

Verify the frontend prototype can support later mini-program, backend, and admin integration without another page-structure reset.

## Required Paths

- bottom navigation switches between 练习 / 练对 / 论坛 / 我的
- 练对首页 -> 练对发单
- 练对发单 -> 练对订单
- 论坛分类 -> 论坛具体排行
- 我的 -> 身份审核
- 我的 -> 钱包流水
- 我的 -> 客服仲裁

## UI Checks

- four bottom tabs remain stable
- internal 练对 subnav does not replace bottom tabs
- content pages do not place cross-tab jump buttons
- locked/disabled entrances are visually clear
- buttons have at least 44px touch target height
- text wraps cleanly on mobile
- no horizontal scroll
- cards use consistent 8px radius
- primary action is obvious on each screen

## Product Boundary Checks

- no private chat
- no fan/follow system
- no AI action score as core value
- no full course platform in V1
- no copied external video library

## Future Integration Checks

- each order action can map to backend status
- each reviewer action can map to permission model
- each refund action can map to arbitration model
- each wallet action can map to ledger model
- each content entry can map to audit model

## Known Blockers

- real WeChat login
- video upload and privacy storage
- WeChat payment escrow
- reviewer qualification rules
- customer-service arbitration operations
- content source and copyright compliance
