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


Web Asset types are useful to deliver any web content from a private or public URL. While Web Asset types are ideal for pulling data from private data stores to be used in a Ship application, their ability to interact with HTTP and HTTPS web services provides flexibility in how you configure your Ship application. The [YAML reference documentation](https://help.staging.replicated.com/api/ship-assets/web/) is published that defines all available keys.



{{< linked_headline "When to use the Web Asset Type" >}}


Compared to other asset types supported by Ship, Web Asset types offer:


- Pulling content from public or private data stores, such as an Amazon S3 Bucket, to be used in your Ship app. Oftentimes it is useful to inject data into your Ship application. The Web Asset type provides the functionality to retrieve data from a private or public data store to use directly in your Ship application


- Versatility in interacting with other Ship components. The Web Asset type can be used to pull down any web content to be used in your Ship application. This means that other Ship assets can take advantage of resources made available by the Web Asset



{{< linked_headline "When to Use Other Asset Types" >}}


There are cases where using other asset types provides a better Ship experience:


- Pulling a Docker image. Use a [Docker Asset](https://help.replicated.com/docs/ship/assets/docker/#docker-asset-type) to pull an image from a public docker registry, registry.replicated.com, or a configured third party registry and produce a tar archive of the container image


- Pulling content from GitHub. Create a [GitHub Asset](https://help.replicated.com/docs/ship/assets/github/#github-asset-type) from files downloaded from either a public or a linked Github repo



{{< linked_headline "Delivering Web Content" >}}


The following example will pull content from a public Amazon S3 Bucket and place the contents of the bucket at `./installation-terms-and-conditions` on the installer's workstation:

```yaml
assets:
  v1:
    - web:
        url: https://s3.us-east-2.amazonaws.com/path-to/installation-terms-and-conditions
        dest: ./installation-terms-and-conditions
```

Note that the `method` parameter is omitted in this simple example. Unless specified, Web Asset types will default to `GET`


{{< linked_headline "Leveraging the Web Asset Type Across Ship Assets" >}}

Suppose you want to deliver a public Docker image to your Ship application and load and push it to a registry. You have an Amazon S3 Bucket containing a script that, when executed, loads, tags, and pushes an image to a registry. It might look something like this:

```
#!/bin/bash

docker load < ./images/redis.tar
docker tag redis:4.0.9 registry_endpoint/registry_namespace/redis:4.0.9
docker push registry_endpoint/registry_namespace/redis:4.0.9
```

Instead of providing this script inline, you could retrieve it with a Web Asset:

```yaml
assets:
  v1:
    - docker:
        dest: ./images/redis.tar
        image: redis:4.0.9
          
    - web:
        url: https://s3.us-east-2.amazonaws.com/path-to/install.sh
        dest: ./install.sh
        mode: 0755
        headers:
          Accept:
            - text/x-shellscript
```

