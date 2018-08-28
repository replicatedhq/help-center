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

{{< linked_headline "Pulling images from Replicated registry" >}}

When installing an application on a server that has internet access, private images can be served from Replicated registry.  Authentication will be performed with `customer_id` and `installation_id` as the username and the password respectively.  These can be used with the `docker login` command or as Kubernetes registry secrets.  In the following example, a Kubernetes secret is created in order to pull a private image from Replicated registry.

```yaml
---
assets:
  v1:
    - inline:
        dest: ./k8s/pod.yml
        contents: |
          ---
          apiVersion: v1
          kind: Pod
          metadata:
            name: app
            labels:
              app: app
          spec:
            containers:
              - name: app
                image: registry.replicated.com/myapp/redis:5.0
                imagePullPolicy: Always
            imagePullSecrets:
              - name: replicatedregistrykey

          ---
          apiVersion: v1
          kind: Secret
          metadata:
            name: replicatedregistrykey
          type: kubernetes.io/dockerconfigjson
          data:
            .dockerconfigjson: {{repl print "{\"auths\": {\"registry.replicated.com\":{\"username\":\"" (Installation "customer_id") "\",\"password\":\"" (Installation "installation_id") "\" } } } " | Base64Encode }}
  ```

{{< linked_headline "Shipping a Docker Registry for airgap installations" >}}

When distributing a Kubernetes (or Helm) application, most customers will be able to provide a Docker registry that required application images can be pushed to. Replicated Ship can [retag and rewrite the Kubernetes YAML](/docs/ship/playbooks/airgap-kubernetes/) to work in this scenario.

If the Kubernetes cluster ] was set up using the [Replicated Kubernetes installer](/docs/kubernetes/customer-installations/installing-k8s-only/), a Docker registry might not be available. The Replicated Kubernetes installer will pre-pull the `registry:2` image on all nodes in the cluster.

{{< linked_headline "Docker Registry Assets" >}}

To start, include the following assets in a Ship release. These define the Docker registry, and will help get the registry bootstrapped into the cluster. Note that the `imagePullPolicy` in the `pod` is set to `Never` because the cluster should not attempt to pull the image from Docker Hub, and instead expect that the image will already be present.

```yaml
assets:
  v1:
    - inline:
       dest: ./k8s/registry/registry-service.yml
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
        dest: ./k8s/registry/registry-pod.yml
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

{{< linked_headline "Private Images" >}}

Next, include your private images in your Ship YAML as assets. This will force Ship to download these to the installation workstation:

```yaml
assets:
  v1:
    - docker:
        dest: ./images/private-image.tar
        image: registry.replicated.com/myapplication/private-image:1
        source: replicated
    - inline:
        dest: ./k8s/pod.yml
        contents: |
          ---
          apiVersion: v1
          kind: Pod
          metadata:
            name: app
            labels:
              app: app
          spec:
            containers:
              - name: app
                image: docker-registry.svc.registry/myapplication/private-image:1
                imagePullPolicy: Always
```

{{< linked_headline "Installation script" >}}

```yaml
assets:
  v1:
    - inline:
        dest: ./scripts/install.sh
        contents: |
          #!/bin/bash

          kubectl create ns docker-registry
          kubectl apply -f ../k8s/registry/

          kubectl get svc registry --namespace=docker-registry


          docker load < ./installer/images/private-image.tar
          docker tag registry.replicated.com/myapplication/private-image:1 ${REGISTRY_ADDRESS}/myapplication/private-image:1
          docker push ${REGISTRY_ADDRESS}/myapplication/private-image:1

```
