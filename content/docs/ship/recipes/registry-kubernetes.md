---
date: "2018-05-02T01:19:20Z"
title: "Docker Registries"
description: "Shipping a Docker Registry to support Airgap applications"
weight: "44003"
categories: [ "Ship Recipes" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Shipping a Docker Registry for airgap installations" >}}

Whgen distributing a Kubernetes (or Helm) application, most customers will be able to provide a Docker registry that required application images can be pushed to. Replicated Ship can [retag and rewrite the Kubernetes YAML](docs/ship/recipes/airgap-kubernetes/) to work in this scenario. Occaisionally, a customer might be unable to provide access to a Docker registry to support an Airgap installation. In this scenario, it's possible to include the registry as an optional part of the application. Using Ship, the registry can be deployed to the Kubernetes cluster and then used to bootstrap the application.

{{< linked_headline "Docker Registry Assets" >}}

To start, include the following assets in a Ship release. These define the Docker registry, and will help get the registry bootstrapped into the cluster:

```yaml
assets:
  v1:
    - inline:
       dest: ./installer/k8s/registry/registry-service.yml
       contents: |
         ---
         kind: Service
         apiVersion: v1
         metadata:
           name: registry
           namespace: docker-registry
         spec:
           selector:
             app: registry
           ports:
             - port: 5000
               targetPort: 5000

    - inline:
        dest: ./installer/k8s/registry/registry-pod.yml
        contents: |
          ---
          apiVersion: v1
          kind: Pod
          metadata:
            name: registry
            labels:
              app: registry
            namespace: docker-registry
          spec:
            containers:
            - name: registry
              image: registry:2
              imagePullPolicy: Always
              ports:
                - containerPort: 5000
              volumes:
                - name: registry-data
                  awsElasticBlockStore:
                  volumeID: <volume-id>
                  fsType: ext4
            volumeMounts:
                - mountPath: /var/lib/registry
                  name: registry-data
```