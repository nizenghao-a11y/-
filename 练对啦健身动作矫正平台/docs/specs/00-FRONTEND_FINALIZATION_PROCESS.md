# Frontend Finalization Process

## Goal

Create a stable frontend prototype for 练对啦 that supports later mini-program, backend, and reviewer/admin integration without changing the core page structure every time a feature is added.

## Primary Navigation

The product keeps four bottom tabs:

- 练习
- 练对
- 论坛
- 我的

No V1 feature should require a fifth tab. New business should first be placed into an existing tab, page, module, or extension slot.

## Page Layers

Each business area follows four layers:

- primary tab
- list/entry page
- detail page
- flow page

V1 prototype can compress detail and flow pages into card modules, but the labels and entrances should stay visible.

## Component System

Use reusable frontend concepts:

- topbar
- bottom nav
- subnav
- panel
- tag
- module card
- status card
- upload card
- package selector
- ranking list
- settings list

Style must be adjustable through shared CSS variables for color, radius, spacing, surface, shadow, and text tone.

## Business Model Mapping

Frontend pages should connect to these future models:

- identity and permission
- content and action
- order and settlement
- review and risk control
- wallet and ledger

## Phase Order

1. Phase 01: 练对 core transaction prototype.
2. Phase 02: 我的 account and operations center.
3. Phase 03: 练习 trust entry and action-library placeholder.
4. Phase 04: 论坛 action ranking light feature.
5. Phase 05: integration and QA across all tabs.

## Acceptance Checks

- four bottom tabs render
- 练习 has a visible but locked action-library entrance
- 练对 preserves order creation, package standards, delivery, refund, and settlement paths
- 论坛 focuses on action ranking, not broad social
- 我的 contains identity, order, wallet, service, and settings entrances
- no private chat, followers, or AI action-score core feature appears
