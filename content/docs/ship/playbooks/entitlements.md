---
date: "2018-05-02T01:19:20Z"
title: "Customer Entitlements"
description: "How to deliver customer entitlements in a Ship application"
weight: "44006"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Ship and Entitlements" >}}

A Replicated Ship application can deliver customer-specific license fields (entitlements), that can be read and consumed in an application.

Note that this requires Ship v0.40.0 or later.

## Defining License Fields

See: https://github.com/replicatedhq/replicated/tree/entitlements/client/entitlements

## Setting Customer Values

See: https://github.com/replicatedhq/replicated/tree/entitlements/client/entitlements

## Retrieving Values at Runtime

The final step to delivering license fields to an on-prem instance of a Ship application is to run the `replicated/titled` container and provide it a template function to initialize the values.

Defining the following Ship asset (copy & paste) will render a Kubernetes YAML file that will make the `titled` service availabe to the cluster:

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
                    - image: replicated/titled:0.2.2
                      name: titled
                      args: ["serve", "--serve_from_file", "/titled/entitlements.conf"]
                      ports:
                        - containerPort: 3000
                          name: titled
                          protocol: TCP
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

        dest: ./k8s/titled.yaml
        mode: 0777
```

Once the service is running, License API will be accessible at http://titled:3000/.  For example, `curl http://titled:3000/license/v1/license` or `curl http://titled:3000/license/v1/field/<field-name>`. For more documentation, refer to the [Integration API](https://help.replicated.com/api/integration-api/license-api/) reference.
