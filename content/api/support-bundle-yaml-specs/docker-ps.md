---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect information about containers
index: docs
title: docker.ps
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.ps

**type object**

Collect information about containers


```yaml
collect:
  v1:
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

  