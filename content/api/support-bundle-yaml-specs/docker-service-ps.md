---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect information about the tasks run by one or more services
index: docs
title: docker.service-ps
weight: "100"
gradient: "purpleToPink"
---

## docker.service-ps

**type object**

Collect information about the tasks run by one or more services


```yaml
collect:
  v1:
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

  