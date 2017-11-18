---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Audit Log API Tokens"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Audit Log", "Vendor Portal"]
hideFromList: true
---

The Replicated Vendor Portal uses [Retraced](https://preview.retraced.io) to power its embedded audit log, which includes a rich API for querying and exporting audit events. A detailed guide to using the Retraced Viewer's audit log tokens can be found in [The Retraced Documentation](https://preview.retraced.io/documentation/exposing-retraced-data/enterprise-api/).

When using API tokens to communicate with Retraced, the base URL will be `https://api.retraced.io`. The GraphQL endpoint will be available at `https://api.retraced.io/enterprise/v1/graphql`. SSH streaming is available at `tail.retraced.io`.
