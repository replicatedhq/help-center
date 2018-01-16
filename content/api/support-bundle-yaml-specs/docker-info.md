---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect info about the Docker daemon
index: docs
title: docker.info
weight: "100"
---

## docker.info

Collect info about the Docker daemon


```yaml
specs:
  - docker.info:
      output_dir: /docker/daemon/
      timeout_seconds: 10
      description: Info about the docker daemon
```

    
### Outputs


- `docker_info.raw` - The raw JSON from the docker daemon

- `docker_info.json` - A pretty-printed JSON representation

- `docker_info.human` - A human-readable representation

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    