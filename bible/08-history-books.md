# Game Lifecycle

The collection uses a shared shell plus a mode-owned explicit lifecycle.

## Shared shell

1. **Room setup** — host creates the room and configures approved mode options.
2. **Lobby** — players join/reconnect, choose name/avatar, enter teams/roles and become ready.
3. **Mode start** — server freezes the starting roster as required and enters the selected mode statechart.
4. **Mode play** — only mode-valid server events advance rounds, turns, votes and scores.
5. **Terminal result** — server declares the official winner/tie.
6. **History finalization** — one idempotent public record is written with required privacy redactions.
7. **Post-game** — rematch, return to lobby or view History Books.

## Submission and voting modes

Keep prompt, submission, reveal, voting and results separate. Anonymous content stays anonymous until the mode explicitly permits disclosure.

## Turn/performance modes

The server assigns the active performer/team, scroll/content item, pass allowance and deadline. Correct, pass, undo and timeout are discrete ledger events. A reconnect restores the same turn instead of starting another.

## Mirrored modes

When a mode promises an Attack followed by Defend replay, the replay is a required state transition, not an optional UI route. Preserve the scenario link between halves and rotate commander roles according to the mode rules.

## Ties and round transitions

Ties are handled only by the selected mode's explicit rule. Examples:

- King Prompter permits co-winners/co-champions.
- Bowl of Fools uses one-scroll sudden death for the final match tie.
- When Bowl of Fools empties between rounds, the trailing team starts the next round.

## Reconnect

At any phase, restore authoritative room state, stable identity, private role projection and already-consumed actions. Reloading must not duplicate a player or repeat an irreversible action.
