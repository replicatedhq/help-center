---
date: "2018-03-03T04:02:20Z"
title: "Advanced Features"
description: "Deep dives on advanced functionality"
weight: "1801"
categories: [ "Replicated Audit Log" ]
index: ["docs/audit-log", "docs"]
aliases: [ /docs/audit-log/advanced ]
hideFromList: true
icon: "replicatedAuditLog"
gradient: "console"
---

Once you've started sending events into your Audit Log, it's time to explore some of the advanced functionality.

## Display Templates
[Display templates](/docs/audit-log/advanced/display-templates) allow you to customize the display of audit events, after the event has been received. The events are still immutable. Display templates implement a rules engine that is applied when the event is rendered in the [embedded viewer](/docs/audit-log/getting-started/embedded-viewer). 

## Streaming Events With SSH
[SSH Event Streaming](/docs/audit-log/advanced/ssh-streaming) allows Enterprise API users to stream events as they occur over ssh using an Enterprise API Token.

## Tracking Application Versions
[Tracking Application Versions](/docs/audit-log/advanced/tracking-versions) adds additional parameters to Create Event requests to allow the Audit Log to make better guarantees about when certain actions did not occur.


<!--
- Enable HA with Retries
- 


-->
