[//]: # (Adapted from Michael Nygard's Template : https://github.com/joelparkerhenderson/architecture_decision_record/blob/master/adr_template_by_michael_nygard.md)

***++Architecture Decision Record++***

# Choose Express

## Status

accepted - 6/27

## Context

In order to develop a web application, a framework will need to be used. One could be developed, or an industry standard could be used.

## Decision

Use Express as the web application framework.

## Reasoning

Excited is a reliable industry standard that meets all of the current needs and will be quicker and more effective than developing a web application framework from scratch.

## Consequences

Application development will be quicker and easier. Application logic will be tied to Express, so if it changes significantly, the the application logic will need to change to keep up.
