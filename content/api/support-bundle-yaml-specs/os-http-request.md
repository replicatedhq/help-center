---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect information about the response from making an HTTP request
index: docs
title: os.http-request
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## os.http-request

**type object**

Collect information about the response from making an HTTP request


```yaml
collect:
  v1:
    - os.http-request:
        output_dir: /system/ping-ip
        url: 'https://api.replicated.com/market/v1/echo/ip'
        method: get
        header:
          User-Agent:
            - cooltool/supportbundle 0.11.1
```


### Required Parameters


- `method` - HTTP request method


- `url` - The HTTP request URL



### Optional Parameters


- `body` - The request body


- `header` - One or more headers to send


- `insecure` - Set to `true` to skip TLS verification



### Outputs

    
- `body` - The response body


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  