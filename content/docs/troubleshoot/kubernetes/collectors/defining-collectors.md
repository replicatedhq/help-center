---
date: "2019-07-17T04:02:20Z"
title: "Defining Collectors"
description: "Defining Collectors"
weight: "35001"
categories: [ "Kubernetes Troubleshoot" ]
index: ["docs/troubleshoot", "docs", "docs/troubleshoot/kubernetes"]
aliases:
  - /docs/troubleshoot/kubernetes/collectors/
icon: "replicatedTroubleshoot"
gradient: "blueToBlue"
---

All collectors are specified in a single YAML file. To build a set of collectors, start with a Kubernetes YAML file:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-application-name
spec: []
```

The above file is a simple but valid support bundle spec. It will collect only the default data.

To add additional collectors, read the docs in this section to understand each one, and add them as an array item below `spec`.

For example, a complete spec might be:

```yaml
apiVersion: troubleshoot.replicated.com/v1beta1
kind: Collector
metadata:
  name: my-application-name
spec:
  - clusterInfo: {}
  - clusterResources: {}
  - logs:
      selector:
        - app=api
      namespace: default
      limits:
        maxAge: 30d
        maxLines: 1000
  - http:
      name: healthz
      get:
        url: http://api:3000/healthz
  - exec:
      name: mysql-version
      selector:
        - app=mysql
      namespace: default
      command: ["mysql"]
      args: ["-V"]
      timeout: 5s
```
