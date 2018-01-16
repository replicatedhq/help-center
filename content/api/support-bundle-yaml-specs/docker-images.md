---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Collect a list of docker images present on the server
index: docs
title: docker.images
weight: "100"
---

## docker.images

Collect a list of docker images present on the server


```yaml
specs:
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


- `image_ls.raw` - Raw output

- `image_ls.json` - JSON output

- `image_ls.human` - Human-readable output

    
<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}
    
    