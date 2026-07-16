# Radar Pro Ranking Engine

## Goal

Provide explainable project ranking instead of simple popularity sorting.

## Scores

- Health Score
- Growth Score
- Innovation Score
- Adoption Score
- Risk Score
- Future Potential Score

## Formula Concept

```
Radar Score =
 Health * weight
 + Growth * weight
 + Innovation * weight
 - Risk * weight
```

Weights are versioned configuration.

## Requirements

- Explain every score.
- Support recalculation.
- Store ranking history.
