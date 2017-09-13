---
date: "2016-07-03T04:12:27Z"
title: "Console API"
description: "API to use the Replicated console settings"
weight: "557"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/console-api]
---

Console API provides API functionality against console settings.

### GET /console/v1/option

Returns values corresponding to the given console option name.

#### Request parameters

| Name | Type | Description |
|---|---|---|
| name | String | Option name |

#### Response Status

| Status | Description |
|---|---|
| 200 | Success | 
| 400 | Bad request |

#### Response body

Option value (string)

### POST /console/v1/auth

Authenticates against the console authentication settings.

#### Request payload

| Name | Type | Description |
|---|---|---|
| username | String | Username (required only for authentication type LDAP) |
| password | String | Password |

#### Response Status

| Status | Description |
|---|---|
| 200 | Authentication successful |
| 400 | Bad request |
| 401 | Invalid authentication credentials |

#### Response body

no content
