---
date: "2019-07-31T12:00:00Z"
title: "Template Functions"
description: "Injecting entitlement values into your Replicated Ship application YAML thought template functions."
weight: "30303"
categories: [ "Ship and Entitlements" ]
index: "guides/ship-and-entitlements"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

# Template Functions

Now that you have defined your Custom License Field in the Vendor Portal, there are a few ways to retrieve the values to use them in your Replicated Ship application. The first and simplest method is to inject them into a file or environment variable in your running container.

{{< linked_headline "Using Environment Variables" >}}

The example below shows how to create an API deployment as a Ship asset and inject the License Field value in an environment variable named "NUM_SEATS" using the Template Function [`LicenseFieldValue`](/docs/ship/template-functions/template-types/#licensefieldvalue):

```yaml
assets:
  v1:
    - inline:
        contents: |
          ---
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: myapi
            labels:
              app: myapi
          spec:
            selector:
              matchLabels:
                app: myapi
            template:
              metadata:
                labels:
                  app: myapi
            spec:
              containers:
                - image: quay.io/somevendor/myapi:1.0
                  name: myapi
                  env:
                  - name: NUM_SEATS
                    value: '{{repl LicenseFieldValue "num_seats" }}'
        dest: k8s/myapp/api.yml
        mode: 0644
```

{{< linked_headline "Using a ConfigMap" >}}

It is also possible to create a Kubernetes ConfigMap (or Secret) and include the License Field value. You can then include the ConfigMap as a file in your container. See the example Ship asset below:

```yaml
assets:
  v1:
    - inline:
        contents: |
          ---
          apiVersion: v1
          kind: ConfigMap
          metadata:
            name: entitlements-config
          data:
            entitlements.yaml: |
              num_seats: {{repl LicenseFieldValue "num_seats" }}
        dest: k8s/entitlements/configmap.yml
        mode: 0644
    - inline:
        contents: |
          ---
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: myapi
            labels:
              app: myapi
          spec:
            selector:
              matchLabels:
                app: myapi
            template:
              metadata:
                labels:
                  app: myapi
            spec:
              containers:
              - image: quay.io/somevendor/myapi:1.0
                name: myapi
                volumeMounts:
                - name: entitlements-config
                  mountPath: /opt/entitlements.yaml
                  subPath: entitlements.yaml
            volumes:
            - name: entitlements-config
              configMap:
                name: entitlements-config
        dest: k8s/myapp/api.yml
        mode: 0644
```

In the [next section](/guides/ship-and-entitlements/deploying-titled/) you will be introduced to an entitlements service you can deploy alongside your application we call Titled.
