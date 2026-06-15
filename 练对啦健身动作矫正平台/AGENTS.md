# AGENTS.md

## Project Mission

练对啦 is a WeChat mini-program prototype for low-cost human fitness/action critique. The product is not a generic fitness course app, not an AI action-recognition product, and not a social network.

Core loop:

1. User learns or discovers an action problem.
2. User uploads a short action video.
3. User selects a critique package.
4. Payment is held by the platform.
5. A qualified human reviewer accepts and delivers structured feedback.
6. User accepts, disputes, or requests partial refund.
7. Platform settles revenue and records quality.

## Product Boundaries

Do not add these as core features:

- private chat
- followers or fan relationships
- broad social feeds
- AI action analysis as a trust source
- large course/video library in V1
- copied copyrighted training videos

Allowed lightweight placeholders:

- AI assistant for FAQ, form guidance, or arbitration summaries
- action library entrance marked as not open yet
- forum entrance focused on action ranking and debate
- advertising placeholder inside forum or ranking surfaces
- future sports or rehab categories as tags/config, not separate systems

## Frontend Architecture Rule

The mini-program frontend keeps four primary tabs:

- 练习: free trust entry, equipment tutorials, action library placeholder
- 练对: paid human critique transaction loop
- 论坛: action ranking, voting, and debate-light entry
- 我的: account, identity, orders, wallet, customer service

Each page must reserve three module types:

- core modules: required in V1
- optional modules: hidden or placeholder in V1
- extension slots: future business, category, or operation entries

## Three-End Compatibility

Design every page so it can later connect to:

- WeChat mini-program frontend
- backend/admin operation system
- reviewer/customer-service workflows

Frontend pages should display and trigger actions only. Complex rules belong to unified business models:

- identity and permission model
- content and action model
- order and settlement model
- review and risk-control model
- wallet and ledger model

## UI Direction

The UI should feel simple, clear, and utilitarian. It should support repeated use and fast scanning, not a marketing landing page.

Design constraints:

- bottom navigation has exactly four tabs
- cards use 8px radius or less
- action buttons must have clear states
- use symbol/icon controls where useful
- no decorative blobs or one-note color palette
- no text overflow in buttons/cards
- show lightweight placeholders for deferred features instead of deleting their entrances

## Current V1 Frontend Scope

Build and maintain these first:

- practice homepage with equipment tutorials and locked action-library entrance
- liandui core pages: home, create order, market, orders, delivery
- forum action-ranking page with light voting/comment placeholders
- mine homepage with identity, orders, wallet, service, settings entrances

## Required Before UI Changes

Before making frontend changes, read:

- `PRODUCT_PAGE_FRAMEWORK_V1.md`
- `LIANDUI_PAGE_PROTOTYPE_V1.md`
- `FORUM_ACTION_RANKING_V1.md`
- `PRODUCT_RULES_V1.md`
- `docs/specs/00-FRONTEND_FINALIZATION_PROCESS.md`

Then confirm the change belongs to an existing tab, page, module, or extension slot.

## Verification

After frontend changes:

- run the local server
- open `http://localhost:5173`
- verify all four tabs render
- verify 练习动作库 remains a locked entrance
- verify 论坛 remains action-ranking focused
- verify 练对 can create a prototype order
- verify no private chat/follower/AI-score core feature appears
