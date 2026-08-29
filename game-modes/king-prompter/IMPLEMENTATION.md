# King Prompter — Implementation Contract

**Status:** IMPLEMENTED IN SITES — AUTOMATED VERIFICATION PASSED; REAL MULTIPLAYER PLAYTEST PENDING

This document tells an engineer or coding AI how to build the mode from no prior knowledge while preserving CALLBACK’s server-authoritative multiplayer architecture.

## Architectural rule

King Prompter is a **server-authoritative, room-based multiplayer game with an explicit finite-state lifecycle**.

The server owns official identity, active-player set, phase, deadlines, request choices, prompts, generation jobs, restoration assignments, voting eligibility, votes, score ledger, winners and final results. Clients render snapshots and submit idempotent actions. The pigeon, animation, audio and generated media never mutate rules by themselves.

## Required authoritative states

Exact enum names may follow the codebase, but these states must exist semantically:

```text
LOBBY
TUTORIAL
ROUND_1_INTRO
ROUND_1_SUBMIT
ROUND_2_COUNTDOWN
ROUND_2_SUBMIT
ROUND_1_VOTE
ROUND_1_RESULTS
ROUND_2_VOTE
ROUND_2_RESULTS
RESTORATION_INTRO
RESTORATION_SUBMIT
RESTORATION_GENERATE
RESTORATION_VOTE
RESTORATION_RESULTS
FINAL_RESULTS
```

The early-finisher poll is parallel per-player activity inside `ROUND_1_SUBMIT`, not a blocking global phase.

## Transition contract

```text
LOBBY -> TUTORIAL or ROUND_1_INTRO
TUTORIAL -> ROUND_1_INTRO
ROUND_1_INTRO -> ROUND_1_SUBMIT
ROUND_1_SUBMIT -> ROUND_2_COUNTDOWN
ROUND_2_COUNTDOWN -> ROUND_2_SUBMIT
ROUND_2_SUBMIT -> ROUND_1_VOTE
ROUND_1_VOTE -> ROUND_1_RESULTS
ROUND_1_RESULTS -> ROUND_2_VOTE
ROUND_2_VOTE -> ROUND_2_RESULTS
ROUND_2_RESULTS -> RESTORATION_INTRO
RESTORATION_INTRO -> RESTORATION_SUBMIT
RESTORATION_SUBMIT -> RESTORATION_GENERATE
RESTORATION_GENERATE -> RESTORATION_VOTE
RESTORATION_VOTE -> RESTORATION_RESULTS
RESTORATION_RESULTS -> FINAL_RESULTS
```

Only the server transition function advances state. Deadlines and “all required players resolved” are server facts. Animation completion may acknowledge a server transition but cannot originate one.

## Starting defaults

These are approved default balance values and should be configurable on the server:

| Setting | Default |
|---|---:|
| Players | 3–10 |
| Tutorial | 30–45 seconds; skippable |
| Round One writing deadline | 120 seconds |
| Round Two countdown | 3 seconds |
| Round Two writing deadline | 120 seconds |
| Round One vote deadline | 45 seconds |
| Round Two vote deadline | 45 seconds |
| Restoration writing deadline | 90 seconds |
| Restoration vote deadline | 45 seconds |
| All-votes-received closing countdown | 3 seconds |
| Prompt maximum | fewer than 20 words |
| Round One points | 100 per received vote |
| Round Two points | 150 per received vote |
| Restoration points | 300 per Royal Seal |

The 15–20-minute target is a product acceptance target, not a requirement to add artificial waiting. End writing/voting early under the rules when all required actions resolve.

## Minimum domain model

Stable IDs are required; labels and array positions are not identities.

```text
Room
  id, seed, phase, phaseVersion, deadline, settings
  activePlayerIds[]
  round1RequestId
  round2PollChoiceIds[3]
  round2PollResultId
  restorationTemplateId
  restorationAssignments{playerId -> maskId}

Player
  id, stableSessionId, displayName, avatarConfig, connected, active

PromptSubmission
  id, roomId, round, playerId, exactText, normalizedWordCount
  status, lockedAt, moderationState

PollVote
  roomId, playerId, choiceId, updatedAt, actionId

ImageJob
  id, roomId, submissionId, kind
  provider/model, status, startedAt, completedAt, assetId, fallbackReason

RestorationPatch
  roomId, playerId, maskId, submissionId, imageJobId, clippedAssetId

Vote
  roomId, phaseVersion, voterPlayerId, targetEntryId, actionId, castAt

ScoreEvent
  uniqueKey, roomId, playerId, sourceType, sourceId, points
```

Store exact player text separately from any sanitized model prompt wrapper. Voting always displays the approved exact player text, not hidden provider instructions.

## Client actions

At minimum:

