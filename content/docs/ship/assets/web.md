---
date: "2018-05-02T01:19:20Z"
title: "web"
description: "Deliver any web content"
weight: "41005"
categories: [ "Ship Asset Types" ]
index: false
icon: "replicatedShip"
gradient: "console"
---
{{< linked_headline "Web Asset Type" >}}

Web asset types are useful to deliver any web content from a private or public URL. They are ideal for pulling data from private data stores to be used in a Ship application. The [YAML reference documentation](https://help.staging.replicated.com/api/ship-assets/web/) is published that defines all available keys.

{{< linked_headline "Delivering Web Content" >}}

The following example will pull content from a public Amazon S3 Bucket and place the contents of the bucket at `./my-bucket-contents` on the installer's workstation:

```yaml
assets:
  v1:
    - web:
        url: https://my_bucket.s3.amazonaws.com/path-to-file
        dest: ./my-bucket-contents
        method: GET
```


{{< linked_headline "Utilizing HTTP Methods and Headers" >}}

While pulling the contents of an Amazon S3 Bucket is a great way to deliver content to be used in Ship, web asset types also provide the functionality to `POST` content to any private or public URL, such as a private Amazon S3 Bucket.

The following example utilizes multiple headers to `POST` some Ship installation data to a private Amazon S3 Bucket:

```yaml
assets:
  v1:
    - web:
        url: https://my_bucket.s3.amazonaws.com/path-to-file
        dest: ./installation-log
        method: POST
        body: |
          Installation ID: 7623f763ghbds5c
          Installation Date: Mon, 16 Jul  2018 12:00:00 GMT 
        headers:
          Authorization:
            - '{{repl ConfigOption "authString"}}'
          Content-Type:
            - text/plain
          Date:
            - Mon, 16 Jul  2018 12:00:00 GMT
```
