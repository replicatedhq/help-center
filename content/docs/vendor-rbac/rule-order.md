---
date: "2018-08-22T04:02:20Z"
title: "Rule Order"
description: "A description of how a Replicated RBAC Policy is applied when there are conflicting policies."
weight: "2704"
categories: [ "Vendor RBAC" ]
index: "other"
---

When defining policies, it's possible that a resource name might be specified in both the `allow` and the `deny` chains. When this happens, there are defined rules that determine which rule is applied.

If `denied` is left empty, it will be implied as a `**/*` rule (unless `**/*` rule is specified in the `allowed` resources. If a rule exactly conflicts with another rule, the `denied` rule will take precedence.

### Most specific rule takes precedence
The most specific rule definition will always be applied, when compared with less specific rules. Specificity of a rule is calculated by the number of `**` and `*` in the definition. A `**` in the rule definition is the least specific, followed by rules with `*` and then finally rules with no wildcards.

### Examples

In this example, a policy grants access to promote releases to any channel except one (id `123456`):

```json
{
  "v1": {
    "name": "No Access To Channel ID 123456",
    "resources": {
      "allowed": [
        "**/*"
      ],
      "denied": [
        "platform/app/*/channel/123456/promote"
      ]
    }
  }
}
```

In this example, a policy grants access to view all customers, but not create releases, promote releases or create new customers:

```json
{
  "v1": {
    "name": "View Customers Only",
    "resources": {
      "allowed": [
        "platform/app/*/license/*/read",
        "platform/app/*/license/*/list",
        "platform/app/*/read",
        "platform/app/*/list"
      ],
      "denied": [
        "**/*"
      ]
    }
  }
}
```
