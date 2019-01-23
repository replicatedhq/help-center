---
date: "2018-03-03T04:02:20Z"
title: "APIs"
description: "An overview of the Replicated Audit Log product."
weight: "2201"
categories: [ "APIs" ]
index: ["docs/audit-log", "docs"]
aliases: [ /docs/audit-log/apis ]
hideFromList: true
icon: "replicatedAuditLog"
gradient: "console"
---

Replicated Audit Log provides several APIs:

## Publisher API
the [Publisher API](/docs/audit-log/apis/publisher-api) is the primary API that an application vendor will use to send events into the Audit Log. This is the API that the [Replicated Audit Log SDKs](/docs/audit-log/sdks/available-sdks) consume. When getting started, this is the first place to start. Use the Publisher API to start sending events into the Audit Log.

## Enterprise API
The [Enterprise API](/docs/audit-log/apis/enterprise-api) is the API that the end customer (the enterprise IT administrator) will consume to pull their organization events and ingest it into their own internal systems.

## Admin API
The [Admin API](/docs/audit-log/apis/admin-api) is an optional API that can be used in place of the Admin site. The Admin site uses this API. It's useful to managing your account and API tokens and pulling reports.
