---
categories:
- support-bundle-yaml-specs
date: 2019-05-07T12:00:00Z
description: Read a file or a directory from the filesystem
index: docs
title: os.read-file
weight: "100"
gradient: "purpleToPink"
---

{{<legacynotice>}}

## os.read-file

**type object**

Read a file or a directory from the filesystem


```yaml
collect:
  v1:
    - os.read-file:
        output_dir: /files/etc/bigtool-conf
        filepath: /etc/bigtool.conf
```


### Required Parameters


- `filepath` - The file path on the host. If running Support Bundle via docker, this will work, but symlinks are not supported



### Outputs

    
- `bigtool.conf` - The file contents


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

  