---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect info about the Docker daemon
index: docs
title: docker.info
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.info

**type object**

Collect info about the Docker daemon


```yaml
collect:
  v1:
    - docker.info:
        output_dir: /docker/daemon/
        timeout_seconds: 10
        description: Info about the docker daemon
```


### Outputs

    
- `docker_info.json` - A pretty-printed JSON representation


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  