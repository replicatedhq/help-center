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

A `web` asset delivers web content from a private or public URL

    
### Required Parameters


- `method` - The HTTP method, supports `GET` and `POST` methods


- `url` - A public or private URL to pull content from


    
### Optional Parameters


- `body` - Content to send with a `POST` request


- `headers` - HTTP request headers to send with the request


- `mode` - Unix file permissions to set on the asset


```yaml
assets:
  v1:
    - web:
        url: http://www.replicated.com
        dest: ./replicated.html
        method: GET
```
 