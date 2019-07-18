---
date: "2019-06-04T12:00:00Z"
title: "Docker Version"
description: "Docker Version custom Troubleshoot Analyzer example"
weight: "2159"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker Version

It is often the case that there is some minumum Docker version that, possibly for reasons such as feature support or stability, is required to run your application. Below is an example of an analyzer that will parse the output of the `docker info` command and display the Docker server version.

```yaml
analyze:
  v1:
    - name: docker.version
      labels:
        iconKey: docker_whale
        desiredPosition: "2"
      insight:
        primary: Docker {{repl .version}}
        detail: Docker server version is {{repl .version}}
        severity: info
      registerVariables:
        - name: version
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ServerVersion": *"([^"]+)"'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: version
          insightOnFalse:
            primary: "?"
            detail: Could not determine docker version
            severity: warn
            labels:
              iconKey: no_docker
```
