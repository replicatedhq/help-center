---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect logs from one or more services in a stack
index: docs
title: docker.stack-service-logs
weight: "100"
gradient: "purpleToPink"
---

## docker.stack-service-logs

Collect logs from one or more services in a stack


```yaml
specs:
  - docker.stack-service-logs:
      output_dir: /swarm/stacks/cooltool/service-logs
      description: Logs from services in the cooltool stack
      namespace: cooltool-core
```

    
### Required Parameters


- `namespace` - The stack's namespace


    
### Optional Parameters


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)


- `service_list_options` - Options as would be passed to `docker stack services


    
### Outputs


- `{{.StackName}}_{{.ServiceName}}.stdout` - The stdout output. Will generate this file for each matched service

- `{{.StackName}}_{{.ServiceName}}.stderr` - The stderr output. Will generate this file for each matched service

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    