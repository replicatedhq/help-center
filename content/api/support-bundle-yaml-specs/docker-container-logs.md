---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the stdout/stderr logs from one or more docker containers. One of `container` or `container_list_options` is required.
index: docs
title: docker.container-logs
weight: "100"
gradient: "purpleToPink"
---

## docker.container-logs

Collect the stdout/stderr logs from one or more docker containers. One of `container` or `container_list_options` is required.


```yaml
specs:
  - docker.container-logs:
      output_dir: /docker/cooltool/logs/www
      container_list_options:
        All: true
        Filters:
          name:
            - www
            - haproxy
```


### Optional Parameters


- `container` - A container name


- `container_list_options` - Options to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `container_logs_options` - Args as would be given to `docker logs`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L73)



    ### Outputs

    
- `{{.Name}}.stdout` - The stdout logs. Will generate this file for each matched container

- `{{.Name}}.stderr` - The stderr logs. Will generate this file for each matched container


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    