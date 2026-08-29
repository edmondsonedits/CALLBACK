# King Prompter — Implementation Contract

**Status:** APPROVED SPECIFICATION — NOT YET INTEGRATED IN SITES

This document describes how to integrate the approved redesign without weakening CALLBACK's server-authoritative architecture.

## Authority boundary

The server owns:

- active players and stable identity;
- current phase and deadlines;
- Canvas One and Canvas Two prompts;
- optional ingredient suggestions and authorship;
- ingredient-ballot construction and eligibility;
- ingredient votes and the top-two result;
- image jobs and controlled fallbacks;
- image-vote eligibility and ballots;
- score events;
- canvas winners, tied winners and Crown Gallery finalists; and
- final scores and champions.

Clients render snapshots and request actions. The pigeon, animation, narration and avatar reactions are presentation only.

## Conceptual phase flow

Exact enum names may follow the existing lifecycle, but the authoritative sequence must represent these states explicitly:

1. Room setup and lobby
2. Canvas One intro
3. Canvas One prompt submission
4. Per-player optional Canvas Two ingredient submission after prompt lock
5. Canvas One generation plus Canvas Two ingredient voting
6. Ingredient result/author reveal
7. Canvas One image voting
8. Canvas One results
9. Canvas Two intro with both winning ingredients
10. Canvas Two prompt submission
11. Canvas Two generation/pigeon waiting presentation
12. Canvas Two image voting
13. Canvas Two results
14. Crown Gallery voting
15. Final results/game over

Do not recreate prompt ranking as a hidden compatibility phase or fallback.

## Parallel per-player submission behavior

A player who locks a Canvas One prompt may immediately receive the optional ingredient field while other players are still writing.

Requirements:

- Prompt lock remains final under the normal rules.
- Ingredient submission is optional and separately validated.
- A player may submit at most one ingredient for the match.
- Repeated requests with the same action ID are idempotent.
- Refreshing restores whether the player already submitted or skipped.
- Ingredient authorship remains private until after the ballot result.
- The room advances when required prompt work is complete or the server deadline expires; optional ingredient work must not indefinitely block the game.

## Ingredient ballot construction

Approved principles:

- Combine curated built-in choices and eligible player submissions.
- Scale total ballot size with active player count.
- Preserve variety where possible without guaranteeing one winner from each category.
- Keep authorship hidden during voting.
- Block self-voting on a player's own ingredient.
- Select exactly two winning choices.
- Reveal player authors after the result.
- Award the approved small fixed bonus to each player-authored winning ingredient.
- If the same player authors both winning ingredients in a future rule variant, score-event deduplication and the approved reward policy must be explicit before enabling it.

### Tunable starting formula

The exact formula is a balance value, not a pending human creative decision. A safe prototype may begin with:

- total ballot choices = clamp(active players + 2, 4, 8);
- at least two curated choices when the pool permits;
- sample eligible player suggestions deterministically when submissions exceed available slots; and
- fill every missing slot from the curated pool.

This formula must be validated at 3, 6 and 10 players and may change without altering the approved design principle.

### Ingredient ranking ties

Exactly two choices must be produced for Canvas Two. Use a documented deterministic server-side tiebreaker after official vote totals, such as:

1. more first-choice votes;
2. more total weighted points;
3. stable room-seeded selection among still-tied choices.

Do not use submission speed.

## Canvas Two brief assembly

- Preserve both winning ingredient texts.
- Do not ask AI or the pigeon to replace a contradictory winner.
- Apply only minimal structural joining text needed to make a prompt instruction.
- Store the original winning choices separately from the combined brief.
- Show both winners clearly on the host and phone screens.
- Treat player-submitted ingredient text as untrusted content.

## Image voting UI contract

Every candidate card must display:

- the generated image or controlled fallback;
- the exact originating player prompt; and
- voting state/rank controls.

During voting:

- keep author identity hidden;
- visibly disable the voter's own entry;
- do not reveal vote totals or current leader;
- preserve the same ordering rules for reconnects; and
- keep the prompt readable without requiring a hidden detail screen.

This paired prompt-and-image presentation allows the room to decide case by case whether the idea, image execution or combination deserves the vote.

## Scoring contract

- Delete or disable prompt-ranking score events for this mode.
- Keep Canvas One image values as the base.
- Derive Canvas Two values as 1.5× the equivalent Canvas One values.
- Use integer point values; choose base values that make the 1.5 multiplier exact or define an explicit rounding rule.
- Use a small fixed ingredient-win bonus that cannot outweigh a strong image-vote performance.
- Keep the Crown Gallery as the largest single competitive reward.
- Use uniquely keyed score events for every awarded vote rank, ingredient bonus and final vote.
- Official totals come only from the server score ledger.

Exact base points and bonus points are balance variables to test, not permanent values inferred by a client.

## Finalist contract

- Record every highest-scoring image for each canvas.
- Add all tied highest scorers from Canvas One.
- Add all tied highest scorers from Canvas Two.
- Deduplicate by stable answer/image identity.
- The Crown Gallery may therefore contain more than two entries.
- Final vote requirements must shrink safely when self-voting leaves a player with fewer eligible finalists.
- Preserve overall-score co-champions.

## Pigeon and avatar presentation

Host-adjustable teasing changes only presentation copy/animation selection.

The pigeon may react to:

- an individual prompt lock;
- aggregate ingredient-vote progress;
- ingredient-choice reveal;
- image-generation progress;
- random safe avatar cameos; and
- canvas/final victories.

Spoken narration is limited to key moments. Essential instructions and results require visible captions/text. Presentation must respect reduced-motion and audio settings.

Random comedy moments must be derived from safe presentation selection, not private player data or hidden vote totals.

## Failure behavior

- If player suggestions are missing or invalid, fill ballot slots with curated choices.
- If an image job fails or misses its deadline, attach a controlled fallback to the original prompt and keep it voteable.
- If narration fails, continue with text and animation.
- If an avatar cannot render, use a safe default.
- If a client disconnects, preserve the player's consumed actions and restore the current snapshot on reconnect.
- AI and presentation failure cannot advance phases, decide finalists or mutate scores outside approved server transitions.

## Separation from shared infrastructure

Keep shared:

- room/session identity;
- synchronization;
- deadlines;
- action validation/deduplication;
- score ledger;
- image-job/media pipeline;
- reconnect behavior; and
- common host/phone primitives.

Keep King Prompter-specific:

- three-part round plan;
- ingredient suggestion and ballot state;
- two-winner combination rule;
- prompt-plus-image voting presentation;
- 1.5× Canvas Two scoring;
- tied-finalist advancement; and
- mode-specific pigeon cues.

Do not build a universal game-description language solely for this redesign. Extract only boundaries already supported by multiple real modes.

## Integration and verification gates

Before marking this mode INTEGRATED:

- update the live Sites implementation;
- remove prompt ranking from UI, engine, snapshots and scoring;
- confirm the original prompt appears beside every voting image;
- test ingredient submission, anonymity, no-self-voting and author reveal;
- test ballot construction at 3, 6 and 10 players;
- test two-theme, two-style and conflicting-winner combinations;
- test Canvas Two 1.5× scoring and integer rounding;
- test tied winners from either and both canvases;
- test reconnects and duplicate actions in every new phase;
- test missing suggestions and failed images;
- verify a normal real-player match can finish in 15–20 minutes; and
- conduct real 4–6-player laughter, comprehension and pacing tests.

Solo/bot tests may verify mechanics but cannot prove the social-fun target.