- `readyTutorial(actionId)`
- `lockRoundPrompt(round, text, actionId)`
- `setEarlyPollVote(choiceId | null, actionId)`
- `castImageVote(round, entryId, actionId)`
- `lockRestorationPrompt(text, actionId)`
- `castRestorationVote(patchId, actionId)`

Every action validates room, stable player identity, phase/phaseVersion, deadline, eligibility, payload shape and whether the action has already been consumed. Retries with the same action ID return the prior result without duplicate side effects.

## Prompt validation

- Count words with one shared server function. Client counts are advisory.
- Valid length is 1–19 words.
- Trim surrounding whitespace and normalize unsafe control characters without rewriting the player’s wording.
- Run the approved safety/moderation pipeline.
- Reject privately with a usable reason while time remains.
- Once locked, a prompt is immutable.
- At deadline, an unresolved player receives a controlled safe fallback submission and remains part of the flow.

## Round request selection

Round One:

- Select one eligible curated request using the room seed and recent-content exclusion.
- Store its stable content ID and rendered text.

Round Two poll:

- Select exactly three distinct eligible request IDs before `ROUND_1_SUBMIT` begins.
- Use the diversity rules in `CONTENT.md`.
- Keep one room-wide display order.
- Persist choices so reconnects see the same ballot.

## Early-finisher poll algorithm

Eligibility begins only after that player successfully locks Round One and ends when `ROUND_1_SUBMIT` closes.

- Vote is optional and carries no score.
- A player may set/change/clear one vote while open.
- Never expose live totals.
- Closing Round One atomically closes the poll and resolves its result.

Resolution:

1. Count valid votes per choice.
2. If every count is zero, select one of all three with deterministic room-seeded pseudorandom choice and record `resolution = guessed_no_votes`.
3. If one choice has the unique maximum, select it.
4. If choices tie for a non-zero maximum, compare when each tied choice first reached its final maximum count; earliest wins.
5. If event timestamps are identical at storage precision, use stable room-seeded selection among those still tied.

This “first to reach the tied total” rule uses authoritative accepted-vote timestamps, never client clocks.

## Generation scheduling

Round One and Round Two jobs start per player immediately after safe prompt lock. Do not wait for a batch.

- Round One jobs continue through the early poll, countdown and Round Two writing.
- Round Two jobs continue through Round One voting/results.
- Before opening a vote, resolve every entry to either a generated asset or controlled fallback.
- Use a bounded wait/hard deadline. Presentation fills short gaps; it does not create an unbounded phase.
- Preserve one voteable entry per active player even when generation fails.

Do not award quality scores from the model, regenerate based on perceived funniness or let provider metadata affect rank.

## Image voting

Create a stable candidate order per voter/phase and preserve it across reconnects. The order may be room-seeded and rotated to reduce position bias.

Validation:

- voter is active and eligible;
- target belongs to the current round;
- target is voteable;
- target is not the voter’s own entry;
- one accepted vote per voter per phaseVersion;
- action is before deadline.

When all eligible votes arrive, start the server-owned three-second close countdown. Do not accept changes after the vote is locked. At deadline, missing voters abstain.

Score ledger:

- Round One: one `R1_VOTE_RECEIVED:<voteId>` event worth 100 to target author.
- Round Two: one `R2_VOTE_RECEIVED:<voteId>` event worth 150.
- Restoration: one `R3_SEAL_RECEIVED:<voteId>` event worth 300.
- Unique keys make scoring idempotent.

Winner set for Rounds One/Two = every entry with the maximum received vote count. If zero votes are possible, either every zero-vote entry ties or the presentation may label the round “No gallery favourite”; do not invent votes. For ordinary 3+ active-player play, self-vote restrictions still leave eligible targets.

## Restoration template system

Provide reviewed templates for each supported active-player count from 3 through 10. Each template includes:

- immutable base portrait asset;
- immutable central-preservation mask;
- exactly N non-overlapping editable masks;
- patch bounds/context previews;
- final gold-seam overlay;
- mask-area metrics proving roughly equal prominence; and
- deterministic compositing order.

Assignment:

1. Freeze authoritative active-player set before `RESTORATION_INTRO`.
2. Load the matching N-player template.
3. Shuffle mask IDs with the room seed.
4. persist `playerId -> maskId` before clients render.

Preferred mask-capable generation pipeline:

1. Send base image, player mask, exact player concept and safe style wrapper to a mask-capable image-edit/inpainting service.
2. Require output dimensions identical to the base.
3. On return, discard every pixel outside the assigned mask.
4. Store the clipped patch.
5. Composite clipped patches over the immutable base in documented order.
6. Apply seam overlay last.

The immutable base is the source of truth. Never use one player’s output as the input base for the next player; sequential edits would allow drift and give later players unequal influence.

### Provider-independent torn-overlay adapter

