---
name: lianduila-frontend-finalization
description: Use when designing, reviewing, or implementing the 练对啦 frontend prototype, especially page structure, UI style, tab navigation, phased specs, and preserving the product's human critique marketplace concept.
---

# 练对啦 Frontend Finalization

## Purpose

Use this project skill to keep future frontend work aligned with the product concept: low-cost human action critique with a lightweight learning and forum entry.

## Required Context

Before changing UI or page structure, read:

- `AGENTS.md`
- `PRODUCT_PAGE_FRAMEWORK_V1.md`
- `LIANDUI_PAGE_PROTOTYPE_V1.md`
- `FORUM_ACTION_RANKING_V1.md`
- `PRODUCT_RULES_V1.md`
- `docs/specs/00-FRONTEND_FINALIZATION_PROCESS.md`

## Fixed Product Direction

Keep four primary tabs:

- `练习`
- `练对`
- `论坛`
- `我的`

Do not collapse `我的` into `练对`. Do not remove `练习` or `论坛`; if not ready, keep lightweight entrances.

## V1 Frontend Rules

练习:

- show equipment tutorial and free learning entry
- keep action-library entrance visible but marked as not open
- avoid building a large course library before content supply is solved

练对:

- preserve the transaction loop
- include package quality standards
- include order, delivery, refund, and settlement placeholders
- no private chat

论坛:

- open only action ranking, votes, comments, and entry to 练对
- do not build a broad social feed
- keep advertising/professional supplement as future slots

我的:

- account, identity, orders, wallet, customer service, settings
- support both buyer and reviewer roles

## UI Rules

- simple mobile-first mini-program feel
- utilitarian and trust-oriented
- 8px card radius unless the platform requires otherwise
- stable bottom navigation
- visible disabled/locked states for deferred features
- reusable variables for color, spacing, radius, and surface styles

## Deliverables Per Phase

Each phase should have a spec file under `docs/specs/` with:

- page goal
- user path
- core modules
- optional modules
- extension slots
- backend/admin dependencies
- acceptance checks
- known blockers

## Validation

After implementation:

- run the local server
- test all primary tabs
- test internal 练对 navigation
- confirm action-library entrance is locked, not deleted
- confirm forum remains action-ranking focused
- confirm no private chat, fans, or AI action-score core logic was added
