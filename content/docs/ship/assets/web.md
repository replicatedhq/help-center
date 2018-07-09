---
date: "2018-05-02T01:19:20Z"
title: "Web"
description: "Description of the web asset type"
weight: "41005"
categories: [ "Ship Assets" ]
index: false
icon: "replicatedShip"
gradient: "console"
hideFromList: true
---

{{< linked_headline "Web Asset Type" >}}

Web asset types are useful to deliver raw HTML to a specified directory on the workstation. Given a URL, the `Web` asset type will pull the HTML content from the URL and place it in the specified directory.

{{< linked_headline "Delivering HTML content from a URL" >}}

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

Web asset types support the use of HTTP methods `GET` and `POST`, and all standard request fields. Web asset types are equipped with the following fields to support a wide variety of HTTP requests:

| Field                                                            | Description                                                                                                                                     |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`                                                            |                                                                                                                                                 |
| `body`                                                           |                                                                                                                                                 |
| `headers`                                                        |                                                                                                                                                 |
| `method`                                                         |                                                                                                                                                 |

The following example will utilize an `Authorization` header to `POST` some content `body` to the specified URL and ultimately create a `replicated.html` file on the installer's workstation containing the HTTP response of that `POST`:

```yaml
assets:
  v1:
    - web:
        url: https://www.replicated.com
        dest: ./installer/replicated.html
        method: POST
        body: |
          Hello from Replicated!
        headers:
           - Authorization: {{repl ConfigOption "authKey"}}

```