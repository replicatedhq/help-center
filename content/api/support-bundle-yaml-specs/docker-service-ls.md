---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect a list of docker swarm services
index: docs
title: docker.service-ls
weight: "100"
gradient: "purpleToPink"
---

## docker.service-ls

Collect a list of docker swarm services


```yaml
collect:
  v1:
    - docker.service-ls:
        output_dir: /swarm/services/list/
        description: List of all services starting with `cooltool-`
        Filters:
          name:
            - cooltool-
```


### Optional Parameters


- `Filters` - Same as would be passed to `docker service ls`



### Outputs

    
- `service_ls.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  