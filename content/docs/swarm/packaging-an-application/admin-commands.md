---
date: "2016-07-03T04:02:20Z"
title: "Admin Commands"
description: "Implementation guide for application vendors to provide customers with aliased CLI commands that can be performed in the services across a cluster"
categories: [ "Packaging a Swarm Application" ]
weight: "612"
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

The `admin_commands` section allows you to define ad-hoc commands that can be executed inside a running container from the shell.

*Note: If you are calling admin commands from a script use the `--no-tty` flag.*

{{< linked_headline "Executing" >}}

```bash
$ <shell_alias> <command_alias> <params>
```

or

```bash
$ replicated admin <command_alias> <params>
```

or

```bash
$ docker exec -it "$(docker inspect --format "{{.Status.ContainerStatus.ContainerID}}" "$(docker service ps "$(docker service inspect --format "{{.ID}}" replicated_replicated | awk "NR==1")" -q)")" replicated admin <command_alias> <params>
```

or from a script

```bash
$ replicated admin --no-tty <command_alias> <params>
```

{{< linked_headline "Examples" >}}

### `nginx-reload`

This example admin command will create a shell alias to allow `mycli nginx-reload` to execute the command `service nginx reload` inside the running nginx container. This same admin command will also be available to run with `replicated admin nginx-reload`, or simply as `nginx-reload`

```yaml
properties:
  shell_alias: mycli
admin_commands:
- alias: nginx-reload
  command: [service, nginx, reload]
  run_type: exec
  service: nginx
```

### `redis-sadd`

This example admin command will create a shell alias to allow `mycli redis-sadd mykey myvalue` to execute the command `redis-cli sadd mykey myvalue` inside the redis container. This same admin command will also be available to run with `replicated admin redis-sadd mykey myvalue` or `redis-sadd mykey myvalue`

```yaml
properties:
  shell_alias: mycli
admin_commands:
- alias: redis-sadd
  command: [redis-cli, sadd]
  run_type: exec
  service: redis
```

{{< linked_headline "Configuration" >}}

### shell_alias
This is the shell alias that will be created during installation when using the Replicated scheduler.  Commands can be invoked using this alias or using the replicated CLI directly. Note that this is defined in Application Properties, not in the admin command. This alias is not available for Kubernetes applications.

### alias
This is the command that the user will specify on the command line.  When `shell_alias` is defined, shell aliases will also be created for each individual admin command.

### command
This is the actual command that will be executed inside the container when the alias is invoked through the replicated CLI.

### run_type
Specify `exec` to execute the command in the currently running container. This is currently the only option.

### service
This identifies the service under which to run the command. A container will be chosen at random to run the command in.

