---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect information about containers
index: docs
title: docker.ps
weight: "100"
gradient: "purpleToPink"
---

## docker.ps

Collect information about containers


```yaml
specs:
  - docker.ps:
      output_dir: /docker/ps/
      All: true
```

    
### Optional Parameters


- `All` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Before` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Filters` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Latest` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Limit` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Quiet` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Since` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


- `Size` - Option to be used to filter the list of containers, as in [The Docker API](https://github.com/moby/moby/blob/master/api/types/client.go#L61)


    
### Outputs


- `container_ls.json` - JSON output

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    