---
date: "2016-07-03T04:02:20Z"
title: "Creating Collectors"
description: "Creating Custom Troubleshoot Collectors"
weight: "1603"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Creating Custom Collectors

The contents of a support bundle is controlled by the list of custom collectors that are supplied. While there's a lot of defaults, it's recommended that you add to these and create a set of custom collectors to include application logs and specific data that's useful when troubleshooting application-level problems.

Custom collectors are defined as a YAML document in the [Vendor Portal](https://vendor.replicated.com/troubleshoot/collectors), and promoted to release channels. For more information about how to promote, read the [documentation on promoting collectors](../promoting-collectors).

## Collector Document

The simplest collector definition (defining no collectors), is:

```yaml
collect:
  v1: []
```

## Adding Collectors

To add custom collectors, start by appending each collector to the v1 array in the document above. A [full list of available collector types is documented in the reference docs](/api/support-bundle-yaml-specs/shared/). Each collector supports various attributes, and these are documented on the collector reference page.

To illustrate how to use this, let's add a custom collector spec that will include the logs from an api pod running in Kubernetes. This isn't a single pod, but it's a deployment with a label, and the support bundle should contain the logs from all replicas.

The command that could be executed manually to retrieve these logs is:

```shell
$ kubectl logs -l app=api
```

There's a [kubernetes-logs](/api/support-bundle-yaml-specs/kubernetes-logs/) collector that we will use to add this same output to the support bundle. The collector spec is:

```yaml
kubernetes.logs:
  output_dir: /kubernetes/api-pod-logs
  namespace: default
  pod_log_options:
    timestamps: true
    sinceSeconds: 1000000
    limitBytes: 1000000000
  list_options:
    labelSelector: app=api
  timeout_seconds: 30
```

(The details of those fields is out of the scope of this document, but are described in detail on the [kubernetes-logs](/api/support-bundle-yaml-specs/kubernetes-logs/) reference doc.

Appending this to the collector spec, we now have:

```yaml
collect:
  v1:
    - kubernetes.logs:
        output_dir: /kubernetes/api-pod-logs
        namespace: default
        pod_log_options:
          timestamps: true
          sinceSeconds: 1000000
          limitBytes: 1000000000
        list_options:
          labelSelector: app=api
        timeout_seconds: 30
```

Additional collectors can be added the same way. There's no limit to the number of collectors you can add.

### Default spec

A good place to start is with our default spec, which is useful when troubleshooting a Replicated application. It's recommended to add your own application specs to this.

The default spec can be found [here](/docs/troubleshoot/server/examples/default/).
