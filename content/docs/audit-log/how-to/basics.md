---
date: "2016-07-03T04:02:20Z"
title: "Feature Overview"
description: "Learn the basic ideas of the Replicated Audit Log design and data model"
weight: "1700"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
hideFromList: true
---


This section explores some of the feature requirements of a good audit log, and how the Replicated Audit Log APIs and data model implement these requirements.

## Core Concepts

An "audit log event" is a single log item that represents an [action](/docs/audit-log/how-to/event-model) that an [actor](/docs/audit-log/how-to/event-model) took, most often on a [target](/docs/audit-log/how-to/event-model).

An "audit log" is a collection of events--a centralized stream of all user activity in an application. 

Sometimes it's easiest to think about this with a concrete example. The rest of this overview will consider the case of auditing events in a multi-user, collaborative spreadsheet application.



