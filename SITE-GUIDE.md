# Site Guide — How ChatGPT Sites Should Use This Repository

This repository is the long-term memory, specification and component-testing reference for CALLBACK / King Prompter. The complete playable game may live in ChatGPT Sites; GitHub exists to keep Sites from inventing, forgetting or drifting away from approved decisions.

## Mandatory reading order

Before making a meaningful game change:

1. Read `CURRENT-STATE.md`.
2. Read `decisions/APPROVED.md` and `decisions/DEPRECATED.md`.
3. Read the relevant document(s) in `bible/` and `design/`.
4. If a relevant prototype exists in `components/`, inspect its README and integration notes before copying behavior.
5. Inspect the current Sites implementation before changing it.

Do not assume a prototype represents production behavior. Do not assume an older file is authoritative simply because it contains working code.

## Authority order

When sources disagree, use this order:

1. The user's latest explicit instruction.
2. `decisions/APPROVED.md`.
3. `CURRENT-STATE.md`.
4. Relevant `bible/` specification.
5. Relevant `design/` specification.
6. Approved component integration contract.
7. Current Sites implementation.
8. Prototype/demo behavior.
9. Archived or deprecated material.

Anything in `decisions/DEPRECATED.md` must not be reintroduced unless the user explicitly reverses that decision.

## Engineering rules

CALLBACK is a **server-authoritative, room-based multiplayer game with an explicit finite-state game lifecycle**.

The server is authoritative for room membership, stable player identity, current phase, round number, prompts, deadlines, submissions, voting eligibility, votes, scoring and official results.

Clients may request actions and render state; they must not decide official state independently.

Before inventing infrastructure, identify the established technical vocabulary, algorithm, design pattern or mature library that correctly describes the problem. Prefer proven solutions for generic infrastructure and custom code for CALLBACK-specific gameplay.

Maintain the hierarchy:

**game rules → deterministic/authoritative game state → AI/content systems → presentation**

Rendering, animation, UI and bot-specific hacks must not redefine game rules.

## Product rules

- Mobile-first multiplayer party game.
- Room-code joining.
- Host-controlled game setup.
- Primary emotional target: laughter and playful social competition.
- Do not reveal player submissions before the intended reveal/voting phase.
- Later rounds may be worth more, but scoring rules must be explicit and server-owned.
- Preserve stable player identity through reconnects.
- Keep the experience understandable to non-technical players.

## Creative rules

The approved overarching direction is a **chaotic medieval castle game show**.

- The pigeon is the theatrical host/mascot.
- The crown is the central symbol of victory and conflict.
- Different castle areas can visually house different games.
- Preserve the established opening/menu sequence language: typing → AI processing → royal pigeon mini-scene → crown fight → comic explosion → main-menu reveal / loop.
- Core palette direction: navy, cream, crown yellow, coral, cyan and purple.

Avoid drifting into realistic grim medieval fantasy, generic fantasy-RPG UI, generic neon SaaS UI or unrelated visual themes.

## Component-lab rules

Every component should clearly state:

- purpose
- maturity/status
- what is proven
- what is demo-only
- integration contract
- dependencies
- known limitations

Use these maturity labels:

**CONCEPT → PROTOTYPE → APPROVED → INTEGRATED → DEPRECATED**

`APPROVED` means the component is suitable as a reference for integration. It does not mean Sites has already integrated it.

## Change discipline

When changing an approved rule, update the Bible/decision file rather than silently changing only Sites. When a feature is permanently removed, add it to `decisions/DEPRECATED.md` so future AI sessions do not resurrect it.
