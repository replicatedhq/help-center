---
categories:
- analyze-yaml-specs
date: 2018-01-17T23:51:55Z
description: A fully customizable analyzer (advanced).
index: docs
title: raw
weight: "100"
gradient: "purpleToPink"
---

## raw

A fully customizable analyzer (advanced).


```yaml
analyze:
  v1:
    - raw:
        conditions:
          - eval:
              operator: or
              statements:
                - '{{repl .Empty}}'
                - '{{repl .Fail}}'
              variables:
                - Out: '{{repl .Ref | trimSuffix "\n"}}'
                  Empty: '{{repl not .Ref}}'
                - Fail: '{{repl ne .Out "1"}}'
            severity: error
            message: 'Failed to connect to postgres: "{{repl .Out}}"'
```


### Required Parameters


- `conditions` - An array of conditions, evaluated in order, that when met will produce a severity and message.

