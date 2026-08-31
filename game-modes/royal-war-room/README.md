# Royal War Room

**Status:** INTEGRATED AND PUBLISHED  
**Bible summary updated:** 2026-08-31

Royal War Room is the castle's team strategy/discussion mode.

## Verified current structure

- Two councils/teams
- Six orders ranked secretly
- An **Attack** half followed by a guaranteed **Defend** replay
- Rotating commanders
- Spyglass clues
- Team scoring
- Stable reconnect behavior
- Rules and completed-match History integration

## Architecture contract

The server owns council membership, private rankings, current half, commander rotation, clue availability, deadlines, scoring and final team result. Each client receives a role-appropriate projection; hidden rankings are not broadcast to ineligible players.

Attack and Defend are linked halves of one match. Defend is a required transition, not an optional rematch button. Reconnect restores council, commander status, submitted ranking and current half without granting a second submission.

History finalization records the scenario, councils, commander sequence, both halves and final score while preserving any information the published rules keep secret.

## Documentation caution

This summary records only verified high-level behavior. Before editing exact order names, scoring values, timers or copy, inspect the published implementation and add those verified details here. Do not invent missing values.
