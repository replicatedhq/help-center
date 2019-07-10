---
date: "2019-07-08T12:00:00Z"
title: "Packaging a Troubleshoot Spec"
description: "A walkthrough of creating a Troubleshoot spec for your Kubernetes Ship application."
weight: "30202"
categories: [ "Ship and Troubleshoot" ]
index: "guides/ship-and-troubleshoot"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< linked_headline "Packaging a Troubleshoot Spec" >}}

In the left hand menu under "Troubleshoot", click on "Custom collectors". If this is your first Collect Spec you will be presented with a wizard to include default options in your spec. Check the box for "Kubernetes" and click "Generate collector spec".

![create release](/images/guides/ship-and-troubleshoot/create-release.png)

You will be presented with a YAML editor with defaults included.

![release yaml](/images/guides/ship-and-troubleshoot/release-yaml.png)

Paste the following YAML in the editor and click the "Save" button. For more detailed documentation on creating Custom Collectors, see our [Troubleshoot docs](/docs/troubleshoot/getting-started/creating-collectors/).


```yaml
collect:
  v1:
    - kubernetes.version:
        output_dir: /k8s/version
    - kubernetes.cluster-info:
        output_dir: /k8s/cluster
    - kubernetes.api-versions:
        output_dir: /k8s/api_versions

    - kubernetes.resource-list:
        kind: cronjobs
        output_dir: /k8s/resources/cronjobs
    - kubernetes.resource-list:
        kind: daemonsets
        output_dir: /k8s/resources/daemonsets
    - kubernetes.resource-list:
        kind: deployments
        output_dir: /k8s/resources/deployments
    - kubernetes.resource-list:
        kind: endpoints
        output_dir: /k8s/resources/endpoints
    - kubernetes.resource-list:
        kind: events
        output_dir: /k8s/resources/events
    - kubernetes.resource-list:
        kind: ingresses
        output_dir: /k8s/resources/ingresses
    - kubernetes.resource-list:
        kind: jobs
        output_dir: /k8s/resources/jobs
    - kubernetes.resource-list:
        kind: namespaces
        output_dir: /k8s/resources/namespaces
    - kubernetes.resource-list:
        kind: nodes
        output_dir: /k8s/resources/nodes
    - kubernetes.resource-list:
        kind: persistentvolumeclaims
        output_dir: /k8s/resources/persistentvolumeclaims
    - kubernetes.resource-list:
        kind: persistentvolumes
        output_dir: /k8s/resources/persistentvolumes
    - kubernetes.resource-list:
        kind: pods
        output_dir: /k8s/resources/pods
    - kubernetes.resource-list:
        kind: replicasets
        output_dir: /k8s/resources/replicasets
    - kubernetes.resource-list:
        kind: replicationcontrollers
        output_dir: /k8s/resources/replicationcontrollers
    - kubernetes.resource-list:
        kind: services
        output_dir: /k8s/resources/services
    - kubernetes.resource-list:
        kind: statefulsets
        output_dir: /k8s/resources/statefulsets
    - kubernetes.resource-list:
        kind: storageclasses
        output_dir: /k8s/resources/storageclasses

    - kubernetes.logs:
        namespace: kube-system
        pod_log_options:
          timestamps: true
          limitBytes: 10000000
        list_options: {}
        output_dir: /k8s/logs/kube-system
```

Navigate back to the collectors screen and click the "Promote" button. Select the "Nightly" channel and click "Promote".

![promote release](/images/guides/ship-and-troubleshoot/promote-release.png)

When running Replicated Ship, the Collect Spec will be made available in your Ship YAML via the [`CollectSpec`](/docs/ship/template-functions/template-types/#collectspec). The [next section](/guides/ship-and-troubleshoot/distribute-your-spec/) in this guide will show you how to include this spec as well as the Troubleshoot component along side your Ship application.
