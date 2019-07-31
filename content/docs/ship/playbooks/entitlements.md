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

{{< note title="Guide" >}}
For a more comprehensive guide to running Titled alongside your Replicated Ship application see [this guide](/guides/ship-and-entitlements/).
{{< /note >}}

A Replicated Ship application can deliver customer-specific license fields (entitlements), that can be read and consumed in an application.

## Defining License Fields

This is currently available via CLI/API (The UI is estimated for release Q3 2019) See https://github.com/replicatedhq/replicated/tree/entitlements/client/entitlements for a detailed walkthrough.

## Setting Customer Values

Once you've defined your entitlements fields, you can set per-customer values on the Customers page in [vendor.replicated.com](https://vendor.replicated.com).

## Retrieving Values at Runtime

The final step to delivering license fields to an on-prem instance of a Ship application is to run the `replicated/titled` container and provide it a template function to initialize the values.

Defining the following Ship asset (copy & paste) will render a Kubernetes YAML file that will make the `titled` service available to the cluster:

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

        dest: ./k8s/titled.yaml
        mode: 0777
```

Once the service is running, License API will be accessible at http://titled:3000/.  For example, `curl http://titled:3000/license/v1/license` or `curl http://titled:3000/license/v1/field/<field-name>`. For more documentation, refer to the [Integration API](/api/integration-api/license-api/) reference.
