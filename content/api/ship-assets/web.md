---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: Deliver web content accessible with a private or public URL
index: docs
title: web
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## web

A `web` asset pulls any web content from a private or public URL

```yaml
assets:
  v1:
    - web:
        url: https://my_bucket.s3.amazonaws.com/path-to-file
        dest: ./my-bucket-contents
        method: GET
```

### Required Parameters

- `dest` - A path to which the file should be written when generating assets


- `method` - The HTTP method, supports `GET` and `POST` methods


- `url` - A public or private URL to pull content from


    
### Optional Parameters


- `body` - Content to send with a `POST` request


- `headers` - HTTP request headers to send with the request


- `mode` - Unix file permissions to set on the asset
 