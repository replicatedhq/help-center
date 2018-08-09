---
date: "2018-08-22T04:02:20Z"
title: "Examples"
description: "A description of how a Replicated RBAC Policy is applied when there are conflicting policies."
weight: "2705"
categories: [ "Vendor RBAC" ]
index: "other"
---

## Support Engineer

The support engineer policy grants read access to release, channels, and application data, but read-write access to customer and license details.

```json
{
  "v1": {
    "name": "Support Engineer",
    "resources": {
      "allowed": [
        "**/read",
        "**/list",
        "platform/app/*/license/**"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```

## Sales

The sales policy grants read-write access to customers and license details, and read-only access to resources necessary to manage licenses (apps, channels, and license fields), but nothing else.

```json
{
  "v1": {
    "name": "Sales",
    "resources": {
      "allowed": [
        "platform/app/*/read",
        "platform/app/*/channel/*/read",
        "platform/app/*/licensefields/read",
        "platform/app/*/license/**"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```
