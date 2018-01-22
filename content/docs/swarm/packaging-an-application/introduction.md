---
date: "2016-07-03T04:02:20Z"
title: "Introduction"
description: "An overview of the various sections of the Replicated YAML."
weight: "200"
categories: [ "Packaging a Swarm Application" ]
tags: [ "Application YAML", Schedulers, "Snapshots", "Preflight Checks", "Swarm" ]
index: "docs"
---

Replicated will deploy an application that is defined in a YAML spec. We currently support deploying an application that uses the Replicated scheduler or deploying a Kubernetes application. Understanding how each of these will be installed and maintained is an important consideration when choosing the scheduler to use to deploy your application.

{{< linked_headline "Replicated API Version" >}}

At the top of the YAML file, regardless of the scheduler, there must be a Replicated API version. The current API version to use is {{< replicated_api_version_current >}}. Note: The [Changelog](https://release-notes.replicated.com/) tracks the API version.

```yaml
replicated_api_version: {{< replicated_api_version_current >}}
```

{{< linked_headline "Application Basics" >}}

The next section includes some basic information about your application release including the app name.

```yaml
name: My Enterprise Application
```

{{< linked_headline "Application Properties" >}}

The properties section includes definitions of some optional (but recommended) application properties. For a list of available properties see [Application Properties](/docs/swarm/packaging-an-application/application-properties). You will notice the `{{repl` escape sequence. This invokes a Replicated [template function](/docs/swarm/packaging-an-application/template-functions), which will be discussed in more detail soon.

```yaml
properties:
  app_url: http://{{repl ThisNodePrivateIPAddress }}
  console_title: My Enterprise Application
```

{{< linked_headline "Support Page" >}}

Replicated supports displaying custom markdown content on the Support page of the admin console. This can be defined in the `console_support_markdown` key.

```yaml
console_support_markdown: |
  Documentation for My Enterprise Application can be found [here](http://docs.my-enterprise-application.com).

  When contacting us for help, please download a Support Bundle (below) and attach it to the ticket.  The support
  bundle contains generic system information collected from this server.  It does _not_ contain any data from
  your instance of My Enterprise Application.
```

{{< linked_headline "Commands" >}}

The Replicated platform has some built in [commands](/docs/swarm/packaging-an-application/commands/) that make writing your configuration much more powerful. In the cmds section you can write commands which we will use later.  These are useful to generate install-time values such as default certs/keys, randomized passwords, JWT token keys, etc.

```yaml
cmds:
- name: postgres_password
  cmd: random
  args:
  - "64"
```

{{< linked_headline "Custom Metrics and Monitors" >}}

Replicated provides a StatsD and Graphite, allowing you to display [custom metrics](/docs/swarm/packaging-an-application/custom-metrics-and-monitors/) sent from the running services in the Admin Console. This can be configured by including the stats names in a `custom_metrics` key, as well as the monitors to display using `monitors.custom`.

```yaml
monitors:
  custom:
  - name: Disk Space
    targets: [stats.gauges.myapp100.disk.*.*]
  - name: Ping
    targets: [stats.gauges.myapp100.ping.*]

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

{{< linked_headline "Customer Config Section" >}}

This section is where you can configure fields to gather input from the user. This input can be used to further configure your application. The values here can be used as inputs to container environment variables, config files, and more using [template functions](/docs/swarm/packaging-an-application/template-functions/) or tested for validity with [test procs](/docs/swarm/packaging-an-application/test-procs/). The [config section](/docs/swarm/packaging-an-application/config-screen/) is comprised of configuration groups and items. These items will render as a form in the Settings screen of the Replicated admin console.

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

Optionally you can expose [admin commands](/docs/swarm/packaging-an-application/admin-commands/) in your containers. To configure the commands, add the following section. This example will allow the customer to run the `redis-cli` command with any arbitrary arguments. The command will be executed only in the Docker containers that match image name and version as well as defined in the named component. A command that will work with this configuration is `replicated admin redis-cli info`. Replicated will find the appropriate node to run this command on; the customer can run these on the main admin console.

```yaml
admin_commands:
- alias: redis-cli
  command: [redis-cli]
  run_type: exec
  component: DB
  container: redis
```

{{< linked_headline "Custom Preflight Checks" >}}

A [preflight check](/docs/swarm/packaging-an-application/preflight-checks/) is a test that is run before installing and running an application. The test will analyze the system to determine if the environment meets the minimum requirements and provide feedback during installation if these requirements are not met.

```yaml
host_requirements:
  docker_version: "1.10.3"
  cpu_cores: 2
  cpu_mhz: 2400
  memory: 8GB
  disk_space: 8GB
  replicated_version: ">=2.3.0 <2.4.1"
```

{{< linked_headline "Container Images" >}}

To use private images from an external registry, you need to add the registry via the Vendor website. The guide for [integrating a third party registry](/docs/kb/developer-resources/third-party-registries) explains this in further detail.

For Airgapped installations, all images included in your Swarm application must be specified in the `images` section of your YAML in order to be included in the airgap bundle your customer will download and install.

```yaml
images:
- source: mythirdpartyprivateregistry
  name: namespace/imagename
  tag: 2.0.0
- source: public
  name: redis
  tag: 3.2-alpine
- source: public
  name: postgres
  tag: 9.4
```
