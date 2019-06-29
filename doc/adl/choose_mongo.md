[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# Choose MongoDB

## Status

accepted - 6/27/2019

## Context

In order to store data, a database is needed, and none are currently being used.

## Decision

Use MongoDB for persistent data storage.

## Reasoning

MongoDB is the most commonly used persistent data solution for Node.js applications. This results in reliable integration with plentiful examples and solutions to reuse.

## Consequences

Storing data persistently will be straightforward and broadly supported. Since the primary developer only has experience with relational databases, it will take some time to shift paradigms.

