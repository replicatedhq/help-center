---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about the tasks run by one or more services
index: docs
title: docker.service-ps
weight: "100"
gradient: "purpleToPink"
---

## docker.service-ps

Collect information about the tasks run by one or more services


```yaml
specs:
  - docker.service-ps:
      output_dir: /swarm/services/www/tasks/
      description: List of all services starting with `cooltool-`
      Filters:
        name:
          - cooltool-
```


### Required Parameters


- `Filters` - Same as would be passed to `docker service ps`



    ### Outputs

    
- `service_ps.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    