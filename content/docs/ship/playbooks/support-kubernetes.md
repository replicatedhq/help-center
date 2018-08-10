---
date: "2018-05-02T01:19:20Z"
title: "Troubleshoot A Kubernetes Application"
description: "Including Replicated's flexible Troubleshoot tooling to support your end customers"
weight: "44004"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Troubleshooting a Kubernetes Application" >}}

When distributing a Kubernetes (or Helm) application, things may sometimes go wrong with getting your app running in your end customer's installation environment. A few examples:

- They may be running an incompatible kubernetes version
- They may be short on resources like CPU or Memory
- There may be networking restrictions that are keeping your app components from communicating 

No matter what the issue is, you'll likely need to collect logs, workload statuses, and other information about the installation environment in order to help get your end customer up and running. Replicated's [Support Bundle](/guides/support-bundle) can help you automate and organize the collection of this information. This highly customizable and configurable tool allows for collecting files and command results into a portable `.tar.gz` file that your customer can upload to https://console.replicated.com or send to your support team to diagnose.

{{< linked_headline "Troubleshoot Assets Example" >}}

In this example we include two assets:

- A Kubernetes deployment that runs a `support-bundle` pod in the cluster
- A script to `kubectl exec` into a running support bundle pod and stream a support bundle back to a workstation by attaching stdout.




```yaml
assets:
  v1:
    - inline:
        dest: ./k8s/troubleshoot/support-deployment.yml
        contents: |
          ---
          apiVersion: extensions/v1beta1
          kind: Deployment
          metadata:
            name: support-bundle
          spec:
            replicas: 1
            selector:
              matchLabels:
                tier: support-bundle
            template:
              metadata:
                labels:
                  tier: support-bundle
              spec:
                containers:
                  - name: support-bundle
                    image: replicated/support-bundle:alpha
                    imagePullPolicy: Always
                    command:
                      - /bin/sleep
                      - infinity
    - inline:
       dest: ./scripts/troubleshoot/support-bundle.sh
       contents: |
         #!/bin/sh
         OUTPUT_PATH=supportbundle.tar.gz
         set -e

         echo "Finding support bundle pod"
         pod=$(kubectl get pods --selector=tier=support-bundle -o jsonpath='{.items[*].metadata.name}')

         echo "Collecting from pod ${pod}"
         /bin/sh -c "kubectl exec ${pod} -- support-bundle generate --customer-id={{repl Installation "customer_id"}} --out - --quiet --yes-upload " > $OUTPUT_PATH

         echo "Bundle generated at ${OUTPUT_PATH}"
lifecycle:
  v1:
    - render: {}
```


{{< note title="Bundle Uploading" >}}
The above example uses `--yes-upload` in the call to `support-bundle generate`. You can change this to `--no-upload` to disable uploading to https://console.replicated.com
{{< /note >}}
    
