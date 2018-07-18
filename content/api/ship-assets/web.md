---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: A `web` asset delivers web content from a private or public URL
index: docs
title: web
weight: "100"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## web

A `web` asset delivers web content from a private or public URL

    
### Required Parameters


- `url` - A public or private URL to pull content from


- `dest` - A path to which the content should be written when generating assets


    
### Optional Parameters


- `body` - Content to send with a `POST` request


- `bodyFormat` - Content type of the body sent with a `POST` request


- `headers` - HTTP request headers to send with the request


- `method` - Defaults to `GET` if not present, supports `POST`


- `mode` - Unix file permissions to set on the asset, e.g `600`



### Examples

```yaml
assets:
  v1:
    - web:
        url: 'https://my_bucket.s3.amazonaws.com/path-to-file'
        dest: ./my-bucket-contents
```
    