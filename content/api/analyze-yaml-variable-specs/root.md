---
categories:
- analyze-yaml-variable-specs
date: 2019-05-07T12:00:00Z
description: Reference Documentation for customizing your end customer's Troubleshoot Analyze experience
index: docs
title: Analyze Variables
weight: "1"
gradient: "purpleToPink"
---

The Analyze Spec allows for gathering insights from your troubleshoot bundles about your end-customer installations.

Information gathered in troubleshoot bundle, collected from your customer's on-prem application, can be stored in variables and later used to make assertions via [conditions](/api/analyze-yaml-condition-specs/root/).

### Example

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
```
