---
date: "2018-05-02T01:19:20Z"
title: "docker"
description: "Description of the docker asset type"
weight: "41004"
categories: [ "Ship Assets" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Docker Asset Type" >}}

Docker asset types are useful to deliver both private and public Docker images to an installation. It's recommended to build for airgapped environments, where images cannot be pulled directly from the upstream registry. Using the `docker` asset type, it's possible to pull and load images on the workstation running the installation. Once pulled, adding a [simple script to push these to a local registry](/docs/ship/playbooks/airgap-kubernetes/) will ensure that the cluster can bootstrap and run offline. The [YAML reference documentation](https://help.staging.replicated.com/api/ship-assets/docker/) is published that defines all available keys.

{{< linked_headline "Delivering a Public Image" >}}

The following example will create a `redis.tar` on the installer's workstation, and also an inline script to load and push it to a registry:

```yaml
assets:
  v1:
    - docker:
        dest: ./images/redis.tar
        image: redis:4.0.9

    - inline:
        dest: ./install.sh
        mode: 0755
        contents: |
          #!/bin/bash

          docker load < ./images/redis.tar
          docker tag redis:4.0.9 {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/redis:4.0.9
          docker push {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/redis:4.0.9

config:
  v1:
    - name: registry
      title: Docker Registry
      items:
        - name: registry_endpoint
          type: text
          required: true
          help_text: registry.mycompany.com
        - name: registry_namespace
          type: text
          required: true
          help_text: myapp

```

{{< linked_headline "Delivering a Private Image" >}}

The [Replicated Private Registry](/docs/registry/security/) is a good way to deliver private images to be used in Ship. Pushing images to this registry will ensure they are only available to be pulled by authorized customers when using valid licenses.

The following example will download a private image from the Replicated Private Registry and will retag and push it to the local registry:

```yaml
assets:
  v1:
    - docker:
        dest: ./images/worker.tar
        image: registry.replicated.com/application/worker:1.0.1
        source: replicated

    - inline:
        dest: ./install.sh
        mode: 0755
        contents: |
          #!/bin/bash

          docker load < ./images/worker.tar
          docker tag worker:1.0.1 {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/worker:1.0.1
          docker push {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/worker:1.0.1

config:
  v1:
    - name: registry
      title: Docker Registry
      items:
        - name: registry_endpoint
          type: text
          required: true
          help_text: registry.mycompany.com
        - name: registry_namespace
          type: text
          required: true
          help_text: myapp
```