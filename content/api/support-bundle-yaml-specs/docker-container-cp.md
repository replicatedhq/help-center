---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect a file by copying from a running docker container
index: docs
title: docker.container-cp
weight: "100"
gradient: "purpleToPink"
---

## docker.container-cp

Collect a file by copying from a running docker container


```yaml
collect:
  v1:
    - docker.container-cp:
        description: the supergoodtool www site access logs
        container: supergoodtool-www
        src_path: /var/log/nginx/access.log
        output_dir: /www/access/
```

```yaml
collect:
  v1:
    - docker.container-cp:
        description: the supergoodtool www site access logs
        labels:
          - container.name.label
        src_path: /var/log/nginx/access.log
        output_dir: /www/access/
```

```yaml
collect:
  v1:
    - docker.container-cp:
        description: the supergoodtool www site access logs
        labels:
          - container.name.label
        src_path: /var/log/nginx/access.log
        output_dir: /www/access/
        include_empty: true
```


### Required Parameters


- `src_path` - The path of the target file in the container's filesystem



### Optional Parameters


- `container` - The name of the container to copy from


- `labels` - Labels shared by the container(s) to copy from



### Outputs

    
- `{{.Name}}` - Output will match the name of the file. If `src_path` is `/var/log/nginx/access.log`, then `output_dir` will contain a file `access.log`

- `{{.Name}}` - Output will match the name of the file. If `src_path` is `/var/log/nginx/access.log`, then `output_dir` will contain a file `access.log`


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  