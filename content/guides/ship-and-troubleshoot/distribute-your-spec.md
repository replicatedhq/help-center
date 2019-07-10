---
date: "2019-07-08T12:00:00Z"
title: "Distributing your Spec"
description: "A walkthrough of distributing your Troubleshoot Spec with Replicated Ship."
weight: "30205"
categories: [ "Ship and Troubleshoot" ]
index: "guides/ship-and-troubleshoot"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< linked_headline "Distributing your Troubleshoot Spec" >}}

In order to allow for easy troubleshooting of your Replicated Ship application, the Troubleshoot component can be included alongside your Ship app. Following is an example of inline Ship assets to distribute Kubernetes resources for a Troubleshoot Deployment. In addition to the Deployment, a ConfigMap will be deployed and mounted into the Troubleshoot container. This ConfigMap includes the Collect Spec that is currently promoted to your Ship release channel.

```yaml
assets:
  v1:
    - inline:
        contents: |
          apiVersion: v1
          kind: ConfigMap
          metadata:
            name: troubleshoot-config
          data:
            collect.yml: |
              {{repl CollectSpec | indent 4 | trim }}
        dest: k8s/troubleshoot/configmap.yml
        mode: 0644
    - inline:
        contents: |
          apiVersion: apps/v1
          kind: Deployment
          metadata:
            name: troubleshoot
            labels:
              run: troubleshoot
          spec:
            replicas: 1
            selector:
              matchLabels:
                run: troubleshoot
            template:
              metadata:
                labels:
                  run: troubleshoot
              spec:
                containers:
                - name: support-bundle
                  image: replicated/support-bundle
                  command: [ sleep, infinity ]
                  volumeMounts:
                  - mountPath: /opt
                    name: troubleshoot-config-collect
                volumes:
                - name: troubleshoot-config-collect
                  configMap:
                    name: troubleshoot-config
                    items:
                      - key: collect.yml
                        path: collect.yml
        dest: k8s/troubleshoot/deployment.yml
        mode: 0644
```

Follow the [next section](/guides/ship-and-troubleshoot/collect-support-bundle/) in this guide to see how Troubleshoot can help you gather information from your customer's cluster using the Troubleshoot Support Bundle.
