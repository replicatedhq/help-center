---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Get the version of the docker server
index: docs
title: docker.version
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.version

**type object**

Get the version of the docker server


```yaml
collect:
  v1:
    - docker.version:
        output_dir: /docker/version
```


### Outputs

    
- `docker_version.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  