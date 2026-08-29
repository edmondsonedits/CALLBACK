# Game Modes

This directory is for the authoritative specification of each active game mode.

Each approved mode should get its own folder containing, at minimum:

- `RULES.md` — exact player-facing and server-facing rules
- `EXAMPLES.md` — concrete sample rounds
- `IMPLEMENTATION.md` — state transitions, validation, scoring and integration notes

## Approved specifications

### King Prompter

**Status:** APPROVED SPECIFICATION — NOT YET INTEGRATED IN SITES  
**Approved:** 2026-08-29

- [Rules](./king-prompter/RULES.md)
- [Examples](./king-prompter/EXAMPLES.md)
- [Implementation contract](./king-prompter/IMPLEMENTATION.md)

The specification removes prompt ranking, adds a player-influenced Canvas Two ballot during Canvas One generation, keeps prompt text visible beside every voting image, makes Canvas Two worth 1.5× Canvas One and advances all tied canvas winners.

Do not describe this redesign as live or integrated until the current Sites implementation is separately updated and verified.

## Deprecated modes

Do not add Question Cards, Legacy Quick or Legacy Extended; they are explicitly deprecated.

Until a mode has an approved specification here, Sites should inspect the current game and ask the Bible/decision files what is settled rather than inventing permanent rules from an old prototype.
