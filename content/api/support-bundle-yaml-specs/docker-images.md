---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Collect a list of docker images present on the server
index: docs
title: docker.images
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## docker.images

**type object**

Collect a list of docker images present on the server


```yaml
collect:
  v1:
    - docker.images:
        output_dir: /cooltool/images/
        All: true
        Filters:
          label:
            - com.supercooltool.app=supercooltool-enterprise
```


### Optional Parameters


- `All` - Same as would be passed to `docker images`


- `Filters` - Same as would be passed to `docker images`



### Outputs

    
- `image_ls.json` - JSON output


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  