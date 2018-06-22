---
date: "2018-08-22T04:02:20Z"
title: "Policy Definition"
description: "Documentation describing the policy definition file for vendor RBAC."
weight: "2702"
categories: [ "Vendor RBAC" ]
index: "other"
---

A policy is defined in a single JSON document.

```json
{
  "v1": {
    "name": "Read Only",
    "resources": {
      "allowed": [
        "**/read"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```

 There is some minimal metadata included, but the primary contents of a policy document is the `resources` key. The `resources` key can contain two arrays, identified as `allowed` and `denied`. As the names indicate, resources specified in the `allowed` list will be allowed for users assigned to the policy, and resources specified in the `denied` list will be denied.

