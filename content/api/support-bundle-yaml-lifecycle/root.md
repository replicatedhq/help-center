---
categories:
- support-bundle-yaml-lifecycle
date: 2018-01-17T23:51:55Z
description: Reference Documentation for customizing your end customer's Support Bundle experience
index: docs
title: Support Bundle Lifecycle 
weight: "1"
---

The Support Bundle spec allows for customizing the lifecycle of your bundle,
including how and when it gets generated any uploaded, and the messaging provided to the end customer.

If you do not specify a lifecycle in your YAML spec, the following default lifecyle will be used:

```yaml
lifecycle:
    - message: 
        contents: "Starting support bundle collection..."
    - generate: {}
    - upload:
        prompt: 
          message: "Done! Do you want to upload the support bundle for analysis?"
          accept: "Upload complete!"
          decline: "Skipping upload. Please send the support bundle at {{.BundlePath}} to support."
          default: true
```
