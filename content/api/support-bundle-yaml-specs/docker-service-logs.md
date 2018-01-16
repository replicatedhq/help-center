---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect logs from a docker swarm service. One of `service` or `service_list_options` is required.
index: docs
title: docker.service-logs
weight: "100"
---

## docker.service-logs

Collect logs from a docker swarm service. One of `service` or `service_list_options` is required.


```yaml
specs:
  - docker.service-logs:
      output_dir: /swarm/services/www
      service: cooltool-www
```

```yaml
specs:
  - docker.service-logs:
      output_dir: /swarm/services/core-stack
      service_list_options:
        Filters:
          name:
            - cooltool-www
            - cooltool-api
            - cooltool-worker
```

    
### Optional Parameters


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)


- `service` - A single docker swarm service for which to collect logs


- `service_list_options` - Options for filtering all swarm services


    
### Outputs


- `{{.Name}}.raw` - The raw output of the logs call. Will generate this file for each matched service

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    