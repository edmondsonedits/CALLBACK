# Open Decisions

These are not settled. An implementation may use a clearly labeled temporary prototype value, but must not present it as approved permanence.

## Naming and product structure

- Whether the public product is CALLBACK, King Prompter or another name.
- Whether CALLBACK is the collection/universe and King Prompter is one mode.

## Other modes

- Final list and exact rules of modes other than King Prompter.
- Castle room associated with each mode.

## AI/image production

- Final production model lineup and host-facing model-selection UX.
- Exact moderation provider, job timeout values, retry count, storage and retention policy.
- Which production image-edit/inpainting model will power Royal Restoration.
- Whether non-inpainting models remain selectable for Rounds One/Two only or use the documented lower-coherence restoration adapter.

King Prompter’s required behavior is settled even though provider selection is not: image jobs are non-authoritative; R1 overlaps R2 writing; R2 overlaps R1 voting; restoration outputs are clipped to assigned masks; controlled fallbacks keep entries voteable.

## Content production

- Final size and editorial review process for the King’s request pool.
- Final number of restoration base portraits and seasonal variants.
- Final recorded pigeon voice, music library and complete joke/reaction library.

## Production infrastructure

- Final hosting/backend stack used by Sites.
- Exact realtime transport, validation, durable-room-state and reconnect libraries where architecture permits choice.

## Playtest tuning

The approved defaults are 120-second R1/R2 writing, 90-second restoration writing and 45-second votes. These may be tuned only after real multiplayer measurement while keeping the 15–20-minute target and the rule that optional activity never blocks advancement.

## Integration status

King Prompter’s rules are approved, but the Sites version is not considered integrated until it implements and verifies the Bible contract. Components move from PROTOTYPE to APPROVED through review, and to INTEGRATED only after production confirmation.

