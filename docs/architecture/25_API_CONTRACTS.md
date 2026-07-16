# API Contracts

## Radar API

GET /api/radar/trending

Response:

{ repositories, signals, score, confidence }

## Repository API

GET /api/repositories/:id

Returns:

-   metadata
-   signals
-   insights
-   history

## Mutation flow

POST

↓

Validation

↓

D1 update

↓

Invalidate query

↓

Refresh UI
