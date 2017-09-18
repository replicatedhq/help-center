---
date: "2016-07-03T04:12:27Z"
title: "Audit API"
description: "Read and write to audit events to the Replicated audit log."
weight: "551"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/audit-api]
---

The Audit API provides endpoints for your application to read and write audit events into the audit log.

## Audit API Endpoint

The Audit API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

### POST /audit/v1/event

Records audit event information.

| Name | Type | Description |
|---|---|---|
| name | String | Name of the event. |
| title| String | Title of the event |
| description| String | Human readable description of the event. |
| ip_address| String | IP Address of the user who took the action. |
| action | String | Machine readable name of the event. |

#### Example request:

cURL
```shell
curl -k -X POST $REPLICATED_INTEGRATIONAPI/audit/v1/event \
  -H "Content-Type: application/json" \
  -d '{"action":"user.login.success", "description":"john@example.com logged in", "title":"User Login Success", "name":"login"}'
```

JSON
```json
{  
    "name":"user.login",
    "description":"john@example.com logged in successfully",
    "title":"User Login Success",
    "action":"user.login.success",
    "ip_address":"192.30.252.12"
}
```

#### Example response:

HTTP
```
HTTP/1.1 201 Created
Date: Tue, 16 Jun 2015 17:59:25 GMT
Content-Length: 0
Content-Type: text/plain; charset=utf-8
```
