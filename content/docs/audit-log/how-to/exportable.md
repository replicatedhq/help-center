---
date: "2016-07-03T04:02:20Z"
title: "Exportability"
description: ""
weight: "1607"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

The activity should be exportable to a CSV format and API accessible so that it can be centralized into an organization wide SIEM logging system like Splunk. It’s advisable to offer both the ability to poll for new events and to be able to push new events to the remote system. When polling, use standards such as persistent cursors to prevent duplicate events from being received. When pushing, use standards such as webhooks to minimize the amount of custom work required to ingest these events.

The Replicated Audit Log Service provides CSV export with custom saved searches for easy repeatability of common export actions.

<div>
  <img width="450" class="mask-img" src="/images/audit-log/export-csv.png">
</div>

Additionally, the Enterprise API is designed to enable the IT admins to retrieve the events with support for persistent cursors for resuming retrieval on a regular interval without overlapping or excluding events.

<div>
  <img width="450" class="mask-img" src="/images/audit-log/api-tokens.png">
</div>
