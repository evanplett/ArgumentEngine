[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# Choose Node.js

## Status

accepted - 6/26/2019

## Context

A framework is needed to allow for efficient and reliable development of business logic. No such framework has been chosen.

## Decision

Use Node.js as the core framework for implementing business logic.

## Reasoning

Node.js is the most commonly used is back-end framework. Using it will allow for using common add-ons and industry-normal solutions.

## Consequences

Common solutions will be able to be used, allowing for quicker development. The logic will be tied in to Node.js, so if it changes, much if the code base will need to change to keep up.
