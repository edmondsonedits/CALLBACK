# Current State

_Last updated: 2026-08-29_

## Product

**Working direction:** CALLBACK / King Prompter  
**Format:** mobile-first multiplayer party game built in ChatGPT Sites  
**GitHub role:** authoritative Bible, engineering guidance, decision history and component lab

Approved architecture: **server-authoritative, room-based multiplayer with an explicit finite-state lifecycle**. Clients render state and request actions; the server owns official outcomes.

## Creative direction

- Chaotic medieval/Renaissance castle game show
- Theatrical pigeon host
- Crown as victory/conflict symbol
- Different castle areas may host different games
- Controlled comic chaos rather than grim fantasy
- Navy, cream, crown yellow, coral, cyan and purple palette direction

## King Prompter

**Status:** APPROVED SPECIFICATION — NOT YET INTEGRATED IN SITES

Authoritative documents:

- `game-modes/king-prompter/RULES.md`
- `game-modes/king-prompter/FLOW-AND-COPY.md`
- `game-modes/king-prompter/CONTENT.md`
- `game-modes/king-prompter/PLAYTHROUGH.md`
- `game-modes/king-prompter/IMPLEMENTATION.md`

Current definitive flow:

1. A short tutorial introduces the King, pigeon and supposedly human Royal Squires.
2. Round One gives everyone one simple shared King’s request.
3. Players write under 20 words. Early finishers may optionally vote among three curated Round Two requests.
4. Once R1 submissions close, the poll resolves, a three-second countdown runs and Round Two starts while R1 paintings generate.
5. After R2 submissions, players vote on R1 and then R2, always seeing exact prompts beside anonymous images.
6. R1 votes are 100 points; R2 votes are 150. Tied winners all enter the gallery.
7. Round Three shows a torn portrait with an immutable King in the centre. Every active player prompts one equal-prominence missing outer section.
8. Independently generated, clipped patches are stitched into one deliberately mismatched portrait.
9. Players award 300-point Royal Seals to the best other section. The complete collage becomes the gallery centrepiece.
10. Cumulative high score wins the Crown; ties create co-champions.

The previous player-submitted theme/style ballot, two-winning-ingredient combination, ingredient bonus and Crown Gallery revote are superseded and must not be restored.

## Current integration priority

King Prompter’s Sites implementation now contains the approved three-round lifecycle, all-ages request deck, optional three-choice early-finisher poll, overlapping Canvas One/Two generation schedule, one-favorite ballots, 100/150/300 scoring and provider-independent Royal Restoration compositor. Reusable torn-piece layouts cover 3–10 players and three base portraits rotate between matches. Automated lifecycle tests, TypeScript validation and the production build pass.

The remaining gate is a real 4–6-player multiplayer playtest measuring 15–20-minute pacing, tutorial comprehension, generation dead time, laughter, vote confidence and final-collage legibility. Findings may tune timers and presentation copy without changing the approved rules.

## Removed modes

Do not restore Question Cards, Legacy Quick or Legacy Extended without explicit approval.

## Avatar reference

Avatar Studio v2 remains an approved prototype/reference for compact configuration, local SVG reconstruction, presets, editor behavior and reusable reactions. Its fake lobby/local-storage behavior is not production multiplayer authority.
