---
date: "2016-07-03T04:02:20Z"
title: "Admin Commands"
description: "Implementation guide for application vendors to provide customers with aliased CLI commands that can be performed in the containers across a cluster."
categories: [ "Packaging a Kubernetes Application" ]
weight: "2613"
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

The `admin_commands` section allows you to define ad-hoc commands that can be executed inside a running container from the shell.

_Note: If you are calling admin commands from a script use the `--no-tty` flag._

{{< linked_headline "Executing" >}}

```bash
$ replicated admin <command_alias> <params>
```

or

```bash
$ kubectl exec -it \
    "$(kubectl get pods -l=app=replicated -l=tier=master -o=jsonpath='{.items..metadata.name}')" \
    -c replicated -- \
    replicated admin <command_alias> <params>
```

or from a script

```bash
$ replicated admin --no-tty <command_alias> <params>
```

{{< linked_headline "CLI Script Flags" >}}

_Note: These flags are only supported when running a command from the host machine and not supported when calling a command from a [custom backup script](/docs/snapshots/custom-scripts/)._

| Flag                | Short | Description                          |
| --interactive[=0|1] | -i    | Keep STDIN open even if not attached |
| --tty[=0|1]         | -t    | Allocate a pseudo-TTY                |

_Note: When using the "replicated" command, the script will attempt to detect a TTY as well as whether or not to open STDIN based on the invocation of the command. In some cases it may be best to define this explicitly when running the command. The `--interactive` and `--tty` have been provided to manually override the autodetected behavior. If either of these flags have been specified, Replicated will no longer try to detect TTY or STDIN. If you are calling admin commands from a script use the `--tty=0` flag to disable allocation of a pseudo-TTY. When running a command via a [custom backup script](/docs/snapshots/custom-scripts/) or calling `docker exec` directly use the `--no-tty` flag._

### Examples

Explicitly open STDIN and allocate a pseudo-TTY.

```bash
$ replicated -it admin <command_alias> <params>
```

Disable both STDIN and TTY.

```bash
$ replicated --interactive=0 --tty=0 admin <command_alias> <params>
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
