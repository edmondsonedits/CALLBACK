# Royal Misread — shared-sketch AI party-game prototype

**Status:** PROTOTYPE  
**Working title only:** Royal Misread  
**Project:** CALLBACK component lab

## Purpose

Test the new mode loop before it is promoted into the production/Sites game:

1. Everyone receives the same absurd drawing prompt.
2. Each finished sketch starts an image-generation job immediately.
3. Round Two drawing begins without waiting for Round One media.
4. The shared TV showcases one player at a time.
5. The active artist can flip between **WHAT THE AI SAW** and **WHAT I DREW** for up to 20 seconds, then end the spotlight early.
6. All interpretations appear together in a gallery.
7. Players vote; 3–5 players choose one favorite, 6–10 players rank a top three.
8. Scores accumulate across two rounds and a final winner is crowned.

The prototype deliberately sends **only the sketch** to the image model. The hidden drawing prompt is not sent to AI, because allowing the model to see the intended answer would let it repair the player's drawing and weaken the core joke.

## What is actually working

- Responsive 16:9 TV preview plus portrait phone-controller preview.
- 3–10 configurable players.
- Two shared prompts, with a simpler Round One pool and more composition-heavy Round Two pool.
- Finger, stylus and mouse drawing through Pointer Events.
- Smoothed strokes, three colors, two brush widths, eraser, undo and clear.
- 60-second timeout-safe drawing submission.
- Immediate non-blocking image-job start when each sketch is submitted.
- Submission-order showcase queue so early finishers are most likely to be media-ready first.
- 20-second per-player spotlight with manual **Done** and live flip between sketch / interpretation.
- Gallery voting with self-voting disabled.
- Adaptive one-pick vs ranked top-three voting.
- Weighted ranked voting (3/2/1) and a prototype 2× Round Two multiplier.
- Round leaderboard, final leaderboard and tie handling.
- AI failures cannot block the match; they fall back to a controlled local visual simulation.
- Real Workers AI adapter for `@cf/black-forest-labs/flux-2-klein-4b`.
- Three hidden playtest profiles: Faithful, Balanced and Wild interpretation looseness.
- No AI/model credentials in client code.

## Demo-only behavior

This is a **single-browser couch harness**, not the final multiplayer transport. It passes the phone-controller pane between virtual players so the complete loop can be evaluated immediately. The production game should preserve CALLBACK's server-authoritative room model and let players draw simultaneously on their own phones.

When no Cloudflare Workers AI binding is available, the browser creates a clearly labeled local visual simulation. That fallback is useful for testing pacing, reveal controls, voting and scoring, but it is **not semantic AI** and cannot validate whether FLUX misinterprets sketches in a funny way.

## Run it for free without AI

Open `public/index.html` directly in a browser. No build step or external dependency is required.

## Run with real FLUX.2 reference-image generation

From this folder, use a current Wrangler install:

```bash
npx wrangler@latest dev
```

Then open the local URL Wrangler prints. Workers AI is accessed through the server-side `AI` binding. The browser sends a downscaled 480×480 PNG to `/api/interpret`; the Worker supplies it as `input_image_0` and never includes the game's hidden target prompt.

Deploy the same prototype with:

```bash
npx wrangler@latest deploy
```

Workers AI usage may consume Cloudflare account allocation/charges even in local development.

## Integration contract for CALLBACK/Sites

The production implementation should keep these official values on the server:

- stable player identity and host permission
- active phase and round
- shared prompt ID/text
- drawing deadline
- immutable submitted sketch reference
- submit timestamp / sequence
- image-job ID and status
- showcase queue/index/deadline
- flip state if the TV reveal is synchronized
- vote eligibility and ranked choices
- score ledger and final results

AI remains a side effect. An image job may become ready, fail or be retried, but it must not redefine voting eligibility, official scoring or the phase lifecycle.

Suggested production lifecycle:

`LOBBY → DRAW_R1 → DRAW_R2 → SHOWCASE_R1 → VOTE_R1 → ROUND_RESULTS → SHOWCASE_R2 → VOTE_R2 → FINAL_RESULTS`

Unlike this couch harness, every `DRAW_*` state should accept simultaneous per-player submissions.

## Prompt strategy

The Worker contains three server-owned interpretation prompts. All use the same principle:

- tell the model that image 0 is a crude sketch
- preserve broad composition / subject count / pose / relative scale
- do **not** tell it the hidden intended answer
- make ambiguous marks resolve into one confident interpretation
- do not trace or visibly preserve sketch lines
- keep rendering quality/style consistent across a round

The Balanced profile is the default. Faithful and Wild exist so real playtests can locate the fun zone between "AI simply cleans up the sketch" and "AI ignores the sketch and invents unrelated nonsense."

## Free / trusted implementation references

No third-party runtime library is required in this prototype. The implementation borrows proven concepts from:

- MDN Pointer Events drawing guidance: https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events
- `PointerEvent.getCoalescedEvents()` for smoother high-frequency drawing where supported: https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
- perfect-freehand (MIT), reviewed as a future option if more sophisticated pressure-sensitive strokes are needed: https://github.com/steveruizok/perfect-freehand
- Jackbox Drawful: Animate's intentionally low-barrier two-frame drawing philosophy: https://www.jackboxgames.com/games/drawful-animate
- Cloudflare Workers AI FLUX.2 Klein 4B reference-image support: https://developers.cloudflare.com/workers-ai/models/flux-2-klein-4b/
- Cloudflare Workers AI binding configuration: https://developers.cloudflare.com/workers-ai/configuration/bindings/
- Cloudflare Workers Static Assets: https://developers.cloudflare.com/workers/static-assets/

## Known limitations / next production work

1. Replace the pass-the-phone harness with the existing room/reconnect architecture.
2. Store original sketches and generated media in durable media storage rather than browser memory.
3. Add bounded retry/fallback rules to the production AI adapter.
4. Run real FLUX playtests before locking the interpretation prompt or model profile.
5. Decide whether the Round Two 2× multiplier survives playtesting; it is not an approved rule yet.
6. Determine whether a 20-second spotlight cap remains fun at 8–10 players; manual early completion is already included.
7. Add Public History Books records only after the mode reaches an official terminal state.
8. Preserve accessibility: large touch targets, readable status, reduced motion, and no essential meaning encoded only by color.
