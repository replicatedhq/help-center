---
date: "2016-07-03T04:02:20Z"
title: "Admin Commands"
description: "Implementation guide for application vendors to provide customers with aliased CLI commands that can be performed in the containers across a cluster."
categories: [ "Packaging a Kubernetes Application" ]
weight: "2612"
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

The `admin_commands` section allows you to define ad-hoc commands that can be executed inside a running container from the shell.

_Note: If you are calling admin commands from a script use the `--no-tty` flag._

{{< linked_headline "Executing" >}}


```bash
$ kubectl exec -it "$(kubectl get pods -l=app=replicated -l=tier=master -o=jsonpath='{.items..metadata.name}')" -c replicated -- replicated admin <command_alias> <params>
```

{{< linked_headline "Examples" >}}

### `nginx-reload`

```yaml
admin_commands:
- alias: nginx-reload
  command: [service, nginx, reload]
  run_type: exec
  selector:
    app: nginx
    tier: load-balancer
    role: master
```

### `redis-sadd`

This example admin command will create a shell alias to allow `mycli redis-sadd mykey myvalue` to execute the command `redis-cli sadd mykey myvalue` inside the redis container. This same admin command will also be available to run with `replicated admin redis-sadd mykey myvalue` or `redis-sadd mykey myvalue`

```yaml
admin_commands:
- alias: redis-sadd
  command: [redis-cli, sadd]
  run_type: exec
  selector:
    app: redis
    tier: backend
    role: master
  container: master # optional, will choose first in pod
```

{{< linked_headline "Configuration" >}}

### alias

This is the command that the user will specify on the command line.

### command

This is the actual command that will be executed inside the container when the alias is invoked through the replicated CLI.

### run_type

Specify `exec` to execute the command in the currently running container. This is currently the only option.


### selector

This is a Kubernetes map of selectors to identify the pod that the admin command should be run in.
