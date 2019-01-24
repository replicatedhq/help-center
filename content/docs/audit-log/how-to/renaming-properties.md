---
date: "2016-07-03T04:02:20Z"
title: "Normalization"
description: "Reduce integration complexity with a single, simple endpoint"
weight: "1605"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---


Even though the Replicated Audit Log has first-class support for fields like [actions](../event-model), [actors](../event-model), [targets](../event-model) and [groups](../segments), most of this complexity is hidden behind a single endpoint. For example, there are no separate endpoints to create, read, or update a group. If you sent an event with

```json
{
  "action": "sheet.create",
  "crud": "c",
  "actor": {
    "id": "abc",
    "name": "Actor McActorson",
    "fields": {
      "size": "100" 
    }
  },
  // ... etc
}
```

and another event without the full actor details

```json
{
  "action": "sheet.modify",
  "crud": "u",
  "actor": {
    "id": "abc"
  },
  // ... etc
}
```

Both events would be fully hydrated with actor information from the first call. This means that to modify fields on the actor like `name` or `fields`, simply send the new actor information the next time that actor performs an action.



### Most Event Properties are immutable

Some properties of an audit event can be renamed after the event is received. There is a limited amount of these and the original event is still [immutable](/docs/audit-log/how-to/immutable/). But data can change over time, and it's important to be able to link to and find events later.

### Certain properties are normalized

For example, when sending an event, an [actor](/docs/audit-log/how-to/event-model/) is a required field. The `id` property of the actor is immutable and is linked and cross referenced in the Audit Log to make it possible to search for and find all events that a specific actor performed. 

### Some fields on normalized properties are mutable

An actor object has additional fields including name, url and any other data you include. These fields are mutable and the values sent with an event will replace the global values for the actor.

### Original event fields also stored

When requesting the [original events](/docs/audit-log/architecture/immutability-guarantee/#future-verification-of-immutability), the original values sent when the event was created will be returned.

### Actors, targets and groups are mutable
 
The same property renaming is possible with [targets](/docs/audit-log/how-to/event-model/) and [groups](/docs/audit-log/how-to/segments#group).


