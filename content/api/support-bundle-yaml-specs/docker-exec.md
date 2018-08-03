---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect the stdout/stderr of executing a command in an already running docker container
index: docs
title: docker.exec
weight: "100"
gradient: "purpleToPink"
---

## docker.exec

Collect the stdout/stderr of executing a command in an already running docker container


```yaml
collect:
  v1:
    - docker.exec:
        container: supergoodtool-www
        output_dir: /www/debug/
        exec_config:
          Cmd:
            - toolctl
            - info
            - '--verbose'
```


### Required Parameters


- `container` - The container name


- `exec_config` - Config options as would be passed to `docker exec`, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/configs.go)



### Outputs

    
- `stdout.raw` - The standard output of the command

- `stderr.raw` - The standard error of the command


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  