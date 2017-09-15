---
date: "2016-07-03T04:12:27Z"
title: "Version API"
description: "Read the current application version, release notes, pending updates and apply updates"
weight: "552"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/version-api]
---

The Version API provides endpoints for your application to read the current application version, release notes, pending updates and apply updates.

## Version API

The Version API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

### GET /version/v1/current

Returns information describing the current version of the application running.

#### Example request:

cURL
```shell
curl -k $REPLICATED_INTEGRATIONAPI/version/v1/current
```

#### Example response:

HTTP
```json
{
  "version": "100",
  "release_sequence": 51,
  "release_notes": "The release notes",
  "release_date":"2015-12-01T00:00:00.0000000Z",
  "install_date":"2016-01-01T21:00:00.0000000Z"
}
```

### GET /version/v1/updates

Returns a list of available updates to install.

### PUT /version/v1/:sequence

Apply a pending update to the installation. Note that this will install the update immediately and could cause downtime.
