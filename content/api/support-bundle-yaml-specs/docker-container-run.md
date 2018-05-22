---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the stderr/stdout of running a single docker container
index: docs
title: docker.container-run
weight: "100"
gradient: "purpleToPink"
---

## docker.container-run

Collect the stderr/stdout of running a single docker container


```yaml
specs:
  - docker.container-run:
      description: Listing of host's network interfaces
      output_dir: /host/network
      container_create_config:
        Config:
          Cmd:
            - ip
            - addr
            - show
          Image: 'debian:latest'
        HostConfig:
          AutoRemove: true
          NetworkMode: host
```


### Required Parameters


- `container_create_config` - Container create options as would be passed to `docker run`



### Optional Parameters


- `enable_pull` - If `true`, allow this container to be pulled if not present



### Outputs

    
- `stdout.raw` - The standard output of the container

- `stderr.raw` - The standard error of the container


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    