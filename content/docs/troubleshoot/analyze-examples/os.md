---
date: "2019-06-04T12:00:00Z"
title: "OS"
description: "OS custom Troubleshoot Analyzer example"
weight: "2162"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# OS

TODO

```yaml
analyze:
  v1:
    - name: os.ubuntu
      labels:
        iconKey: os_ubuntu
      insight:
        primary: OS is Ubuntu
        detail: Operating System is Ubuntu
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: ubuntu
            variableRef: os
          insightOnFalse:
            primary: OS is not Ubuntu
            detail: Operating System is not Ubuntu
            severity: debug
    - name: os.alpine
      labels:
        iconKey: os_alpine
      insight:
        primary: OS is Alpine
        detail: Operating System is Alpine
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: alpine
            variableRef: os
          insightOnFalse:
            primary: OS is not Alpine
            detail: Operating System is not Alpine
            severity: debug
    - name: os.centos
      labels:
        iconKey: os_centos
      insight:
        primary: OS is CentOS
        detail: Operating System is CentOS
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: centos
            variableRef: os
          insightOnFalse:
            primary: OS is not CentOS
            detail: Operating System is not CentOS
            severity: debug
    - name: os.rhel
      labels:
        iconKey: os_rhel
      insight:
        primary: OS is RHEL
        detail: Operating System is RHEL
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: rhel
            variableRef: os
          insightOnFalse:
            primary: OS is not RHEL
            detail: Operating System is not RHEL
            severity: debug
    - name: os.debian
      labels:
        iconKey: os_debian
      insight:
        primary: OS is Debian
        detail: Operating System is Debian
        severity: info
      registerVariables:
        - name: os
          os: {}
      evaluateConditions:
        - condition:
            stringCompare:
              eq: debian
            variableRef: os
          insightOnFalse:
            primary: OS is not Debian
            detail: Operating System is not Debian
            severity: debug
```
