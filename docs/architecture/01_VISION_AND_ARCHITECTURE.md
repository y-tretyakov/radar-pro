# Radar Pro Architecture v2 — Vision

## Product definition

Radar Pro is not a repository search engine. It is an Open Source Intelligence Platform.

Goal: discover, evaluate and explain the health, momentum and future potential of open source projects.

## Core pipeline

Sources → Connectors → Event Stream → Journal → Entity Store → Feature Engine → Metric Engine → Signal Engine → Insight Engine → BFF → UI

## Main architectural principles

- explainable analytics over opaque scores
- event driven data processing
- versioned metrics
- plugin-first extension model
- frontend isolated from infrastructure

The product should answer not only "what is popular?" but "why is this project becoming important?".
