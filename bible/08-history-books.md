# Public History Books

## Purpose

History Books is the public library of completed CALLBACK castle matches. It is a separate browsable web page that lets players revisit what happened, who played, the prompts/images created and the official results.

It is not a private host dashboard and not raw developer telemetry.

## Public browsing

Provide:

- newest and featured completed matches
- filters for mode, date, player display name and result/winner where practical
- clear categories/labels and pagination
- a permanent detail page for each public match
- shareable URLs
- responsive phone and desktop layouts
- useful empty, loading and missing-media states

## Match record

Each finalized record should include, when the mode produces it:

- stable public match ID and schema version
- mode ID/name and castle location
- start/end timestamps and duration
- public room/match title, not reusable join credentials
- host-selected game settings
- participant IDs scoped for public history, display-name snapshots and avatar snapshots/configuration
- team/council membership and rotating roles
- round/turn sequence, deadlines and completion state
- public prompts/requests/scroll text allowed by the mode
- generated images with prompt, round, profile/provider label, dimensions and accessible alt text
- votes/guesses/actions at the level approved for public display
- per-round and final scores
- winners, ties and notable gallery/restoration results
- safe tags/categories and created/updated timestamps

Store enough structured data to reconstruct a readable match story without exposing secrets, credentials or private diagnostics.

## Mode-specific presentation

- **King Prompter:** pair every archived image with its exact prompt; show gallery winners and the final Royal Restoration collage.
- **Royal War Room:** show councils, scenario halves, commanders and final team result; redact rankings/clues that the published rules designate as permanently secret.
- **Bowl of Fools:** show match/round/team results and public scrolls only if approved for display, but **never store or reveal the scroll-author relationship**.

## Persistence

- Live room state is not the history record.
- Only the authoritative terminal transition may enqueue finalization.
- Use a stable idempotency key so refreshes/retries cannot create duplicate matches.
- Write structured metadata to the durable database and generated media to object storage; link them with stable object keys.
- Never publish room codes, reconnect tokens, voice/video session data, IP addresses, provider credentials or raw moderation/security logs.
- Preserve records across deployments and verify media references before marking finalization complete.
- If media is still processing, publish a controlled pending/fallback state and update it idempotently.

## Privacy and integrity

History Books is public by product decision, so the UI must make public archival clear before a match begins. A mode's secrecy rule outranks the desire to store more data. Do not infer or reconstruct hidden authorship. Exact retention, removal requests and claimed cross-match profiles remain open decisions.

## Quality checks

Test duplicate finalization, reconnect during game-over, tied winners, missing images, deleted media, long names/prompts, 3–10-player restoration layouts, Bowl of Fools permanent anonymity, search/filter accuracy and mobile rendering.
