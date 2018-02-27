---
date: "2016-07-03T04:02:20Z"
title: "Config Files"
description: "Creating dynamic, custom configuration files in a Docker Swarm application"
categories: [ "Packaging a Swarm Application" ]
weight: "603"
index: "docs/swarm"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Config Files" >}}

Some applications and containers expect to have files mounted into the container with config data or other dynamically-generated contents. These can't be built into the container image because the contents are generated from the environment.

Docker Swarm provides a config item to handle this, and Replicated has support for building the config data through the [Replicated Template Functions](/docs/swarm/packaging-an-application/template-functions). To use a Swarm Config in Replicated, the config should be inline and referenced in the Swarm service.

For example, to write a config file to a container, the following YAML would be valid in Replicated:

```yaml
---
# kind: scheduler-swarm
version: "3.3"
services:
  anchore:
    image: anchore:v0.1.8
    deploy:
      replicas: 1
    configs:
      - source: anchore_config_yaml
        target: /config/config.yaml
        uid: '103'
        gid: '103'
        mode: 0440
configs:
  anchore_config_yaml:
    external: true
```

{{< linked_headline "Swarm Config" >}}

For the above YAML to run, the config must have a value. Replicated provides a top level YAML key to write these values and will dynamically add the config file to the service when starting. To add this to your YAML, add the following to your `kind: replicated` document:

```yaml
swarm:
  configs:
    - name: anchore_config_yaml
      value: |
        log_level: 'INFO'
        credentials:
          database:
            db_connect: 'postgresql+pg8000://postgres:mysecretpassword@anchore-db:5432/postgres'
```

{{< linked_headline "Dynamic Values" >}}

Using the [Replicated Template Fucntions](/docs/swarm/packaging-an-application/template-functions), it's possible to pass user-supplied or generated values to a config. Using the above example, a valid template function could be:

```yaml
swarm:
  configs:
    - name: anchore_config_yaml
      value: |
        log_level: 'INFO'
        credentials:
          database:
            db_connect: 'postgresql+pg8000://postgres:{{repl ConfigOption "pg_password"}}@anchore-db:5432/postgres'
```

{{< linked_headline "Full Example" >}}

Wrapping all of this up into a single example, the following YAML would generate a random postgres password and write it into a config file for the anchore service in Docker Swarm:

```yaml
# kind: replicated
cmds:
  - name: pg_password_generate
    cmd: random
    args:
      - "64"

config:
  - name: secrets
    title: Secrets
    items:
      - name: pg_password
        title: pg_password
        type: password
        hidden: true
        value_cmd:
          name: pg_password_generate
          value_at: 0

swarm:
  configs:
    - name: anchore_config_yaml
      value: |
        log_level: 'INFO'
        credentials:
          database:
            db_connect: 'postgresql+pg8000://postgres:{{repl ConfigOption "pg_password"}}@anchore-db:5432/postgres'


---
# kind: scheduler-swarm
version: "3.3"
services:
  anchore:
    image: anchore:v0.1.8
    deploy:
      replicas: 1
    configs:
      - source: anchore_config_yaml
        target: /config/config.yaml
        uid: '103'
        gid: '103'
        mode: 0440
configs:
  anchore_config_yaml:
    external: true
```