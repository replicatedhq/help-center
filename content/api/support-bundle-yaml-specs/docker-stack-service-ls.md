---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about services in a swarm stack
index: docs
title: docker.stack-service-ls
weight: "100"
gradient: "purpleToPink"
---

## docker.stack-service-ls

Collect information about services in a swarm stack


```yaml
specs:
  - docker.stack-service-ls:
      output_dir: /swarm/stacks/cooltool/services
      description: Logs from services in the cooltool stack
      namespace: cooltool-core
```


### Required Parameters


- `namespace` - The stack's namespace



### Optional Parameters


- `service_list_options` - Options as would be passed to `docker stack services



    ### Outputs

    
- `service_ls.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    