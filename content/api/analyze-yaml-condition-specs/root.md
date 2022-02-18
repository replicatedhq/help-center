---
categories:
- analyze-yaml-condition-specs
date: 2019-05-07T12:00:00Z
description: Reference Documentation for customizing your end customer's Troubleshoot Analyze experience
index: docs
title: Analyze Conditions
weight: "1"
gradient: "purpleToPink"
---

{{<legacynotice>}}

The Analyze Spec allows for gathering insights from your troubleshoot bundles about your end-customer installations.

Conditions are individual assertions that can be made on information gathered from your customer's on-prem application via a troubleshoot bundle through [variables](/api/analyze-yaml-variable-specs/root/). These assertions can be used to surface insights based on failure or success.

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
