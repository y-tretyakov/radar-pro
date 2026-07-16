# State Management Strategy v2

Frontend state is divided into four categories.

## Server State

TanStack Query.

Owns:
- repositories
- metrics
- signals
- reports

## Client State

Zustand.

Owns:
- UI preferences
- dashboard layout
- local interactions

## URL State

Filters, sorting and navigation state.

## Workflow State

Complex async flows use finite state machines.

Examples:
- comparison workflow
- report generation
- analysis pipeline

Avoid global stores containing server data.
