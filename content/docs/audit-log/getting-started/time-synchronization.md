---
date: "2016-07-03T04:02:20Z"
title: "Reporting Event Timing"
description: "Events in an audit log must be ordered"
weight: "1606"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedCircle"
---

## Recording Event Timing in Retraced

Retraced allows clients to specify a `created` time for any event. In addition to allowing clients to report event timing, the Retraced Publisher API will record an NTP-synchronized `received` timestamp for all events.
