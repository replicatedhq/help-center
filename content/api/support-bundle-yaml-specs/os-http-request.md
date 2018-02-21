---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about the response from making an HTTP request
index: docs
title: os.http-request
weight: "100"
gradient: "purpleToPink"
---

## os.http-request

Collect information about the response from making an HTTP request


```yaml
specs:
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
    
    