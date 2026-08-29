# King Prompter — Definitive Rules

**Status:** APPROVED SPECIFICATION — NOT YET INTEGRATED IN SITES  
**Approved:** 2026-08-29  
**Players:** 3–10 active players, one shared host/TV display, one phone per player  
**Target match length:** 15–20 minutes

This is the authoritative rules document. If an older prototype, screen or document conflicts with it, this document wins.

## One-sentence definition

King Prompter is a three-round medieval party game in which players write funny instructions for supposedly human Royal Squires, the squires turn those instructions into paintings, and the room votes to decide who earns the Crown.

## Design pillars

1. **Player creativity is the game.** Image generation translates ideas; it does not supply the winner.
2. **Every request gives a shared comedic starting point.** Players are never told merely to “make anything.”
3. **The prompt and painting are judged together.** The exact player prompt is always visible beside its result during voting.
4. **Generation time becomes play or performance.** It is overlapped with writing, voting or short pigeon comedy whenever possible.
5. **The pigeon presents but never judges.** Votes and scores come only from players and server-owned rules.
6. **The match escalates.** Two individual commissions lead to one deliberately bad shared restoration.

## Fiction and terminology

- The game takes place in a chaotic medieval/Renaissance castle gallery.
- The King wants new artwork for his walls.
- Each player has a “highly trained, completely human Royal Squire” who paints whatever the player describes.
- “Royal Squire” is the player-facing fiction for the image-generation system. The pigeon may joke about fingers, speed, originality and suspiciously mechanical artistry, but essential instructions do not use technical AI language.
- Use **painting**, **portrait**, **masterpiece**, **commission** and **restoration** in player-facing copy. Use technical terms such as image job and inpainting only in implementation documents.
- The pigeon is the theatrical host. The crown represents overall victory.

## Match overview

1. Short tutorial
2. Round One: first King’s request and prompt submission
3. Optional early-finisher poll chooses the Round Two request
4. Three-second transition countdown
5. Round Two: second King’s request and prompt submission
6. Vote and reveal Round One paintings
7. Vote and reveal Round Two paintings
8. Round Three: restore one torn royal portrait together
9. Vote for the best restored section
10. Final scoreboard, Crown winner and completed Crown Gallery

There is no separate prompt-ranking phase and no final revote between the first two round winners.

## Tutorial

- First-time tutorial target: 30–45 seconds.
- Returning players may skip it. The human host may enable it for the whole room.
- The tutorial must explain: the King requests artwork; players describe a painting to a Royal Squire; prompts are under 20 words; prompts become images; prompts remain visible during voting; self-voting is disabled; votes award points; the overall leader wins the Crown.
- Essential instructions appear as readable TV and phone text even when spoken narration is enabled.
- Exact approved tutorial copy is in `FLOW-AND-COPY.md`.

## Round One — First commission

### Request

- The server selects one short curated King’s request.
- Every player receives the same request.
- A request is a simple comic setup, not a complete joke. It should define what the King wants while leaving the characters, action, setting and visual twist largely open.
- Example: **“A portrait of the King’s mysterious childhood pet.”**

### Player submission

- Every active player writes one visual instruction of fewer than 20 words.
- The phone shows the King’s request above the text field at all times.
- The player locks once. A locked prompt cannot be edited.
- Prompts and authors remain hidden until the Round One voting reveal.
- Round One generation starts per entry as soon as that prompt is safely locked; it does not wait for the whole room.
- Default writing deadline: 120 seconds. The room advances early when all required submissions are locked or valid fallbacks are assigned.

### Early-finisher poll

After locking, a player may optionally vote among exactly three curated possible requests for Round Two.

- This is a waiting activity, not a separate blocking phase.
- It opens only for players who finish while Round One submission remains active.
- One player gets one poll vote and may change it until the poll closes.
- The poll closes immediately when Round One submission closes.
- A player who never sees or uses the poll loses nothing.
- Show no live totals or leader.
- Highest vote total wins.
- If top choices tie with at least one vote, the tied choice that reached its final tied total first wins.
- If nobody votes, the server **guesses** by selecting one of the three choices with fair room-seeded randomness.
- Poll participation never awards points.

### Transition

When Round One submission closes, show a synchronized **3…2…1** countdown, then begin Round Two. Do not wait for Round One images to finish.

## Round Two — Player-chosen commission

- The winning early-finisher poll choice becomes the King’s second request.
- If no one voted, use the server’s guessed choice.
- Every player writes a new prompt under the same fewer-than-20-words rule.
- Round Two prompts remain hidden until Round Two voting.
- Default writing deadline: 120 seconds; close early when all required submissions resolve.
- Start each Round Two image job immediately when its prompt locks.
- Round Two is worth 1.5× Round One: **150 points per received vote**.

