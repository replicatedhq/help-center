---
date: "2019-06-04T12:00:00Z"
title: "Cloud Provider"
description: "Cloud Provider custom Troubleshoot Analyzer example"
weight: "2155"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Cloud Provider

It is often helpful for both debugging and analytics purposes to know the cloud provider in which your application is running. Below is a list of analyzers that will determine the cloud provider for some common use cases in which Replicated Platform is running.

```yaml
analyze:
  v1:
    - name: datacenter.aws
      labels:
        iconKey: datacenter_aws
        desiredPosition: "7"
      insight:
        primary: AWS
        detail: This is an AWS instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: aws
            variableRef: provider
    - name: datacenter.gce
      labels:
        iconKey: datacenter_gce
        desiredPosition: "7"
      insight:
        primary: GCE
        detail: This is a GCE instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: gce
            variableRef: provider
    - name: datacenter.azure
      labels:
        iconKey: datacenter_azure
        desiredPosition: "7"
      insight:
        primary: Azure
        detail: This is an Azure instance
        severity: info
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
        - condition:
            stringCompare:
              eq: azure
            variableRef: provider
    - name: datacenter.unknown
      labels:
        iconKey: datacenter_unknown
        desiredPosition: "7"
      insight:
        primary: Unknown
        detail: Could not determine datacenter location of address {{repl .publicAddress}}.
        severity: debug
      registerVariables:
        - name: publicAddress
          fileMatch:
            pathRegexps:
              - /containers/replicated-operator\.json
              - /inspect/replicated-operator\.json
              - /replicated-operator-inspect\.json
            regexpCapture:
              regexp: '"PUBLIC_ADDRESS=([^"]+)"'
              index: 1
        - name: provider
          whichCloud:
            variableRef: publicAddress
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: publicAddress
          insightOnFalse:
            primary: Unknown
            detail: Could not determine public IP address.
            severity: debug
        - condition:
            not:
              stringCompare:
                in: [aws,gce,azure]
              variableRef: provider
```
