---
date: "2016-07-03T04:02:20Z"
title: "Replicated Audit Log Basics"
description: "Events in an audit log must be ordered"
weight: "1603"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedCircle"
---

At it's core, the Replicated Audit Log consists of 3 components:

- The [Publisher API](/docs/audit-log/apis/publisher-api), which is used by a vendor application to report audit events to Retraced.
- A [Logs Viewer](/docs/audit-log/getting-started/embedded-viewer) which can be embedded in the frontend of a vendor application to allow end customers to view, search, and export logs.
- The [Enterprise IT Integration API](/docs/audit-log/apis/enterprise-api) which be used by end customers to consume audit log events programmatically.

The first step in any Retraced integration is [sending an event to the Publisher API](/docs/audit-log/getting-started/first-event). Once events have been published to Retraced, they can be consumed either by embedding the logs viewer or by accessing the Enterprise IT Integration API.
