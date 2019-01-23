---
date: "2016-07-03T04:02:20Z"
title: "Enterprise API"
description: "Export and stream data to other systems"
weight: "2203"
categories: [ "APIs" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

## Overview

The Enterprise API is the API that the end customer (the enterprise IT administrator) will use to retrieve their organization's events and ingest it into their own internal systems.

## Authentication

The Enterprise API endpoints expect the token to be provided in a header of the form

```
Authorization: token=YOUR_ENTERPRISE_TOKEN
```


## Getting an Enterprise API Token

There are currently two ways to manage Enterprise API tokens.

- Most often, end customers create and manage Enterprise IT tokens using the UI in the [Embedded Viewer](/documentation/getting-started/embedded-viewer)
- There are also endpoints in the [Publisher API](/documentation/apis/publisher-api) that
allow a vendor to create, edit, and delete Enterprise API tokens


Note that to allow end customers to manage Enterprise API tokens in the embedded viewer,
the `is_admin` query parameter must be set to `true` when [requesting a token to initialize the embedded viewer](https://retraced.readme.io/reference#publisherv1projectprojectidviewertoken)

## Swagger JSON
https://api.{yourdomain}.io/enterprise/v1/swagger.json
