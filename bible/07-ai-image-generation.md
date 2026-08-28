# AI & Image Generation

## Role

AI-generated content should support the party-game loop and theatrical presentation, not become the authority for game state.

## Separation from rules

The server decides what the round requires, who is eligible, when a phase ends and how scoring works. AI may generate or transform content requested by those rules.

## Image-generation direction

CALLBACK currently uses/has used fast hosted image generation and is exploring multiple selectable model options. The final production model lineup is still an open decision and should not be hard-coded into the Bible until explicitly approved.

When image generation is used:

- start generation as early as the game structure allows so players are not waiting unnecessarily
- keep pacing playable when generation is slow or fails
- provide explicit fallback behavior
- never expose provider credentials in client code
- keep model/provider-specific code behind a small adapter/interface so models can be changed without rewriting gameplay

## Failure behavior

A failed AI request must not corrupt authoritative room state. The game should be able to retry, fall back, skip/replace generated content according to approved mode rules, or present a controlled failure state.

## Prompt ownership

Store the game-relevant prompt/input separately from the generated media result. Generated output is content attached to a round, not the definition of the round state itself.

## Moderation / validation

Treat player text and generated output as untrusted input. Apply appropriate input/output checks before content is displayed to the room.

## Open decisions

See `decisions/OPEN-DECISIONS.md` for the final model lineup, fallback policy, host selection UX and production timing strategy.
