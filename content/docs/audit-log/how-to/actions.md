---
date: "2016-07-03T04:02:20Z"
title: "Actions"
description: "Events in an audit log must be ordered"
weight: "1708"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedCircle"
---

Actions are the events that the actors performed that should be audited. In the spreadsheet example application, some of the most obvious actions might include `sheet.create` and `sheet.delete`. Sometimes it's important to create new objects to wrap events. For example, if a user is editing a spreadsheet and the sheet saves every second, you don't want to create a `sheet.update` event each second. Wrap these events into a session and create a single `sheet.update` event for the entire edit session.
