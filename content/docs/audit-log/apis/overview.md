---
date: "2018-03-03T04:02:20Z"
title: "APIs"
description: "An overview of the Replicated Audit Log product."
weight: "2201"
categories: [ "APIs" ]
index: ["docs/audit-log", "docs"]
aliases: [ /docs/audit-log/apis ]
hideFromList: true
icon: "replicatedCircle"
---

Replicated Audit Log provides several APIs:

## Publisher API
the [Publisher API](/docs/audit-log/apis/publisher-api) is the primary API that an application vendor will use to send events into the Audit Log. This is the API that the [Replicated Audit Log SDKs](/docs/audit-log/sdks/available-sdks) consume. When getting started, this is the first place to start. Use the Publisher API to start sending events into the Audit Log.

## Enterprise API
The [Enterprise API](/docs/audit-log/apis/enterprise-api) is the API that the end customer (the enterprise IT administrator) will consume to pull their organization events and ingest it into their own internal systems.

## Admin API
The [Admin API](/docs/audit-log/apis/admin-api) is an optional API that can be used in place of the Admin site. The Admin site uses this API. It's useful to managing your account and API tokens and pulling reports.


## Swagger Documentation

### [Retraced API Console](https://retraced.readme.io) | [Publisher API Swagger JSON](https://api.retraced.io/publisher/v1/swagger.json) | [Enterprise API Swagger JSON](https://api.retraced.io/enterprise/v1/swagger.json) | [Admin API Swagger JSON](https://api.retraced.io/admin/v1/swagger.json)