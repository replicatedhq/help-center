---
date: "2019-06-04T12:00:00Z"
title: "Docker ICC"
description: "Docker ICC custom Troubleshoot Analyzer example"
weight: "2157"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Docker ICC

It can be strategic to configure Docker with inter-container communication disabled, so that iptables will protect other containers and the main host having arbitrary ports probed or accessed by a container that gets compromised. Depending on how your application is configured, this can prevent your containers from communicating. In the case where icc is required to run your application it may be useful to include this insight.

Below is an example of an analyzer that will parse the output of `docker info` to determine if icc is disabled.

```yaml
analyze:
  v1:
    - name: docker.daemon.icc
      labels:
        iconKey: no_docker
        desiredPosition: "3"
      insight:
        primary: No ICC
        detail: Docker Inter-container communication is disabled, app components will be unable to communicate
        severity: error
      registerVariables:
        - name: docker
          fileMatch:
            pathRegexps:
              - /docker_info\.json
            regexpCapture:
              regexp: '"ServerVersion": *"([^"]+)"'
              index: 1
        - name: icc
          fileMatch:
            pathRegexps:
              - /daemon\.json
            regexpCapture:
              regexp: '"icc": *(false)'
              index: 1
      evaluateConditions:
        - condition:
            not:
              empty: {}
              variableRef: docker
        - condition:
            stringCompare:
              eq: "false"
            variableRef: icc
          insightOnFalse:
            primary: Docker ICC enabled
            detail: Inter-container communication is enabled
            severity: debug
            labels:
              iconKey: docker_whale
```
