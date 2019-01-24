---
date: "2016-07-03T04:02:20Z"
title: "Searchability"
description: ""
weight: "1706"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

A good Audit log needs to be searchable. Proper indexing on actors, actions, and targets is essential to being able to isolate and drill down into the history of application objects and events.

## Filters
Generally, actors, event names, IPs are all linked to filter down to related activity. The viewer should allow the account admin to specify a date range to filter in conjunction with other filters and searches.

<img class="mask-img" src="/images/audit-log/filter-options.png">

## Search operators
In order to effectively search over the data it is helpful to implement search operators that allow the end user to specify which fields they'd like to match. The Replicated Audit Log Service implements this in the Embedded Viewers.

<img class="mask-img" src="/images/audit-log/search-operators.png">
