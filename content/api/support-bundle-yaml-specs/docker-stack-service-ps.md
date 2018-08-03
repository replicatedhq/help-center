---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about the tasks running in a service
index: docs
title: docker.stack-service-ps
weight: "100"
gradient: "purpleToPink"
---

## docker.stack-service-ps

Collect information about the tasks running in a service


```yaml
collect:
  v1:
    - docker.stack-service-ps:
        output_dir: /swarm/stacks/cooltool/service-tasks
        description: Tasks owned by services in the cooltool stack
        namespace: cooltool-core
        task_list_options:
          Filters:
            label:
              - com.cooltool.tier=www
              - com.cooltool.tier=api
```


### Required Parameters


- `namespace` - The stack's namespace



### Optional Parameters


- `task_list_options` - Options as would be passed to `docker stack ps`



### Outputs

    
- `service_ps.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  