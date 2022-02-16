---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect information about the nodes in a Docker Swarm installation
index: docs
title: docker.node-ls
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.node-ls

**type object**

Collect information about the nodes in a Docker Swarm installation


```yaml
collect:
  v1:
    - docker.node-ls:
        description: List of swarm nodes
        output_dir: /swarm/nodes/
        Filters:
          name:
            - cooltool-docker-swarm-
```


### Optional Parameters


- `Filters` - Same as would be passed to `docker node ls`



### Outputs

    
- `node_ls.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  