---
date: "2019-07-31T12:00:00Z"
title: "Deploying the Titled Service"
description: "A walkthrough of deploying the Titled entitlements service alongside your Replicated Ship application."
weight: "30304"
categories: [ "Ship and Entitlements" ]
index: "guides/ship-and-entitlements"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

# Deploying the Titled Service

Another option to deliver entitlements to your Replicated Ship application is to deploy the Titled service. Titled provides RESTful endpoints to fetch entitlements for a single installation of your application. Titled is made available to you as a Docker image at https://hub.docker.com/r/replicated/titled.

{{< linked_headline "Securing your Entitlements" >}}

This option provides a more secure way to ingest entitlements in your customer's infrastructure. The Titled service verifies signed entitlements from the Replicated servers before delivering them to your app.

{{< linked_headline "Running the Titled Service" >}}

Defining the following Ship asset will render a Kubernetes YAML file that will make the Titled service available to your application at http://titled:3000/. For example, `curl http://titled:3000/license/v1/license` or `curl http://titled:3000/license/v1/field/<field-name>`. For more documentation, refer to the [Integration API](/api/integration-api/license-api/) reference.

```yaml
assets:
  v1:
    - inline:
        contents: |
          ---
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: titled
            labels:
              app: titled
          spec:
            selector:
              matchLabels:
                app: titled
            template:
              metadata:
                labels:
                  app: titled
              spec:
                containers:
                - image: replicated/titled:latest
                  name: titled
                  args: ["serve"]
                  ports:
                  - containerPort: 3000
                    name: titled
                    protocol: TCP
                  env:
                  - name: CUSTOMER_ID
                    value: '{{repl Installation "license_id" }}'
            ---
            apiVersion: v1
            kind: Service
            metadata:
              name: titled
              labels:
                app: titled
            spec:
              type: ClusterIP
              ports:
              - name: titled
                port: 3000
                targetPort: titled
              selector:
                app: titled
        dest: k8s/entitlements/titled.yaml
        mode: 0644
```

{{< linked_headline "Running Titled Offline" >}}

It is also possible to run the Titled service in Airgapped environments. A signed entitlements payload can be included as a ConfigMap and used in the Titled deployment to deliver entitlements to your application. The following Ship asset will render both the ConfigMap and the Titled deployment serving your entitlements from a file:

```yaml
assets:
  v1:
    - inline:
        contents: |
          ---
          apiVersion: v1
          kind: ConfigMap
          metadata:
            name: titled
          data:
            entitlements.conf: |
              {{repl ShipCustomerRelease | Base64Encode }}
          ---
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: titled
            labels:
              app: titled
          spec:
            selector:
              matchLabels:
                app: titled
            template:
              metadata:
                labels:
                  app: titled
              spec:
                containers:
                - image: replicated/titled:latest
                  name: titled
                  args: ["serve", "--serve_from_file", "/titled/entitlements.conf"]
                  ports:
                  - containerPort: 3000
                    name: titled
                    protocol: TCP
                  env:
                  - name: RELEASE_CHECKSUM
                    value: '{{repl ShipCustomerRelease | Base64Encode }}'
                  volumeMounts:
                  - mountPath: /titled
                    name: titled
                volumes:
                - configMap:
                    name: titled
                  name: titled
          ---
          apiVersion: v1
          kind: Service
          metadata:
            name: titled
            labels:
              app: titled
          spec:
            type: ClusterIP
            ports:
            - name: titled
              port: 3000
              targetPort: titled
            selector:
              app: titled
        dest: k8s/entitlements/titled.yaml
        mode: 0644
```

The [next section](/guides/ship-and-entitlements/querying-titled/) will go into more detail on how the Titled service can be used to retrieve license information and entitlements values.
