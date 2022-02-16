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

{{<legacynotice>}}

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle)

## web

A `web` asset delivers web content from a private or public URL





### Required Parameters


- `dest` - A path to which the file should be written when generating assets


- `url` - A public or private URL to pull content from



### Optional Parameters


- `body` - Content to send with a `POST` request


- `bodyFormat` - Content type of the body sent with a `POST` request


- `headers` - HTTP request headers to send with the request


- `method` - Defaults to `GET` if not present, supports `POST`


- `mode` - Unix file permissions to set on the asset. Make sure to include a leading `0` if specifying an octal value


- `when` - This asset will be included when 'when' is omitted or true


### Examples

```yaml
assets:
  v1:
    - web:
        url: 'https://my_bucket.s3.amazonaws.com/path-to-file'
        dest: ./my-bucket-contents
```
