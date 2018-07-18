---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect logs from a docker swarm task
index: docs
title: docker.task-logs
weight: "100"
gradient: "purpleToPink"
---

## docker.task-logs

Collect logs from a docker swarm task


```yaml
specs:
  - docker.task-logs:
      output_dir: /swarm/tasks/logs
      description: Logs from cooltool tasks in the www and api tiers
      task_list_options:
        Filters:
          label:
            - com.cooltool.tier=www
            - com.cooltool.tier=api
```


### Optional Parameters


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)


- `id` - The id of a single task


- `task_list_options` - Options for filtering stack tasks



### Outputs

    
- `{{.TaskId}}.stdout` - The stdout output. Will generate this file for each matched service task

- `{{.TaskId}}.stderr` - The stderr output. Will generate this file for each matched service task


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    