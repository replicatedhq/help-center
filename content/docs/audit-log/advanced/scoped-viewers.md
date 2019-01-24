---
date: "2016-07-03T04:02:20Z"
title: "Scoped Viewers"
description: "Embed viewers for specific actors or targets"
weight: "1802"
categories: [ "Advanced Audit Logging" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

It is possible to create scoped viewer tokens or scope the embedded viewer to only display and access event data that  that meet a specific criteria.

This is useful for embedding a subset of the audit log data into a user profile, or on to a specific item. In the spreadsheet example, this feature could enable an audit log of events associated with that specific spreadsheet. If a user searches over this scoped audit log data will only return matches from this scoped subset of events.

With scoped viewers, it is possible to provide administrators with a centralized, global audit log while exposing non-admins (users) to audit logs for resources they have access to without compromising access to the larger event stream.
