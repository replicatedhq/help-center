---
date: "2018-05-02T01:19:20Z"
title: "Asset Types"
description: "Types of assets available in Ship"
weight: "41002"
categories: [ "Ship Assets" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Replicated Ship Asset Types" >}}

Assets are the core object that enables you to describe applications managed by Ship. They allow you to define scripts, manifests, and application artifacts needed to deploy your application to your end customer's internal infrastructure. The goal of Ship assets is to give your customers controlled, transparent access to the same resources you use to deploy your SaaS application to your own private cloud. Assets can include things like:

- Scripts for installing and upgrading your application to a cloud server
- Private Docker images or `.tar.gz` archives
- Container orchestration manifests for Kubernetes or Docker Compose
- Modules for infrastructure automation tools like Chef, Ansible, Salt, or Terraform
- Any web content accessible from a private or public URL

Documented here are a number of methods Ship provides to facilitating distributing assets to your on-prem customers.

- Inline in your application spec
- Proxied from to private docker registries
- (coming soon) Proxied from to private github repos
- (coming soon) Mirrored from public github repos

In Ship, a short assets section to pull and run a private docker container might look like:

```yaml
assets:
  v1:
    - docker:
        dest: images/myimage.tar
        image: registry.replicated.com/myapp/myimage:1.0
        source: replicated
    - inline:
        dest: scripts/install.sh
        mode: 755
        contents: |
          #!/bin/bash

          echo "starting the application..."
          docker load < images/myimage.tar
          docker run -d registry.replicated.com/myapp/myimage:1.0

          echo "started!"
          exit 0
```
