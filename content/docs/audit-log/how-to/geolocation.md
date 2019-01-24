---
date: "2016-07-03T04:02:20Z"
title: "Location Data"
description: "Understand activity sources with built-in Geo-IP lookups"
weight: "1609"
categories: [ "Audit Logging Basics" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

In addition to deep insight into [when](../time-sync) events occurred, A good audit log should record, to the extent possible, the geographic source of a request. The Replicated Audit Log has first class support for request origin via the `source_ip` event field.

### GeoIP lookups

If configured, the Audit Log can use recorded IPs to determine the geographic location from which an audit event originated. This is especially useful for detecting activity anomalies and identifying potential bad actors or compromised user accounts. 


### Defense in depth

Because the Audit Log optimizes for [exportability in end customer environments](../exportable), IP and geographic information can be fed into other systems like Splunk or an enterprise SEIM to power flexible monitoring and alerting across the security stack.


