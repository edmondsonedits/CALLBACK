# Royal Misread playtest plan

The goal of the first tests is **not** to prove the UI looks finished. It is to answer whether the core joke survives real people, real phone drawings and real image-to-image generation.

## Primary hypotheses

### H1 — Same-prompt comparison is the engine
Seeing multiple attempts at the exact same absurd request should make differences easier to understand and funnier than unrelated prompts.

### H2 — Hidden target prompt is essential
FLUX should see the sketch but not the requested answer. If the target text is included, the model may repair weak drawings and reduce misinterpretation.

### H3 — Generation can disappear behind play
Starting each job immediately after submission, then moving directly into Round Two drawing, should make most Round One media ready before its showcase.

### H4 — Artist-controlled reveal creates social ownership
The original artist should control sketch/AI flipping and be able to end the spotlight early. This should make the AI feel like a reaction to the player's work rather than a replacement for it.

### H5 — There is an optimal AI looseness band
Too faithful becomes "AI made it prettier." Too wild becomes random noise. Balanced should preserve enough pose/composition to make the misunderstanding attributable to the sketch.

## First test matrix

Run the same prompt set with 4–6 players across three short matches:

1. Faithful profile
2. Balanced profile
3. Wild profile

Do not change multiple other mechanics between those matches.

## What to record

For each generated result, mark:

- **Recognizable:** can the group see how the output came from the sketch?
- **Surprising:** did the model add an interpretation the artist did not intend?
- **Funny:** did it produce an audible reaction / conversation?
- **Too correct:** mostly a polished version of the intended subject.
- **Too random:** relationship to the sketch is hard to see.
- **Generation ready:** ready when its showcase turn began.

For the match, record:

- time to understand the rule
- average drawing completion time
- time between final Round Two submission and first showcase
- median spotlight duration
- total match time
- any accidental self-vote / vote confusion
- any time the room waits for generation
- which prompt structures produced the strongest differences

## Initial success gates

Treat these as prototype gates, not permanent product KPIs:

- First-time players can explain the core rule back in about 30 seconds.
- Median individual spotlight stays under ~12 seconds even though the cap is 20.
- At least 80% of Round One images are ready before their showcase without a visible generation wait.
- At least half of generated images are both recognizable-from-sketch and meaningfully surprising.
- Fewer than one in four results feel unrelated/random.
- No generation failure can stop voting or scoring.
- A 4–6 player match lands roughly in the 7–12 minute range.

## Prompt construction rules to test

Prefer prompts with:

`clear subject + visible action + second object/character + physical relationship`

Strong examples:

- A knight trying to ride a chicken
- A bear proposing marriage to a vending machine
- A knight fixing a bicycle while an angry goose attacks him

Weak examples:

- A tree
- Happiness
- A funny person

The strong form creates pose, scale, overlap and object relationships that different artists will encode differently, giving the reference-image model more opportunities to make attributable mistakes.

## Stop / pivot conditions

Do not keep polishing the interface if real FLUX tests show either of these after prompt tuning:

1. The model almost always reconstructs the intended scene correctly from crude drawings, making reveals predictable.
2. The model regularly ignores the sketch enough that players cannot connect the AI result to their own choices.

If (1) happens, test a vision-description intermediate step before adding more UI. If (2) happens, increase reference fidelity or change model/profile before changing scoring or presentation.
