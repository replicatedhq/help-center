---
date: "2019-06-04T12:00:00Z"
title: "Creating Custom Analyzers"
description: "An explanation of Custom Troubleshoot Analyzers"
weight: "1904"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Creating Custom Analyzers

Custom analysis can be performed by creating an analyze document specifying a list of custom analyzers to be applied to a bundle. Although there are defaults, it is recommended that you add additional to create a set of custom analyzers to help when troubleshooting application-level problems.

Custom analyzers are defined as a YAML document in the [Vendor Portal](https://vendor.replicated.com/troubleshoot/analyzers), and promoted to release channels. For more information about how to promote, read the [documentation on promoting collectors](/docs/troubleshoot/analyzers/promoting-analyzers).

## Analyze Document

The simplest analyzer definition (defining no analyzers), is:

```yaml
analyze:
  v1: []
```

## Adding Analyzers

To add custom analyzers, start by appending each analyzer to the v1 array in the document above. Custom analyzer examples can be seen [here](/docs/troubleshoot/analyzers/custom-examples/). Each analyzer supports various attributes, and these are documented on the [analyzer reference page](/docs/troubleshoot/analyzers/reference/).

Custom analyzers can be a nice complement to custom collectors. In the [Adding Custom Collectors example](/docs/troubleshoot/getting-started/creating-collectors/#adding-collectors), we added a collector to gather the logs from an api pod running in Kubernetes. To illustrate how to use write a custom analyzers, let's add a custom spec that will analyze the logs from the api pod. 

To recap, the [kubernetes-logs](/api/support-bundle-yaml-specs/kubernetes-logs/) collector spec that we added was the following:

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

Now we can add a custom analyzer spec to detect an unsuccessful connection to the database. In addition to the analyzer spec, we must add a label (`analyze: apiPodLogs`) to the collector so that the analyzer can identify the file to analyze within the bundle. We now have two specs:

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
        meta:
          labels:
            analyze: apiPodLogs
```

```yaml
analyze:
  v1:
    - name: api-pod-mysql-connection
      insight:
        detail: API server mysql access denied
        primary: Mysql Access Denied
        severity: error
      registerVariables:
        - name: apiPodLogs
          collectRef:
            selector:
              analyze: apiPodLogs
            scannable: true
      evaluateConditions:
        - condition:
            regexpMatch:
              regexp: 'Access denied for user .+'
            variableRef: apiPodLogs
          insightOnFalse:
            detail: The API server successfully connected to mysql
            primary: Mysql Connection Successful
            severity: debug
```

(The details of the analyzer spec is out of the scope of this document, but are described in detail in the [reference doc](/docs/troubleshoot/analyzers/reference/).

Additional analyzers can be added the same way. There's no limit to the number of analyzers you can add.
