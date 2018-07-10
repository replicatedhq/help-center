---
date: "2018-05-02T01:19:20Z"
title: "inline"
description: "Description of the inline asset type"
weight: "41003"
categories: [ "Ship Assets" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Inline Asset Type" >}}

Inline asset types are useful to deliver text files such as Kubernetes manifests, application config files and shell scripts. The [YAML reference documentation](https://help.staging.replicated.com/api/ship-assets/inline/) is published that defines all available keys.

{{< linked_headline "Kubernetes Manifests" >}}

An example of delivering a simple Kubernetes manifest as an `inline` asset in Ship is:

```yaml
assets:
  v1:
    - inline:
        dest: ./k8s/redis.yml
        contents: |
          ---
          apiVersion: v1
          kind: Pod
          metadata:
            labels:
              name: redis
              redis-sentinel: "true"
              role: master
            name: redis-master
          spec:
            containers:
              - name: master
                image: redis:4.0.9
                ports:
                  - containerPort: 6379
                resources:
                  limits:
                    cpu: "0.1"
                    value: "true"
```

{{< linked_headline "Application Config" >}}

An example of delivering an applicastion config file as an `inline` asset (redis.conf) in Ship is:

```yaml
assets:
  v1:
    - inline:
        dest: ./conf/redis.conf
        contents: |
          slaveof redis-master 6379
          slave-serve-stale-data yes
```

{{< linked_headline "Shell Scripts" >}}

An example of delivering a shell script as an `inline` asset in Ship is:

```yaml
assets:
  v1:
    - inline:
        dest: ./install.sh
        mode: 755
        contents: |
          #!/bin/bash

          kubectl apply -f ./k8s/ -n {{repl ConfigOption "k8s_namespace"}}
```