---
date: "2016-07-03T04:02:20Z"
title: "Single Endpoint"
description: "Reduce integration overhead with a single simple endpoint"
weight: "1705"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---


Even though the Replicated Audit Log has first-class support for fields like [actions](../actions), [actors](../actors),
[targets](../targets) and [groups](../segments)


### Most Event Properties are immutable

Some properties of an audit event can be renamed after the event is received. There is a limited amount of these and the original event is still [immutable](/docs/audit-log/how-to/immutable/). But data can change over time, and it's important to be able to link to and find events later.

### Certain properties are normalized

For example, when sending an event, an [actor](/docs/audit-log/how-to/actors/) is a required field. The `id` property of the actor is immutable and is linked and cross referenced in the Audit Log to make it possible to search for and find all events that a specific actor performed. 

### Some fields on normalized properties are mutable

An actor object has additional fields including name, url and any other data you include. These fields are mutable and the values sent with an event will replace the global values for the actor.

### Original event fields also stored

When requesting the [original events](/docs/audit-log/architecture/immutability-guarantee/#future-verification-of-immutability), the original values sent when the event was created will be returned.

### Actors, targets and groups are mutable
 
The same property renaming is possible with [targets](/docs/audit-log/how-to/targets/) and [groups](/docs/audit-log/how-to/segments#group).


