# CALLBACK / King Prompter — Project Bible & Component Lab

This repository is the authoritative reference used to guide development of CALLBACK / King Prompter in ChatGPT Sites. It is **not** intended to be the production copy of the complete game.

It has two jobs:

1. **Project Bible** — record approved product, gameplay, technical, visual and UX decisions so Sites has a stable source of truth.
2. **Component Lab** — hold isolated working prototypes that can be tested and refined before they are integrated into the full game in Sites.

## Read this first

When using this repository to build or modify the game, read in this order:

1. [`SITE-GUIDE.md`](SITE-GUIDE.md) — rules for how Sites/AI should use this repository.
2. [`CURRENT-STATE.md`](CURRENT-STATE.md) — concise snapshot of what is currently approved and active.
3. [`decisions/APPROVED.md`](decisions/APPROVED.md) — authoritative decisions.
4. Relevant files in [`bible/`](bible/) and [`design/`](design/).
5. Relevant prototype in [`components/`](components/) when one exists.

If a prototype conflicts with the Bible, **the Bible wins** unless the user explicitly changes the decision.

## Repository map

- `bible/` — product, gameplay, architecture, UX, AI and creative-direction specifications.
- `design/` — palette, recurring visual language and castle/host guidance.
- `game-modes/` — approved rules and implementation guidance for individual modes as they are finalized.
- `components/` — independent testable prototypes. These are references, not automatically production code.
- `decisions/` — approved, open and deprecated decisions.
- `archive/` — historical or rejected concepts retained only when useful for context.

## Current component

`components/avatar-studio/` contains the existing Avatar Studio v2 prototype. It demonstrates the avatar configuration model, renderer, editor and animation vocabulary. Its local lobby and local-storage behavior are demo behavior and must not be mistaken for production multiplayer architecture.

## Core principle

CALLBACK should be developed vocabulary-first: identify the established technical pattern or mature library that fits generic infrastructure, keep CALLBACK-specific gameplay custom, and preserve a server-authoritative room-based multiplayer architecture with an explicit finite-state game lifecycle.
