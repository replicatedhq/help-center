---
date: "2018-03-03T04:02:20Z"
title: "End User Docs"
description: "A starting point for your user-facing audit log documentation."
weight: "1901"
categories: [ "Replicated Audit Log" ]
index: ["docs/audit-log", "docs"]
aliases: [ /docs/audit-log/advanced ]
hideFromList: true
icon: "replicatedAuditLog"
gradient: "console"
---

There are two main way to expose your audit log data to your application's users. Users can browse and search events using an embeddable viewer UI, or they can access data programmatically using API tokens.

{{<note title="User facing documentation" >}}
The goal of the articles in this section is to serve as example documentation that can be copied, modified, or white-labeled to serve as customer-facing documentation for your end users. These articles are intentionally light on links and details about the vendor-side of the audit log integration.
{{</note>}}

## Using the embedded viewer

As a vendor, you can [embed the event viewer](/docs/audit-log/getting-started/embedded-viewer/) into frontend site. For a guide to viewer features, see [Using the Embedded Viewer](/docs/audit-log/exposing-events/viewer/)

## Using Enterprise IT Integration API Tokens

In addition to the viewer, Audit events can be exposed via the [Enterprise IT Integration API](/docs/audit-log/exposing-events/enterprise-api/)
