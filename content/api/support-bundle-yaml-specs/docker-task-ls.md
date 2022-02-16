---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: List docker swarm tasks
index: docs
title: docker.task-ls
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.task-ls

**type object**

List docker swarm tasks


```yaml
collect:
  v1:
    - docker.task-ls:
        output_dir: /swarm/tasklist
        Filters:
          name:
            - cooltool-api-
            - cooltool-backend-
```


### Optional Parameters


- `Filters` - Filters for tasks



### Outputs

    
- `task_ls.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  