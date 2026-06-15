# Phase 04 - 论坛 Ranking

## Page Goal

Make 论坛 a lightweight ranking and rating entry. It should not become a broad social community in V1.

## User Path

1. User enters 论坛.
2. User first browses ranking category tags.
3. User enters a category to view the concrete ranking list.
4. User rates items or rates public case critiques.
5. User stays in the forum flow unless they manually switches tabs through the bottom navigation.

## Core Modules

- ranking category grid
- ranking category detail page
- item score list
- action case square
- public case critique usefulness rating
- discussion entrance placeholder

## Optional Modules

- professional supplement
- discussion area
- weekly rankings
- action ranking
- equipment ranking
- fitness creator ranking
- supplement ranking
- protein powder ranking
- fat-loss food ranking
- beginner list
- avoid-mistake list

## Extension Slots

- equipment ads
- gym or training camp ads
- certified expert supplement
- moderation and report flow

## Backend/Admin Dependencies

- public order data
- ranking item data
- ranking score records
- critique rating records
- comment moderation
- report/risk control
- advertising review

## Acceptance Checks

- forum focuses on rankings and critique usefulness
- forum home shows categories first, not a full ranking list
- concrete rankings appear only after a category is selected
- discussion entrance can exist, but V1 does not build a broad community
- no private chat
- no follower/fan model
- advertising is only a placeholder, not a core V1 workflow
- forum content does not place cross-tab jump buttons; bottom navigation handles tab switching
- privacy orders do not enter the public case square
