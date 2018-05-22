---
categories:
- support-bundle-yaml-specs
date: 2018-01-17T23:51:55Z
description: Run a command. Will be run in the support bundle container if `docker run replicated/support-bundle` is used. To run in a custom container, use `docker.run` instead
index: docs
title: os.run-command
weight: "100"
gradient: "purpleToPink"
---

## os.run-command

Run a command. Will be run in the support bundle container if `docker run replicated/support-bundle` is used. To run in a custom container, use `docker.run` instead


```yaml
specs:
  - os.run-command:
      output_dir: /system/commands/ping-google
      name: date
```

```yaml
specs:
  - os.run-command:
      output_dir: /system/commands/ping-google
      name: cat
      args:
        - /etc/os-release
```


### Required Parameters


- `name` - The command to run



### Optional Parameters


- `args` - The command arguments


- `dir` - The working directory of the command


- `env` - Specifies additional environment variables



    ### Outputs

    
- `stderr` - The standard error of the command

- `stdout` - The standard output of the command


<br>
{{< note title="Shared Parameters" >}}
This spec also inherits all of the required and optional [Shared Parameters](/api/support-bundle-yaml-specs/shared/)
{{< /note >}}

    