When Round Two submissions close, proceed to the Round One image vote. Round Two generation continues in the background.

## Image voting for Rounds One and Two

For every candidate, show:

- the generated painting or controlled fallback;
- the exact player-written prompt beside it; and
- no author identity until results.

Rules:

- One vote per player per image-voting round.
- A player cannot vote for their own entry.
- No current totals or leader are shown.
- Default vote deadline: 45 seconds; once every eligible player has voted, use a synchronized three-second closing countdown.
- Round One awards **100 points per received vote**.
- Round Two awards **150 points per received vote**.
- The highest-voted painting is that round’s gallery winner.
- Every painting tied for highest votes is a co-winner and is framed in the Crown Gallery.
- Reveal all authors, vote totals and earned points after voting.
- A disappointing generated image does not trigger automatic compensation. Because the prompt is shown, voters decide case by case whether the idea and result deserve their vote.

## Round Three — Restore the Royal Portrait

### Setup

The King wants one final artwork restored. The TV shows an old royal portrait with the King preserved in the middle and the outer canvas torn away.

- The server loads a restoration template made for the current active player count.
- The missing outer region is divided into one disjoint, roughly equal-area torn section per active player.
- Sections surround the central King, primarily across the top and sides.
- Each player is assigned one section using room-seeded random assignment.
- The original King and surviving central portrait can never be altered by player generation.

### Player contribution

- Each phone shows the full damaged portrait, clearly highlights that player’s assigned missing section, and provides a useful view of the surviving edge it touches.
- The instruction is: **“What was beside or behind the King? Describe what your Royal Squire should restore. Add your own funny twist.”**
- Each player writes one prompt of fewer than 20 words.
- Sections and authors remain hidden from other players while writing and generating.
- Default writing deadline: 90 seconds; close early when all required submissions resolve.

### Assembly

- Generate or inpaint each contribution only inside its assigned mask.
- Crop/clip every result to that section before compositing, so no job can overwrite the King or another player’s section.
- Stitch all sections around the unchanged central portrait.
- Preserve mismatched styles, scale, lighting and perspective. The bad collage is the intended joke.
- Add visible torn seams or decorative golden stitching so the mismatch reads as deliberate restoration, not a rendering defect.
- The complete stitched portrait becomes the large central artwork in the Crown Gallery regardless of which section wins.

### Restoration vote

- Show the complete portrait first.
- Then clearly outline/spotlight each section and show its exact prompt.
- Keep authors hidden until results.
- Each player awards one Royal Seal to another player’s section; self-voting is disabled.
- Each Royal Seal is worth **300 points**.
- Highest-voted section wins **Best Restoration**. All tied highest sections share that title.
- Reveal authors, votes and points, then keep the complete collage framed as one shared art piece.

## Overall winner and Crown Gallery

- Overall score = Round One vote points + Round Two vote points + Round Three Royal Seal points.
- Highest overall score wins the Crown and the title **King Prompter**.
- Overall score ties create co-champions; do not use the pigeon, AI, submission speed or randomness to break them.
- The final gallery shows:
  - all Round One gallery winners;
  - all Round Two gallery winners; and
  - the complete restored portrait as the central/largest piece.
- Round Three’s winning section receives a gold outline or Best Restoration plaque within the shared portrait.

## Pigeon host

- Presentation only: no judging, eligibility decisions, votes, score changes, poll selection or tie-breaking.
- Spoken narration is used at key moments only.
- Host-adjustable tease levels may be Gentle, Cheeky and Roast, but every level stays harmless and party-safe.
- The pigeon may acknowledge prompt locks, react to aggregate progress without revealing leaders, preview the three poll choices, perform short scenes, interact with avatars at harmless random moments and celebrate winners.
- Never shame a slow, losing, disconnected or accessibility-using player.
- Never target protected traits, real appearance, trauma or private information.

## Failure, inactivity and reconnection

- Invalid/missing prompts receive a safe controlled fallback at the deadline; the match continues.
- Failed/late Round One or Two image jobs become voteable fallback cards showing the exact prompt.
- Failed Round Three patch jobs become parchment-style repaired sections showing a decorative interpretation and the exact prompt during voting.
- A disconnected player keeps stable identity, locked prompts, assigned restoration mask, votes and earned points.
- A player who misses a vote simply casts no vote; do not invent one.
- If active player count changes before Round Three assignment, select the template for the final authoritative active count. After masks are assigned, do not reshape the portrait; use the disconnected player’s submitted or controlled fallback patch.
- AI, narration, animation and media failures cannot decide a winner or block match completion.

## Explicitly removed or superseded behavior

- No prompt ranking.
- No player-submitted theme/style ingredient phase.
- No top-two ingredient combination rule.
- No ingredient bonus.
- No Crown Gallery revote between Round One and Round Two winners.
- No pigeon judging or host selection of winners.

