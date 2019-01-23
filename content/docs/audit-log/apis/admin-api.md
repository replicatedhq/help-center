---
date: "2016-07-03T04:02:20Z"
title: "Admin API"
description: "Events in an audit log must be ordered"
weight: "2204"
categories: [ "APIs" ]
index: ["docs/audit-log", "docs"]
icon: "replicatedAuditLog"
gradient: "console"
---

## Authentication

The Admin API expects a base64-ecoded hmac-signed [JSON Web Token](https://tools.ietf.org/html/rfc7519) in an `Authorization` header:

```
Authorization: WU9VUl9TSUdORURfSldUX1RPS0VOX18K...
```

This token is generated at install time and can be retrieved via `kubectl`.

## Swagger JSON
https://api.{yourdomain}.io/admin/v1/swagger.json
