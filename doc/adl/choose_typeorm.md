[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# Choose TypeORM

## Status

accepted - 7/2/2019

supersedes choose_mongo

## Context

Reading more information on MongoDB, seeing that it may not be suitable for this project.

## Decision

Use TypeORM as the primary interface for data persistence.

## Reasoning

TypeORM works with a variety of databases, making deployment more flexible. It is a more structured and reliable solution than MongoDB. It provides for managing the changes to the data structure over time, which this project will have a lot of due to the incremental development.

## Consequences

There will be more upfront work in defining the data structure, but working with it will be easier. There will be more effort in maintaining the changes to the data structure, but keeping existing data through structure change will be easier. Typescript will be preferred over JavaScript.
