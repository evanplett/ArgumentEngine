[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# TITLE Comply With JSON:API

## Status

accepted - 12/27/2019

## Context

When implementing initial integration testing, the need for a more structured and defined structure for returned JSON data became apparent.

## Decision

Comply with JSON:API (https://jsonapi.org/)

## Reasoning

After researching several options, such as JSend, JSON:API was chosen because it is a more well-defined specification with a lot of support, such as libraries and examples.

## Consequences

It will be more difficult to create return information as all returned data must comply with the JSON:API specification. However, once the initial work is completed, it should be easier for other services to consume the information provided by the Argument Engine.