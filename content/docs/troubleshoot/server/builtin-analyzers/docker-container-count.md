---
date: "2019-06-04T12:00:00Z"
title: "Docker Container Count"
description: "Docker Container Count custom Troubleshoot Analyzer example"
weight: "2155"
categories: [ "Server Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

{{<legacynotice>}}

# Docker Container Count

Below is an example of an analyzer that will parse the output of the `docker info` command and display the number of containers running.

```yaml
analyze:
  v1:
    - name: docker.containers.count
      labels:
        iconKey: docker_container
        desiredPosition: "3"
      insight:
        primary: '{{repl .runningContainers}}'
        detail: '{{repl .runningContainers}} containers running'
        severity: info
      registerVariables:
        - name: runningContainers
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ContainersRunning": *([^",\n]+)'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: runningContainers
          insightOnFalse:
            primary: "?"
            detail: Could not determine number of running docker containers
            severity: warn
            labels:
              iconKey: no_docker
```
