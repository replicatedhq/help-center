---
categories:
- support-bundle-yaml-lifecycle
date: 2018-01-17T23:51:55Z
description: Adds a step in which the end customer can upload a bundle to https://console.replicated.com for review by the vendor
index: docs
title: upload
weight: "100"
gradient: "purpleToPink"
---

## upload

Adds a step in which the end customer can upload a bundle to https://console.replicated.com for review by the vendor


```yaml
lifecycle:
  - upload:
      prompt:
        message: 'Would you like to upload your generated support bundle for review? - '
        accept: >-
          Bundle uploaded! SuperGoodTool support will get back to you within 24
          hours
        decline: >-
          Bundle was not uploaded, please send your bundle to SuperGoodTool
          support
        default: true
```


### Required Parameters


- `prompt` - Allows configuring an interactive prompt for the user to confirm before uploading

