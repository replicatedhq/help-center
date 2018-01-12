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

Defined Option Names

`airgap.install`
`airgap.license.path`
`airgap.package.path`
`app.update.check.schedule`
`cert.filename`
`cert.filepath`
`clock.skew.threshold.milliseconds`
`hostname`
`http.proxy`
`http.proxy.enabled`
`key.filename`
`key.filepath`
`language.source`
`license.sync.schedule`
`security.cert`
`security.key`
`snapshot.destination`
`snapshot.retention`
`snapshot.schedule`
`snapshot.schedule.enabled`
`snapshot.schedule.spec`
`snapshot.schedule.time.daily`
`snapshot.schedule.day.weekly`
`snapshot.schedule.time.weekly`
`snapshot.schedule.custom.interval`
`snapshot.timeout`
`statsd.data.location`
`statsd.endpoint`
`scheduler`
`tls.authority.cert`
`tls.config.option`
`update.check.schedule.custom.interval`

#### Response Status

| Status | Description |
|---|---|
| 200 | Success | 
| 400 | Bad request |

#### Response body

Option value (string)

#### Example
```
$ curl -k $REPLICATED_INTEGRATIONAPI/console/v1/option?name=app.update.check.schedule
# @every 5h
```

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
