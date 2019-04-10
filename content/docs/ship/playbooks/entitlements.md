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

## Defining License Fields

See: https://github.com/replicatedhq/replicated/tree/entitlements/client/entitlements

## Setting Customer Values

See: https://github.com/replicatedhq/replicated/tree/entitlements/client/entitlements

## Retrieving Values at Runtime

The final step to delivering license fields to an on-prem instance of a Ship application is to run the `replicated/titled` container and provide it a template function to initialize the values.

For a Kubernetes application, adding these manifests will deliver the license fields:

```yaml
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
        - image: replicated/titled:0.2.0
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
```

Once these are running, inside the cluster the license fields can be accessed at `http://titled:3000/license/v1/license`. For more documentation, refer to the [Integration API](https://help.replicated.com/api/integration-api/license-api/) reference.
