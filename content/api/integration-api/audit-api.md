---
date: "2016-07-03T04:12:27Z"
title: "Audit API"
description: "Read and write to audit events to the Replicated audit log."
weight: "551"
categories: [ "Integration API" ]
index: "docs"
gradient: "purpleToPink"
aliases : [docs/reference/integration-api/audit-api]
---

The Audit API provides endpoints for your application to read and write audit events into the audit log.

{{< callout >}}
On earlier versions of Replicated, the audit API references a built-in Replicated service. On later, new installs of Replicated, the audit API is backed by a separate service called "Retraced". Retraced can be used the same way via the Integration API.
{{< /callout >}}

By default, the audit log will record all Replicated-specific actions. However, to meet enterprise compliance requirements, your application may use the Audit API to log your application's user's actions. These can be viewed and searched from the Replicated console. We recommend combining the audit log with the `Identity` and `Provisioning` APIs to map the audit log to an enterprise's identity environment. In this scenario, the user's LDAP or AD GUID can be used as an identitier for audit log actions.

## Best Practices

* Make audit API calls asynchronously
* Use worker queues such as Resque, Celery, Java JQM, and others to log audit calls in the background
* Keep event action names short and readable
* Centralize event actions in your application's codebase
* When recording IP addresses, make sure to check and unwrap the `X-Forwarded-For` header. Otherwise, proxies and load balancers can hide a requester's actual IP address
* Where possible, use clear identification for user IDs. Enterprise identity provider Object IDs (OIDs) are a good choice when LDAP or Active Directory is enabled. See the [Provisioning API](/api/integration-api/provisioning-api) for more information on enterprise identity sync.

## API Methods

The Audit API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

### POST /audit/v1/event

Records audit event information.

| Name        | Type   | Description                                 |
| ----------- | ------ | ------------------------------------------- |
| name        | String | Name of the event.                          |
| title       | String | Title of the event                          |
| description | String | Human readable description of the event.    |
| ip_address  | String | IP Address of the user who took the action. |
| action      | String | Machine readable name of the event.         |

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
  "name": "user.login",
  "description": "john@example.com logged in successfully",
  "title": "User Login Success",
  "action": "user.login.success",
  "ip_address": "192.30.252.12"
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
