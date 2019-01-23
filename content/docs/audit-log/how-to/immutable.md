---
date: "2016-07-03T04:02:20Z"
title: "Immutability"
description: ""
weight: "1703"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

A fundamental tenet of any audit log is that it must be absolutely immutable.

Data in an audit log should never change. Deleted objects should maintain a separately logged record of actions associated with the object (including its creation and deletion). External facing APIs should only be able to read the audit log, not write to it.

The Replicated Audit Log Service has a [strong focus on provable immutability](/docs/audit-log/architecture/immutability-guarantee).
