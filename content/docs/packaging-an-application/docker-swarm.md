---
date: "2017-07-11T00:00:00Z"
title: "Replicated with Docker Swarm"
description: "Packaging a Docker Swarm application in Replicated"
weight: "219"
categories: [ "Packaging an Application" ]
tags: [ "Docker", "Swarm", "Schedulers", "Application YAML", "Airgapped Environment" ]
aliases: [
    "/docs/packaging-an-application/swarm/"
]
index: "docs"
---

If your application is defined as a Docker Compose version 3 or 3.1 yaml file, Replicated can provide the same standard functionality deploying your application via the [Docker Swarm](https://docs.docker.com/engine/swarm/) scheduler as a [Docker Stack](https://docs.docker.com/docker-cloud/apps/stacks/) as of Replicated {{< version version="2.7.0" >}}. Using the Swarm scheduler, you can use all of the Swarm functionality including overlay networks, DNS service discovery, Docker secrets and more. To see a full example, check out the [Voting App example](/docs/examples/swarm-votingapp).

## Differences from the Replicated scheduler

Like the standard Replicated scheduler, when shipping an application using Swarm mode, Replicated provides the same simple cluster management for your customer. Replicated is an application that runs within the Swarm cluster, and will additionally leverage the Docker Swarm API to provide cluster management support.

Some of the standard Replicated features operate differently or are not supported on Swarm:

### New YAML format
The Swarm scheduler requires a different YAML format which combines some of the Replicated YAML with your own  Docker Compose V3 YAML. For an example of how this is done see here: [Swarm Voting App](/docs/examples/swarm-votingapp/) which is utilizing the `kind:` tag to designate Replicated and Swarm YAML sections.
```
---
# kind: scheduler-swarm
version: "3.1"
```

### External Private Images
External private images are supported as of Replicated 2.13.0. In order to take advantage of this feature, see the guide for [integrating a third party registry](/docs/kb/developer-resources/third-party-registries).

Once the registry is linked, the private image can be added to the global `images` section:

```yaml
images:
- source: mythirdpartyprivateregistry
  name: namespace/imagename
  version: 2.0.0
```

### Online and Airgapped Installations
Online installs should not use the standard install script, but instead use the [Swarm installation script](/docs/distributing-an-application/installing-with-swarm/). Airgapped installations work as expected when running in swarm mode. All images included in your swarm application must be specified in the new `images` section of your YAML in order to be included in the airgap bundle your customer will download. See below for an example.

```yaml
images:
- name: redis
  tag: 3.2-alpine
  source: public
- name: postgres
  tag: 9.4
  source: public
- name: example-voting-app-vote
  tag: good
  source: replicated
```

### Replicated Auto Updates
Replicated auto updates work as expected when running in Swarm mode. While the Replicated update is applying, the UI will not be available. Once it finishes, refresh the UI to get the update.

### Snapshots
Standard Replicated snapshots are not supported when running in Swarm mode. This functionality will be included in an upcoming release.

### Custom Preflight Checks
Custom preflight checks are not currently supported when running in Swarm mode. These will be available in a future release.

### Admin Commands
Admin commands are fully supported when running in Swarm mode. Your yaml will need to specify a Swarm service in which to run the admin command. If multiple containers are part of the service then replicated will choose a random container in which to run the command. See the example below:

```yaml
properties:
  shell_alias: mycli
admin_commands:
- alias: redis-sadd
  command: [redis-cli, sadd]
  run_type: exec
  service: redis
```

### Dashboard Metrics
When running Replicated in Swarm mode, the standard statsd endpoint is still running. The only difference here is that the standard CPU and Memory usage graphs will not be available and will be included in an upcoming release. You can use the [custom metrics](/docs/packaging-an-application/custom-metrics) feature to define you own application-specific metrics to show on the admin console dashboard.

### Ready State/Health Checks
Replicated will consider the application running when all replicas of the Swarm services are running. Ready state functionality is not currently supported when running in Swarm mode. This functionality will be included in an upcoming release.

### Template Functions
There are some additional [template functions](/docs/packaging-an-application/template-functions#swarm) available when running in Swarm mode.

### Secrets and Configs
Replicated supports secrets and configs through the use of [template functions](/docs/packaging-an-application/template-functions/). It is possible to request data from the user using a combination of config settings and the `ConfigOption` [template function](/docs/packaging-an-application/template-functions/#configoption). For more information on configuring the Replicated settings screen see the [docs on customizing the Admin Console settings page](/docs/packaging-an-application/config-screen/). See below for an example of creating secrets and configs in your application. [Swarm configs](https://docs.docker.com/compose/compose-file/#configs-configuration-reference) is supported as of Replicated {{< version version="2.13.0" >}}.

```yaml
# kind: replicated
...
config:
- name: secrets
  title: Secrets
  items:
  - name: config_my_secret
    title: My Secret
    type: password
- name: configs
  title: Configs
  items:
  - name: config_my_config
    title: My Config
    type: text
...
swarm:
  secrets:
  - name: my_secret
    value: '{{repl ConfigOption "config_my_secret" }}'
    labels:
      foo: bar
      baz:
  configs:
  - name: my_config
    value: '{{repl ConfigOption "config_my_config" }}'
    labels:
      foo: bar
      baz:

---
# kind: scheduler-swarm
version: "3.3"
services:
  redis:
    image: redis:latest
    deploy:
      replicas: 1
    secrets:
      - my_secret
    configs:
      - source: my_config
        target: /redis_config
        uid: '103'
        gid: '103'
        mode: 0440
secrets:
  my_secret:
    external: true
configs:
  my_config:
    external: true
```

### Notes:
The `config_files` tag is not supported when running in Swarm mode. Please see the __Secrets and Configs__ section for details on how to integrate user-supplied information into your containers via the Docker Secrets and Configs features.
