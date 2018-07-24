---
date: "2018-05-02T01:19:20Z"
title: "Kubernetes Application Preflight Checks"
description: "Including Replicated's flexible Troubleshoot tooling to support your end customers"
weight: "44005"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Kubernetes Application Preflight Checks" >}}

When distributing a Kubernetes (or Helm) application, you will most likely have some environmental requirements in order to sucessfully run your application in an end customer's environment. To avoid the headache of having to troubleshoot the application post-installation, it is helpful to add preflight checks to short circuit the installation when a requirement is not satisfied. A few examples:

- They may be running an incompatible kubernetes version
- They may be short on resources like CPU or Memory
- There may be networking restrictions that are keeping your app components from communicating 

Replicated's [Support Bundle](/guides/troubleshoot/) and [Analyze](/api/analyze-yaml-specs/root/) tools can help you automate the collection and analysis of cluster resources to help diagnose and surface issues to your end customer.

{{< linked_headline "Preflight Checks Example" >}}

In this example we a few assets:

- A Kubernetes deployment that runs a `analyze` pod in the cluster
- A script to `kubectl exec` into a running analyze pod to run analyziz on the cluster.
- An install script that will invoke the analyze script and exit on any non-zero exit code.



```yaml
assets:
  v1:
    - inline:
        dest: ./k8s/troubleshoot/preflight-deployment.yml
        contents: |
          ---
          apiVersion: extensions/v1beta1
          kind: Deployment
          metadata:
            name: analyze
          spec:
            replicas: 1
            selector:
              matchLabels:
                tier: analyze
            template:
              metadata:
                labels:
                  tier: analyze
              spec:
                containers:
                  - name: analyze
                    image: replicated/analyze:alpha
                    imagePullPolicy: Always
                    command:
                      - /bin/sleep
                      - infinity
    - inline:
        dest: ./scripts/troubleshoot/preflight.sh
        mode: 0777
        contents: |
          #!/bin/sh
          set -e

          echo "Finding analyze pod"
          pod=$(kubectl get pods --selector=tier=analyze -o jsonpath='{.items[*].metadata.name}')

          echo "Analyzing cluster from pod ${pod}"
          kubectl exec ${pod} -- analyze run --collect-kubernetes --customer-id=2b4fbefc000347274057882ff5fae362

    - inline:
        dest: ./scripts/install.sh
        mode: 0777
        contents: |
          #!/bin/bash

          kubectl create -f ./k8s/troubleshoot/preflight-deployment.yml
          ./scripts/troubleshoot/preflight.sh
          preflightExit="$?"
          if [ "$preflightExit" != "0" ]; then
            echo "Preflight checks were unsuccessful. Please correct the above errors and try again."
            echo "Checks can be re-run with the following command:"
            echo "    ./scripts/troubleshoot/preflight.sh"
            exit 1
          fi

          kubectl delete -f ./k8s/troubleshoot/preflight-deployment.yml
          echo "Preflight checks passed, continuing installation..."
```
lifecycle:
  v1:
    - render: {}
```
