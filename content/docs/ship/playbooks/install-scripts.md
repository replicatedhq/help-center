---
date: "2018-05-02T01:19:20Z"
title: "Install Scripts"
description: "Writing an installation script to deploy a Ship application"
weight: "44004"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Install Scripts" >}}

Applications should ship with easy-to-read installation scripts. Install scripts are a good way to deliver packaged, ready-to-deploy process that can be used in a continuous delivery workflow.

{{< linked_headline "Delivering an scripts/install.sh script" >}}

```yaml
assets:
  v1:
    - inline:
        dest: ./scripts/install.sh
        contents: |
          #!/bin/bash

          kubectl apply -f ../k8s/namespace.yml
          kubectl apply -f ../k8s/ -n {{repl ConfigOption "namespace"}}
```