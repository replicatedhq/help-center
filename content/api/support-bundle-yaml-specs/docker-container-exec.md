---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the stdout and stderr of `exec`-ing a command on a running docker container
index: docs
title: docker.container-exec
weight: "100"
gradient: "purpleToPink"
---

## docker.container-exec

Collect the stdout and stderr of `exec`-ing a command on a running docker container


```yaml
collect:
  v1:
    - docker.container-exec:
        container: supergoodtool-www
        output_dir: /www/debug/
        exec_config:
          Cmd:
            - nginx
            - '-t'
```


### Required Parameters


- `exec_config` - Same as would be passed to `docker exec`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/configs.go#L43)



### Optional Parameters


- `container` - The name of the container to run the command in


- `labels` - Labels shared by the container(s) to run the command in



### Outputs

    
- `stdout.raw` - The standard output of the command

- `stderr.raw` - The standard error of the command


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  