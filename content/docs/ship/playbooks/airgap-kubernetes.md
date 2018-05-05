---
date: "2018-05-02T01:19:20Z"
title: "Kubernetes and Airgap"
description: "Best practices for creating airgap installations on Kubernetes"
weight: "44002"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Kubernetes and Airgap" >}}

When distributing a Kubernetes (or Helm) application using Replicated Ship, there will be a running Kubernetes cluster running to deploy to. Enterprise Kubernetes clusters that are used for internal applications can be installed and operated in airgapped environments. An airgap cluster is any cluster that doesn't have outbound Internet access, and therefore cannot pull the application images from a Docker registry.

The recommended way to deploy applications to airgap clusters is to require a Docker registry that's already running in the environment.

When requiring an existing Docker registry to use, the images will have to be retagged and pushed to the registry at install time. Replicated Ship supports workflow from the workstation that's performing the installation:

1. Require that the installer provide the registry name and namespace in the registry
1. Require that the workstation running the installation be logged in to the registry

Once these requirements are met, the Ship assets and scripts can:

1. Pull all public and private images using Docker
1. Retag the images to match the registry endpoint and namespace
1. Update the Kubernetes YAML to reflect the correct registry to pull from

{{< linked_headline "Example using Kubernetes and a Registry" >}}

```yaml
assets:
  v1:
    - docker:
        dest: ./installer/images/redis.tar
        image: redis:4.1
    - inline:
        dest: ./installer/k8s/redis.yml
        contents: |
          apiVersion: v1
          kind: Pod
          metadata:
            name: redis
          spec:
            containers:
            - name: redis
              image: {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/redis:4/1
              env:
              - name: MASTER
                value: "true"
              ports:
              - containerPort: 6379
    - inline:
        dest: ./installer/install.sh
        contents: |
          #!/bin/bash

          docker load < ./installer/images/redis.tar
          docker tag redis:4.1 {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/redis:4.1
          docker push {{repl ConfigOption "registry_endpoint"}}/{{repl ConfigOption "registry_namespace"}}/redis:4.1

          kubectl apply -f ./installer/k8s
```