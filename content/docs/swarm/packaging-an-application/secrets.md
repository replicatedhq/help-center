---
date: "2016-07-03T04:02:20Z"
title: "Docker Secrets"
description: "Creating and managing secrets in a Docker Swarm application"
categories: [ "Packaging a Swarm Application" ]
weight: "604"
index: "docs/swarm"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Docker Secrets" >}}

Docker introduced support for secret management in Docker 1.13. When running an application on Replicated and Docker Swarm, the minimum supported Docker version is {{< swarm_docker_version_minimum >}}, so this functionality will always be available to your application.

{{< linked_headline "Secret Reference" >}}

To use a Swarm secret in Replicated, the secret should be defined as `external` in the service definition, and referenced in the specific services that need to access the secret.

For example, to set a secret on a Postgres container, the following YAML would be expected in Replicated:

```yaml
---
# kind: scheduler-swarm
version: "3.3"
services:
  redis:
    image: postgres:10.2
    deploy:
      replicas: 1
    secrets:
      - pg_password
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/pg_password
secrets:
  pg_password:
    external: true
```

{{< linked_headline "Setting Values" >}}

For the above YAML to run, the secret must exist. Replicated provides a top level YAML key to provide these values and will generate the secrets in the stack before starting your application. To add this to your YAML, add the following to your `kind: replicated` document:

```yaml
swarm:
  secrets:
    - name: pg_password
      value: "abcdef"
```

{{< linked_headline "Dynamic Values" >}}

Using the [Replicated Template Functions](/docs/swarm/packaging-an-application/template-functions) it's possible to pass a user-supplied or generated value to a secret. To pass a user supplied value, you can replace the above example with a template function to write the value:

```yaml
swarm:
  secrets:
  - name: pg_password
    value: '{{repl ConfigOption "pg_password"}}`
```


{{< linked_headline "Full Example" >}}

Wrapping this up into a single example, the following YAML would generate a random postgres password and supply it as a secret to the postgres container at startup:

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
  secrets:
  - name: pg_password_secret
    value: '{{repl ConfigOption "pg_password" }}'

---
# kind: scheduler-swarm
version: "3.3"
services:
  postgres:
    image: postgres:10.2
    deploy:
      replicas: 1
    secrets:
      - pg_password_secret
    environment:
      POSTGRES_PASSWORD_FILE: /run/secrets/pg_password_secret
secrets:
  pg_password:
    external: true
```
