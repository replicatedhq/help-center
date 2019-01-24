---
date: "2016-07-03T04:02:20Z"
title: "Flexible Event Model"
pageTitle: "Audit Log Event Model"
description: "Event structure is opinionated yet flexible"
weight: "1601"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

The Replicated Audit Log uses a sophisticated event model that is opinionated yet flexible. First-class support for the core objects like Actors, Targets, and Groups allows for deep integrations in [search](../searchable), [export](../exportable), and [normalization](../renaming-properties).

## Core event model

### Actors
An actor in the spreadsheet application is any authenticated identity that's interacting with the spreadsheet. This includes the users who are logged in and editing, deleting, and creating new spreadsheets. It also includes any API tokens that are performing operations on the spreadsheets programatically.

### Actions
Actions are the events that the actors performed that should be audited. In the spreadsheet example application, some of the most obvious actions might include `sheet.create` and `sheet.delete`. Sometimes it's important to create new objects to wrap events. For example, if a user is editing a spreadsheet and the sheet saves every second, you don't want to create a `sheet.update` event each second. Wrap these events into a session and create a single `sheet.update` event for the entire edit session.

### Targets
Targets are the objects in a system that have an action taken on them. In the spreadsheet example application, the primary target is the sheets themselves. But there are additional, less obvious targets. If the sheet application has implemented its own authentication system, another target is the user accounts. For example, when a user changes their password, it should create an audit event for `password.update`.

### CRUD

Most of the time, it is useful to filter audit event by whether the audited action was a Create, Read, Update, or Delete event (CRUD). In fact, the Replicated Audit Log filters out "Read" events by default. These read events tend to be less interesting than the Create, Update and Delete events that represent modification of information. Because these sort of event categories are so useful, they are built into the data model by default, and supported as first-class filtering keys.

### Raw view 
In addition to a human readable view of the data, the UI should be able to display the raw data of every event in the system. The Replicated Audit Log Service implements this in the embedded viewers. 


<div style="text-align: center">
  <img height="300" class="mask-img" src="/images/audit-log/raw-view.png">
</div>


## Extending the model with custom fields

While the core data model has proven to be very effective, a good Audit Log should also allow for custom fields and extending the base API. The image above shows an example of using custom fields on a `target` via the `fields` key to include data like `expiration_date` and `channel_name`.
