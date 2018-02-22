---
date: "2016-07-03T04:02:20Z"
title: "Admin Commands"
description: "Implementation guide for application vendors to provide customers with aliased CLI commands that can be performed in the containers across a cluster."
categories: [ "Packaging a Native Application" ]
weight: "216"
index: "docs/native"
icon: "replicatedCircle"
---

The `admin_commands` section allows you to define ad-hoc commands that can be executed inside a running container from the shell.

_Note: If you are calling admin commands from a script use the `--no-tty` flag._

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
$ docker exec -it replicated replicated admin <command_alias> <params>
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
  component: MyComponent
  container: nginx
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
  component: MyComponent
  container: redis
```

{{< linked_headline "Configuration" >}}

### shell_alias

This is the shell alias that will be created during installation when using the Replicated scheduler. Commands can be invoked using this alias or using the replicated CLI directly. Note that this is defined in Application Properties, not in the admin command. This alias is not available for Kubernetes applications.

### alias

This is the command that the user will specify on the command line. When `shell_alias` is defined, shell aliases will also be created for each individual admin command.

### command

This is the actual command that will be executed inside the container when the alias is invoked through the replicated CLI.

### run_type

Specify `exec` to execute the command in the currently running container. This is currently the only option.

### component

This identifies the component under which to run the command.

### container

This specifies the container in which to run the admin command.
