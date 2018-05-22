---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the `docker inspect` output for one or more running or stopped containers. One of `container` or `container_list_options` is required.
index: docs
title: docker.container-inspect
weight: "100"
gradient: "purpleToPink"
---

## docker.container-inspect

Collect the `docker inspect` output for one or more running or stopped containers. One of `container` or `container_list_options` is required.


```yaml
specs:
  - docker.container-inspect:
      output_dir: /containers/cooltool/www-stack
      container_list_options:
        All: true
        Filters:
          name:
            - www
            - nginx
            - dnsmasq
```


### Optional Parameters


- `container` - the container name


- `container_list_options` - Options to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)



    ### Outputs

    
- `{{.Name}}.json` - The json output of the inspect call. Will generate this file for each matched container


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    