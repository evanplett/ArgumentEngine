[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# Develop Incrementally

## Status

accepted - 6/28/2019

## Context

The desired end state of the data model is significantly complex (attempting to essentially represent all formal argument structure). An intentional approach to development is needed for this project to be successful.

## Decision

Develop the project incrementally. That is, to start with a simple part of the end goal and develop that thoroughly. Then, add missing pieces in a similar manner until all pieces are developed.

## Reasoning

There is much to learn about how to effectively implement the project, so taking small steps allows lessons to be learned early and with less severe consequences. Additionally, this approach has become an industry best practice, making it an advisable approach.

## Consequences

Before development begins, the scope of the iteration needs to be identified. This can be difficult, but will make the development itself easier.