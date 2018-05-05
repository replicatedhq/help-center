---
date: "2018-05-02T01:19:20Z"
title: "Docker Registries"
description: "Shipping a Docker Registry to support Airgap applications"
weight: "44003"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Shipping a Docker Registry for airgap installations" >}}

Whgen distributing a Kubernetes (or Helm) application, most customers will be able to provide a Docker registry that required application images can be pushed to. Replicated Ship can [retag and rewrite the Kubernetes YAML](/docs/ship/recipes/airgap-kubernetes/) to work in this scenario.

If the Kubernetes cluster ] was set up using the [Replicated Kubernetes installer](/docs/kubernetes/customer-installations/installing-k8s-only/), a Docker registry might not be available. The Replicated Kubernetes installer

{{< linked_headline "Docker Registry Assets" >}}

To start, include the following assets in a Ship release. These define the Docker registry, and will help get the registry bootstrapped into the cluster. Note that the `imagePullPolicy` in the `pod` is set to `Never` because the cluster should not attempt to pull the image from Docker Hub.

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
              imagePullPolicy: Never
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

Next, include the official registry image so that it will be downloaded and exported as a `.tar` file on the workstation being used to deploy the application. This image will have to be loaded onto each node in the cluster, and the final installation script will handle that.

```yaml
assets:
  v1:
    - docker:
        dest: ./installer/images/registry.tar
        image: registry:2
```

{{< linked_headline "Installation script" >}}

