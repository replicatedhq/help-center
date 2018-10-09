---
date: "2016-07-03T04:02:20Z"
title: "Preflight Checks"
description: "A guide to implementing Preflight Checks to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "2609"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
aliases: [/docs/packaging-an-application/preflight-checks-k8s/,/docs/kubernetes/packaging-an-application/preflight-checks]
---

Replicated runs a [default](/docs/kubernetes/packaging-an-application/preflight-checks/#default-preflight-checks) set of preflight checks to ensure it can install an application.

You can specify additional [cluster requirements](/docs/kubernetes/packaging-an-application/preflight-checks/#custom-preflight-checks) for your application in the `kubernetes.requirements` section of your release YAML.

Preflight checks are run automatically during the application lifecyle and can be manually run for an existing installation by visiting `/run-checks` in the Replicated admin console.

{{< linked_headline "Default Preflight Checks" >}}

Replicated will always run preflight checks to ensure that its own PersistentVolumeClaims have been bound.
For non-airgap installs, it will also ping Replicated's API to verify HTTP access.
If your app has [configured PVCs for snapshotting](/docs/snapshots/kubernetes/), Replicated will run a check to ensure that no restore is in progress.

{{< linked_headline "Custom Preflight Checks" >}}

The `kubernetes.requirements` section of your Replicated yaml can be used to specify preflight checks against your customers' Kubernetes cluster as a whole.
For more flexibility, [raw commands](/docs/kubernetes/packaging-an-application/programmable-preflight-checks/#raw-command) may be run in a Pod on any node.

{{< linked_headline "Server Version" >}}

Use the `server_vesion` property to pin your application to a range of Kubernetes versions.

```yaml
kubernetes:
  requirements:
    server_version: ">=1.11.1"
```

{{< linked_headline "API Versions" >}}

Use the `api_versions` property to specify a list of Kubernetes API Groups and Versions that must be supported by the cluster.

```yaml
kubernetes:
  requirements:
    api_versions: ["apps/v1", "batch/v1beta1"]
```

{{< linked_headline "Cluster Size" >}}

Use the `cluster_size` property to require a minimum number of nodes in a cluster.

```yaml
kubernetes:
  requirements:
    cluster_size: "1"
```

{{< linked_headline "CPU & Memory" >}}

Use the `total_cores` and `total_memory` properties to enforce cummulative minimum resource levels.

```yaml
kubernetes:
  requirements:
    total_cores: "2"
    total_memory: 11.25GB
```
