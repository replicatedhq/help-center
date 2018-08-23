---
categories:
- analyze-yaml-specs
date: 2018-01-17T23:51:55Z
description: Check that the Docker version meets the required minimum
index: docs
title: docker.version
weight: "100"
gradient: "purpleToPink"
---

## docker.version

Check that the Docker version meets the required minimum


```yaml
analyze:
  v1:
    - docker.version:
        server_version_minimum: 17.12.1
```


### Required Parameters


- `server_version_minimum` - The minimum Docker version

