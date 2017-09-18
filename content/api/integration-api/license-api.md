---
date: "2016-07-03T04:12:27Z"
title: "License API"
description: "Provides methods for your application to query properties of the installed license"
weight: "553"
categories: [ "Integration API" ]
index: "docs"
aliases : [docs/reference/integration-api/license-api]
---

## License API

The License API provides methods for your application to query properties of the installed license.

## License API Endpoint

The License API is part of the Integration API. To discover the Integration API base endpoint, query the REPLICATED_INTEGRATIONAPI environment variable from inside your container.

All methods return result as JSON. If Accept header is included in the request, it must contain */* or application/json. If neither of these values is present, the request will fail with status 400.

### GET /license/v1/license

Returns current license information.

| Name | Type | Description |
|---|---|---|
| license_id | String | License ID of this installation. Multiple installations can use the same license. |
| installation_id | String | Unique ID of this installation. |
| release_channel | String | Release channel name. Available in Replicated API 1.3.5 and later |
| fields | Array | Always returned. This is the array of field names and their values. | 
| expiration_time | String (optional) | License expiration time in RFC 3339 format. Will be omitted if license does not expire. |
| billing_frequency | String (optional) | Optional billing frequency as defined in vendor portal. |
| billing_begin | String (optional) | Billing start time in RFC 3339 format. Will be omitted if billing is not set for this license. |
| billing_end | String (optional) | Billing end time in RFC 3339 format. Will be omitted if billing is not set for this license or if billing is indefinite. |

#### Example request:

```shell
curl -k $REPLICATED_INTEGRATIONAPI/license/v1/license
```

#### Example response:

HTTP
```shell
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 16 Jun 2015 18:05:35 GMT
Content-Length: 214
```

JSON
```json
{
    "license_id": "f49b290abf39b945c6f519ee6ca1c4ad",
    "installation_id": "44e8188e6fec84ac425829cde0eeee8e",
    "release_channel": "Unstable",
    "fields": [
        {
            "field": "max_hosts",
            "title": "Maximum Number of Hosts",
            "type": "Integer",
            "value": 1,
            "hide_from_customer": false
        },
        {
            "field": "min_hosts",
            "title": "Minimum Number of Hosts",
            "type": "Integer",
            "value": 1,
            "hide_from_customer": false
        },
        {
            "field": "account",
            "title": "Account Name",
            "type": "String",
            "value": "Replicated, Inc",
            "hide_from_customer": false
        }
    ],
    "expiration_time": "2016-01-01T00:00:00Z"
}
```

### GET /license/v1/field/<field_name>

Returns license field.

Example request:

```shell
curl -k $REPLICATED_INTEGRATIONAPI/license/v1/field/max_queues
```

#### Example response:

HTTP
```shell
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 16 Jun 2015 18:14:23 GMT
Content-Length: 36
```

JSON
```json
{
    "field": "max_queues",
    "value": "99"
}
```
