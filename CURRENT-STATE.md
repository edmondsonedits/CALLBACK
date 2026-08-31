# CALLBACK / King Prompter — Project Bible & Component Lab

This repository is the authoritative reference used to guide development of the CALLBACK castle-party-game collection in ChatGPT Sites. It is not intended to be the production copy of the complete game.

It has two jobs:

1. **Project Bible** — record approved product, gameplay, technical, visual and UX decisions so Sites has a stable source of truth.
2. **Component Lab** — hold isolated working prototypes that can be tested and refined before integration into the complete game.

## Read this first

1. [SITE-GUIDE.md](SITE-GUIDE.md)
2. [CURRENT-STATE.md](CURRENT-STATE.md)
3. [decisions/APPROVED.md](decisions/APPROVED.md)
4. Relevant files in [bible/](bible/), [design/](design/) and [game-modes/](game-modes/)
5. Relevant prototype in [components/](components/) when one exists

If a prototype conflicts with the Bible, the Bible wins unless the user explicitly changes the decision.

## Repository map

- `bible/` — collection-wide product, architecture, UX, history, AI and creative-direction specifications
- `design/` — palette and recurring castle/host visual language
- `game-modes/` — approved rules and implementation guidance for individual modes
- `components/` — independent reference prototypes, not automatically production code
- `decisions/` — approved, open and deprecated decisions
- `archive/` — historical or rejected concepts retained only for context

## Active specifications

- [King Prompter](game-modes/king-prompter/RULES.md)
- [Royal War Room](game-modes/royal-war-room/README.md)
- [Bowl of Fools — working title](game-modes/bowl-of-fools/RULES.md)
- [Public History Books](bible/08-history-books.md)

## Core principle

Develop vocabulary-first: identify the established technical pattern or mature library that fits generic infrastructure, keep game-specific rules custom, and preserve a server-authoritative room model with explicit finite-state lifecycles.
