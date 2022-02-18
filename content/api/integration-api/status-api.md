---
date: "2016-07-03T04:12:27Z"
title: "Status API"
description: "Provides endpoints for your application to report various kinds of status information back to the management console"
weight: "554"
categories: [ "Integration API" ]
index: "docs"
gradient: "purpleToPink"
aliases : [docs/reference/integration-api/status-api]
---

{{<legacynotice>}}

The Status API provides a method for user applications to update the status of an application during its startup lifecycle. For applications with multiple startup steps, this can be used to inform users of long-running actions such as migrations and bootstrapping. The Status API can also aid in debugging by giving users insight into the application startup phase they experienced an issue with.

## Status API Endpoint

The Status API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

All methods return result as JSON. If Accept header is included in the request, it must contain _/_ or application/json. If neither of these values is present, the request will fail with status 400.

### PUT /status/v1/startup

Sets the app's startup progress text to any arbitrary string. The string will be displayed in the "app status" tile of the management console, allowing you to provide real-time feedback about your app's startup progress to the end user.

#### Request Payload

| Name     | Type   | Description                                                                                                                                                                                                    |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| message  | String | String to be displayed in the management console UI.                                                                                                                                                           |
| severity | String | Optional attribute that can be set. If you pass error into this Replicated will stop starting your all of your containers and show the message on the dashboard. supported as of replicated_api_version: 1.3.2 |

#### Example request:

```shell
curl -k -X PUT $REPLICATED_INTEGRATIONAPI/status/v1/startup -H "Content-Type: application/json" -d '{"message":"Migrating data..."}'
```

```json
{
  "message": "Migrating data..."
}
```

#### Example response:

HTTP

```shell
HTTP/1.1 204 No Content
Date: Tue, 16 Jun 2015 17:59:25 GMT
Content-Length: 0
Content-Type: text/plain; charset=utf-8
```
