---
date: "2018-05-02T01:19:20Z"
title: "Web"
description: "Deliver web content accessible with a private or public URL"
weight: "41005"
categories: [ "Ship Assets Types" ]
index: false
icon: "replicatedShip"
gradient: "console"
---
{{< linked_headline "Web Asset Type" >}}

A `web` asset delivers HTML content from a private or public URL.

{{< linked_headline "Delivering HTML Content" >}}

The following example will create a `replicated.html` file on the installer's workstation:

```yaml
assets:
  v1:
    - web:
        url: https://www.replicated.com
        dest: ./installer/replicated.html
        method: GET
```

{{< linked_headline "Utilizing HTTP Methods and Headers" >}}

Web asset types support multiple HTTP methods and all standard request fields to give you flexibility in pulling HTML content from a private or public URL.

The following example utilizes an `Authorization` header to `POST` some content body. A `replicated.html` file is created on the installer's workstation containing the response body:

```yaml
assets:
  v1:
    - web:
        url: https://www.replicated.com
        dest: replicated.html
        method: POST
        body: Hello from Replicated!
        headers:
          Authorization:
            - '{{repl ConfigOption "authKey"}}'
```

    
### Required Parameters


- `method` - The HTTP method, supports `GET` and `POST`


- `url` - A public or private URL to pull content from


    
### Optional Parameters


- `body` - Content to send with a `POST` request


- `headers` - HTTP request headers to send with the request


- `mode` - Unix file permissions to set on the asset