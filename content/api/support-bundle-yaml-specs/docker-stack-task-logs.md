---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect logs from a docker swarm task
index: docs
title: docker.stack-task-logs
weight: "100"
gradient: "purpleToPink"
---

## docker.stack-task-logs

**type object**

Collect logs from a docker swarm task


```yaml
collect:
  v1:
    - docker.stack-task-logs:
        output_dir: /swarm/stacks/cooltool/service-logs
        description: Logs from services in the cooltool stack
        namespace: cooltool-core
        task_list_options:
          Filters:
            name:
              - redis.1
```

```yaml
collect:
  v1:
    - docker.stack-task-logs:
        output_dir: /swarm/stacks/cooltool/service-logs
        description: Logs from services in the cooltool stack
        namespace: cooltool-core
        labels: {}
```

```yaml
collect:
  v1:
    - docker.stack-task-logs:
        output_dir: /swarm/stacks/cooltool/service-logs
        description: Logs from services in the cooltool stack
        namespace: cooltool-core
        labels:
          com.replicated.excludelogs: 'false'
          abc: xyz
          abc2: ''
```


### Required Parameters


- `namespace` - The stack namespace



### Optional Parameters


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)


- `labels` - A set of labels that must be present for the logs to be included


- `task_list_options` - Options for filtering stack tasks



### Outputs

    
- `{{.TaskId}}.stdout` - The stdout output. Will generate this file for each matched service task

- `{{.TaskId}}.stderr` - The stderr output. Will generate this file for each matched service task


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  