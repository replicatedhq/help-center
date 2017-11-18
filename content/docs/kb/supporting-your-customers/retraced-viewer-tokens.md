---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Admin Console Audit Log API Tokens"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Audit Log", "Replicated UI"]
hideFromList: true
---

The Replicated App Manager uses [Retraced](https://preview.retraced.io) to power its embedded audit log, which includes a rich API for querying and exporting audit events. A detailed guide to using the Retraced Viewer's audit log tokens can be found in [The Retraced Documentation](https://preview.retraced.io/documentation/exposing-retraced-data/enterprise-api/).

When using API tokens to communicate with the embedded Retraced instance, the base URL will be `https://<your-server-ip>:8800/premkit/retraced-api`. The GraphQL endpoint will be available at `https://<your-server-ip>:8800/premkit/retraced-api/enterprise/v1/graphql`.
