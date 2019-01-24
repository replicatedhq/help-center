---
date: "2016-07-03T04:02:20Z"
title: "Targets"
description: ""
weight: "1703"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

Targets are the object or underlying resource that is being changed (the noun) as well as the fields that include a key value for the new state of the target. In the spreadsheet example application, the primary target is the sheets themselves. But there are additional, less obvious targets. If the spreadsheet application has implemented its own authentication system, another target is the user accounts. For example, when an admin changes the password of UserY, it should create an audit event for `(Actor) UserX performed (action) password.update to (target) UserY`.
