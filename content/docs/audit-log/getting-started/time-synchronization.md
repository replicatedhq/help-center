---
date: "2016-07-03T04:02:20Z"
title: "Reporting Event Timing"
description: "Two ways to track the timing and sequence of audit log events"
weight: "1608"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

## Recording Event Timing 

The Replicated Audit Log allows clients to specify a `created` time for any event. In addition to allowing clients to report event timing, the Audit Log Publisher API will record an NTP-synchronized `received` timestamp for all events. A `canonical_time` field will exist on all events, which will be the client-reported `created` field if the client sent it, otherwise it will be the `received` time recorded on the server side.



## Next Steps

Now that you've run through audit log basics, you can review [audit log design](/docs/audit-log/how-to/basics), [audit log sdks](/docs/audit-log/sdks/available-sdks) or [using the embedded viewer](/docs/audit-log/exposing-events/overview).
