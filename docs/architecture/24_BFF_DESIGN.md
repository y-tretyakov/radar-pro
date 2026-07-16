# BFF Design v2

BFF is a product API, not a proxy.

Responsibilities:
- response shaping
- authorization
- aggregation
- API stability

API types:

## Query

GET /projects/:id
GET /leaderboard
GET /signals

## Command

POST /watch/project
POST /compare
POST /report

## Stream

/events/projects/:id

Frontend never knows D1, R2 or internal workers.
