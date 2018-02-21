---
date: "2016-07-03T04:02:20Z"
title: "YAML Overview"
description: "An overview of the various sections of the Replicated YAML."
weight: "201"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", Schedulers, "Snapshots", "Preflight Checks", "Swarm", "Kubernetes" ]
index: "docs"
---

Replicated will deploy an application that is defined in a YAML spec. We currently support deploying an application that uses the Replicated scheduler or deploying a Kubernetes application. Understanding how each of these will be installed and maintained is an important consideration when choosing the scheduler to use to deploy your application.

{{< linked_headline "Replicated Scheduler" >}}

The Replicated scheduler is a propietary, mature container scheduler that supports the features required by enterprise customers. It was designed and built to enable your customer to install a complex application on one or a cluster of servers, without having to preinstall anything else. They can simply bring Linux servers that are compatible with Docker 1.7.1 or newer, and can deploy and manage your application on their servers. This scheduler supports [airgap installations](/docs/distributing-an-application/airgapped-installations) and many other features that enterprise users need. We recommend choosing the Replicated scheduler for most installations.

Our YAML definition is stored in a public repo at [https://github.com/replicatedhq/libyaml/](https://github.com/replicatedhq/libyaml/).

{{< linked_headline "Swarm Scheduler" >}}

More recent versions of the Docker Engine include swarm mode for natively scheduling containers across a cluster of Docker Engines called a swarm. Replicated supports Docker version 13.1 or greater and the Swarm scheduler. A Docker Compose version 3 YAML is required to distribute your application in swarm mode. We recommend choosing the Docker Swarm scheduler if you have existing Compose YAML and if your customer does not require a Linux distribution without support for newer Docker versions.

{{< linked_headline "Kubernetes Scheduler" >}}

Kubernetes is a popular cluster and orchestration tool when running Docker containers. Often, you may already have Kubernetes resources written to deploy your application. Replicated can deliver this down to an existing Kubernetes cluster, and provide all of the enterprise features that will be required to support, maintain, update and run your application behind the firewall. We recommend choosing the Kubernetes scheduler if you have existing Kubernetes YAML and if you customer is able to provision and maintain a Kubernetes cluster.

{{< linked_headline "Replicated API Version" >}}

At the top of the YAML file, regardless of the scheduler, there must be a Replicated API version. The current API version to use is {{< replicated_api_version_current >}}. Note: The [Changelog](https://release-notes.replicated.com/) tracks the API version.

```yaml
replicated_api_version: {{< replicated_api_version_current >}}
```

{{< linked_headline "App Basics" >}}

The next section includes some basic information about your application release including the app name.

```yaml
name: My Enterprise Application
```

{{< linked_headline "Detailed App Properties Description" >}}

The properties section includes definitions of some optional (but recommended) application properties. For a list of available properties see [Application Properties](/docs/packaging-an-application/application-properties). You will notice the `{{repl` escape sequence. This invokes a Replicated [template function](/docs/packaging-an-application/template-functions), which will be discussed in more detail soon.

```yaml
properties:
  app_url: http://{{repl ThisNodePrivateIPAddress }}
  console_title: My Enterprise Application
```

{{< linked_headline "Support Page" >}}

Replicated supports displaying custom markdown content on the Support page of the admin console. This can be defined in the console_support_markdown key.

```yaml
console_support_markdown: |
  Documentation for My Enterprise Application can be found [here](http://docs.my-enterprise-application.com).

  When contacting us for help, please download a Support Bundle (below) and attach it to the ticket.  The support
  bundle contains generic system information collected from this server.  It does _not_ contain any data from
  your instance of My Enterprise Application.
```

{{< linked_headline "Snapshots (Backups)" >}}

The snapshots key is available to to enable and configure [Snapshots](/docs/packaging-an-application/snapshots/). The following example will allow your customer to enable snapshots and create a script to run the snapshot.

```yaml
backup:
  enabled: '{{repl ConfigOptionEquals "backup_enabled" "1" }}'
  hidden: '{{repl ConfigOptionEquals "backup_enabled" "0" }}'
  pause_all: false
  script: |
    #!/bin/sh
    myappcli backup
```

{{< linked_headline "CMD" >}}

The Replicated platform has some built in [commands](/docs/packaging-an-application/commands/) that make writing your configuration much more powerful. In the cmds section you can write commands which we will use later.  These are useful to generate install-time values such as default certs/keys, randomized passwords, JWT token keys, etc.

```yaml
cmds:
- name: postgres_password
  cmd: random
  args:
  - "64"
```

{{< linked_headline "Components" >}}

The [components section](/docs/packaging-an-application/components-and-containers/) defines the container runtime environment for your containers, if using the Replicated scheduler.  This will include everything from the container image, environment variables, [application orchestration](/docs/packaging-an-application/events-and-orchestration/), config files, [optional clustering](/docs/packaging-an-application/clustering/) and more.

```yaml
components:
- name: Redis
  containers:
  - source: public
    image_name: redis
    version: 3.0.5
```

{{< linked_headline "Monitors" >}}

When using the Replicated scheduler, the containers which make up your components can be monitored for resource usage metrics on an individual basis. For each metric, simply specify each component and container image pair. For example, if you want to see CPU and memory usage metrics for some of your Redis container and your private worker image pulled from quay.io (in a Worker component):

```yaml
monitors:
  cpuacct:
  - Redis,redis
  - Worker,quay.io/myenterpriseapp/worker
  memory:
  - Redis,redis
  - Worker,quay.io/myenterpriseapp/worker
```

{{< linked_headline "Custom Metrics" >}}

Regardless of the scheduler used, Replicated can also display [custom metrics](/docs/packaging-an-application/custom-metrics/) sent from the running instance to the Admin Console by including the stats names in a custom_metrics key.

```yaml
custom_metrics:
- target: stats.gauges.myapp100.disk.*.*
  retention: "1s:10m,1m:20m,1h:30d"
  aggregation_method: "average"
  xfiles_factor: 0.3
- target: stats.gauges.myapp100.ping.*
  retention: "1s:7d"
  aggregation_method: "last"
  xfiles_factor: 0.6
```

{{< linked_headline "Ready State" >}}

(Note: The Ready State is only compatible with the Replicated scheduler. To learn how Replicated starts a Kubernetes application, see the detail in the [Kubernetes](/docs/packaging-an-application/kubernetes) document).

You can add a health check that Replicated will poll after your containers have all been started. The purpose of this is to report when your application is fully running and ready to start using. Once your application is running, we stop polling this health check and rely on other methods to monitor the status. The timeout parameter allows you to specify (in seconds) how long to keep retrying the command, if it fails. You can use a timeout value of -1 to indicate infinite polling. A timeout of 0 is not supported and causes the default of 10 minutes to be used.

{{< version version="2.7.0" >}} You can specify an optional third argument to set the HTTP timeout. Replicated will use a default timeout of 5 seconds if not specified.

### Available Commands:
- `http_status_code`
- `tcp_port_accept`

```yaml
state:
  ready:
    command: http_status_code
    args:
    - 'http://{{repl NodePublicIPAddress "My Component" "my-web-container" }}/ping'
    - '200'
    - '5'
    timeout: 900
```

{{< linked_headline "Customer Config Section" >}}

This section is where you can configure fields to gather input from the user. This input can be used to further configure your application. The values here can be used as inputs to container environment variables, config files, and more using [template functions](/docs/packaging-an-application/template-functions/) or tested for validity with [test procs](/docs/packaging-an-application/test-procs/). The [config section](/docs/packaging-an-application/config-screen/) is comprised of configuration groups and items. These items will render as a form in the Settings screen of the Replicated admin console.

```yaml
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    type: text
    value_cmd:
      name: host_ip
      value_at: 0
    ...
```

{{< linked_headline "Admin Commands" >}}

Optionally you can expose [admin commands](/docs/packaging-an-application/admin-commands/) in your containers. To configure the commands, add the following section. This example will allow the customer to run the `redis-cli` command with any arbitrary arguments. The command will be executed only in the Docker containers that match image name and version as well as defined in the named component. A command that will work with this configuration is `replicated admin redis-cli info`. Replicated will find the appropriate node to run this command on; the customer can run these on the main admin console.

```yaml
admin_commands:
- alias: redis-cli
  command: [redis-cli]
  run_type: exec
  component: DB
  container: redis
```

{{< linked_headline " Custom Preflight Checks" >}}

A [preflight check](/docs/packaging-an-application/preflight-checks/) is a test that is run before installing and running an application. The test will analyze the system to determine if the environment meets the minimum requirements and provide feedback during installation if these requirements are not met.

```yaml
host_requirements:
  docker_version: "1.10.3"
  cpu_cores: 2
  cpu_mhz: 2400
  memory: 8GB
  disk_space: 8GB
  replicated_version: ">=2.3.0 <2.4.1"
```

For the full configuration see [Examples](/categories/examples).
