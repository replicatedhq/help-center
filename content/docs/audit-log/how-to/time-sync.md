---
date: "2016-07-03T04:02:20Z"
title: "Causal Ordering"
description: "Event timing requirements in an audit log"
weight: "1609"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

A good audit log should record a synchronized timestamp that allows an end customer to determine with a high level of confidence:

- The human-readable time an event occured,for example: "sheet.create occurred at 2017-01-01 17:45:22.011"
- The ordering of events, for example: "sheet.create occured before sheet.update"

## Wall Time vs. Causal Ordering

It's not always possible to have both a human-readable "wall time" and a causally consistent sequencing of events. When forced to trade between a human-readable wall time and a causally consistent sequencing of events, an Audit Log should favor causal consistency over a precise wall time. In a best-case scenario, protocols like Network Time Protocol (NTP) can allow for a high level of accuracy in both.


## Recording Time in the Audit Log

The Replicated Audit Log allows clients to specify a `created` time for any event. In addition to allowing clients to report event timing, the Audit Log Publisher API will record a system `received` timestamp for all events.

A `canonical_time` field will exist on all events, which will be the client-reported `created` field if the client sent it, otherwise it will be the `received` time recorded on the server side.


