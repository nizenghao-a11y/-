# Phase 03 - 练习 Entry

## Page Goal

Make 练习 a lightweight entry surface, not a full Keep-style course platform. It should show user-facing entrances in natural language and keep internal planning notes out of the UI.

## User Path

1. User opens 练习.
2. User sees `器械怎么用？`.
3. User sees action-library entrance marked as 正在筹备.
4. User sees practice-related future entrances only.

## Core Modules

- `器械怎么用？` entry
- locked action-library entrance
- future category preview

## Optional Modules

- 健身房速查 marked as 正在筹备
- beginner avoid-mistake list
- creator seed content later

## Extension Slots

- large action library
- fixed category order: 练前热身 -> 胸肌 -> 背部 -> 肩部 -> 手臂 -> 臀腿 -> 核心 -> 体态矫正 -> 篮球投篮 -> 康复训练 -> 跑步入门 -> 瑜伽拉伸
- creator uploads
- paid course or topic collection

## Backend/Admin Dependencies

- content audit
- video/image storage
- category and tag management
- creator permission

## Acceptance Checks

- action library is not deleted
- action library is visibly marked as 正在筹备
- page does not require a huge content supply in V1
- no direct forced path to 练对 is required on this page
- user-facing UI does not show internal planning labels such as 后续设计, 先占位, or 隐藏窗口