Royal Restoration must remain playable with image models that cannot edit a supplied base or mask. The approved adapter is:

1. Generate one ordinary square image independently from each player prompt.
2. Use a pre-authored 3–10-player layout record containing stable slot ID, percentage bounds, irregular polygon clip path, object position and slight rotation for every piece.
3. Position the square beneath its assigned torn-section overlay and crop it with that exact clip path.
4. Layer every clipped square above the immutable base portrait and below the final vignette/seam treatment.
5. Never ask the provider to draw the King, the tear, a frame or transparency; those are deterministic presentation layers.
6. Keep the central King in the base asset unchanged. No generated square becomes an input to another square.

This adapter trades cross-piece visual continuity for provider compatibility, deterministic automation and the intentionally bad-collage joke. Every supported player count must be validated in advance, and incoming image dimensions/aspect ratios must be normalized before `object-fit: cover` cropping.

The current Sites implementation ships three rotating 3:2 base portraits and reusable layouts for every player count from 3 through 10. Square patch generation uses the room-selected image model and the layout compositor applies the torn geometry at render time.

## Restoration presentation and vote targets

- Composite one final image asset for the TV.
- Keep each patch as a separately addressable vote target with stable patch/submission ID.
- Store outline geometry so TV/phone can highlight the same section.
- During voting, show the complete image, selected section outline and exact prompt.
- Do not reveal author until results.
- Block own patch.
- Highest vote count receives Best Restoration; retain all tied top patches.
- The final gallery stores the complete composite once, with winner-patch metadata, rather than storing each patch as a separate framed painting.

## Presentation event contract

The server may emit semantic events such as:

- `PLAYER_PROMPT_LOCKED`
- `POLL_CLOSED`
- `IMAGE_JOB_PROGRESS_AGGREGATE`
- `VOTE_CLOSE_COUNTDOWN_STARTED`
- `ROUND_WINNERS_REVEALED`
- `RESTORATION_COMPOSITE_READY`
- `CHAMPIONS_REVEALED`

The TV chooses safe animation/audio from these events. It must not infer official results from local visuals or job completion order. Tease setting affects only copy/animation selection. Narration failure falls back to visible text.

## Reconnection and departures

- Reconnect restores the same player ID, current snapshot, locked text, poll choice, vote state, restoration assignment and score.
- Locked actions remain locked.
- Before Restoration assignments, an authoritative departure may change N and therefore template selection.
- After assignment, keep the mask and resolve it through the player’s submission or fallback even if disconnected.
- Host removal/room cancellation follows shared CALLBACK policy; King Prompter does not invent a parallel session system.

## Security and privacy

- Treat names, prompts and content IDs as untrusted input.
- Authorize every action against room membership.
- Rate-limit submission/vote endpoints.
- Keep provider credentials server-side.
- Do not expose unmoderated text to other clients.
- Do not use hidden vote totals, private text or player profile data to generate pigeon jokes.

## Required test matrix

### Rules

- 3, 4, 6 and 10 players complete the full lifecycle.
- Round One/Two prompt limit accepts 19 words and rejects 20.
- Poll opens only after personal lock and never blocks transition.
- Poll resolves unique win, non-zero tie by first-to-reach, identical-timestamp fallback and zero-vote guess.
- R1 generation overlaps R2 writing; R2 generation overlaps R1 vote.
- Self-voting is rejected in all three votes.
- Prompts remain visible beside every image/patch.
- Scoring is exactly 100/150/300 per received vote and never duplicates on retries.
- Tied round winners all enter the gallery; tied Best Restoration patches all receive the title; tied overall leaders are co-crowned.

### Restoration

- Every N from 3–10 loads exactly N masks.
- Masks do not overlap, stay outside immutable centre and have acceptably similar area/prominence.
- Malicious/incorrect provider output cannot alter pixels outside its assigned mask.
- Composition order is deterministic.
- Failed patch produces a visible, voteable fallback and full composite.
- Outline hit targets match rendered masks on common phone sizes.

### Resilience and UX

- Refresh/reconnect in every state restores exact action status.
- Duplicate actions are idempotent.
- Slow/failed image, narration and avatar assets cannot block completion.
- Reduced motion, mute and captions preserve all essential information.
- Real 4–6-player tests finish in 15–20 minutes and measure instruction comprehension, dead time, laughter, vote confidence and whether the finale remains legible.

## Integration gate

The live Sites implementation has removed the old prompt-ranking/Crown-revote lifecycle, added the request poll, overlapping canvas schedule, fixed 100/150/300 scoring, full tied-winner preservation and reusable Royal Restoration compositor. Automated lifecycle, type and production-build verification pass. Keep the product status **multiplayer playtest pending** until at least one real 4–6-player session confirms the 15–20-minute pacing and social-fun target; solo/bot testing verifies mechanics but not laughter, comprehension or room energy.
