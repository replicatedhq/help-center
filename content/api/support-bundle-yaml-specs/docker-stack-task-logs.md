---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect logs from a docker swarm task
index: docs
title: docker.stack-task-logs
weight: "100"
---

## docker.stack-task-logs

Collect logs from a docker swarm task


```yaml
specs:
  - docker.stack-task-logs:
      output_dir: /swarm/stacks/cooltool/service-logs
      description: Logs from services in the cooltool stack
      namespace: cooltool-core
      task_list_options:
        Filters:
          label:
            - com.cooltool.tier=www
            - com.cooltool.tier=api
```

    
### Required Parameters


- `namespace` - The stack namespace


    
### Optional Parameters


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)


- `task_list_options` - Options for filtering stack tasks


    
### Outputs


- `{{.TaskId}}.raw` - The raw output. Will generate this file for each matched service task

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    