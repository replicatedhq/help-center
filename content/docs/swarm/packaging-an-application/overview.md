---
date: "2016-07-03T04:02:20Z"
title: "Packaging A Swarm Application"
description: "An overview of the shipping a Docker Swarm application in Replicated"
weight: "601"
categories: [ "Packaging a Swarm Application" ]
aliases: [docs/swarm/packaging-an-application/,/docs/packaging-an-application/docker-swarm/]
gradient: "swarm"
icon: "replicatedDockerSwarm"
index: ["docs/swarm", "docs"]
hideFromList: true
---

Using Replicated with the built-in Docker Swarm support allows you to use your existing `docker-compose.yml` and Swarm Services to deploy your application using the Replicated platform.

Shipping a Swarm application with Replicated involves creating a single YAML file that contains your Docker Swarm services and additional Replicated configuration data. This is packaged as a multi-document YAML file, with a special comment at the top of each included documented to describe it's structure.

A typical Docker Swarm release in Replicated will contain two documents, and will have the following structure:

```yaml
---
# kind: replicated
replicated_api_version: {{< replicated_api_version_current >}}
config:
  ...

---
# kind: scheduler-swarm
version: "3.3"
services:
  ...
```

{{< linked_headline "Replicated API Version" >}}

The `replicated_api_version` key is required as a top level key in every YAML. This should be set to the minimum version of Replicatd required to run this release. The current API version to use is {{< replicated_api_version_current >}}, and the latest version can always be found on our [changelog](https://release-notes.replicated.com). The Replicated Native Scheduler will refuse to install an application requiring a newer version of Replicated than available. This is designed so you can rely on newer features of Replicated in your application.

```yaml
replicated_api_version: {{< replicated_api_version_current >}}
```

{{< linked_headline "Application Basics" >}}

The next section includes some basic information about your application release including the app name.

```yaml
name: My Enterprise Application
```

{{< linked_headline "Detailed App Properties Description" >}}

The properties section includes definitions of some recommended application properties. For a list of available properties see [Application Properties](/docs/swarm/packaging-an-application/application-properties). You will notice the `{{repl` escape sequence. This invokes a Replicated [template function](/docs/swarm/packaging-an-application/template-functions) which is a way to pull generated, customer supplied, or other outside values into an installation.

```yaml
properties:
  app_url: http://{{repl ThisNodePrivateIPAddress }}
  console_title: My Enterprise Application
```

{{< linked_headline "Snapshots (Backups)" >}}

The snapshots key is available to to enable and configure [Snapshots](/docs/swarm/packaging-an-application/snapshots/). The following example will enable snapshots from the Admin Console, using the default behavior.

```yaml
backup:
  enabled: true
```

{{< linked_headline "CMD" >}}

The Replicated platform has some built in [commands](/docs/swarm/packaging-an-application/commands/) that make writing your configuration much more powerful. In the `cmds` section you can write commands which you can use later.  These are useful to generate install-time values such as default TLS certs/keys, randomized passwords, other other values.

```yaml
cmds:
  - name: jwt_hmac_secret
    cmd: random
    args:
      - "128"
```

{{< linked_headline "Monitors" >}}

The Replicated Native Scheduler can include CPU and memory monitors for any container without any code. The following YAML will show a CPU and a memory graph of the `redis` container on the Admin Console dashboard page.

```yaml
monitors:
  cpuacct:
    - Redis,redis
  memory:
     - Redis,redis
```

{{< linked_headline "Customer Config Section" >}}

This section is where you can [configure fields to gather input from the user](/docs/swarm/packaging-an-application/config-screen/). This input can be used to further configure your application. The values here can be used as inputs to environment variables and config files by using the [template functions](/docs/swarm/packaging-an-application/template-functions/). They can also be tested for validity with [test procs](/docs/swarm/packaging-an-application/test-procs/). These items will render as a form in the Settings screen of the Replicated admin console.

```yaml
config:
  - name: hostname
    title: Hostname
    description: Ensure this domain name is routable on your network.
    type: text
    required: true
    ...
```

{{< linked_headline "Container Images" >}}

To use private images from an external registry, you need to add the registry to [vendor.replicated.com](https://vendor.replicated.com). The guide for [integrating a third party registry](/docs/kb/developer-resources/third-party-registries) explains this in further detail.

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


There are other keys, not listed here, that are required to enable advanced functionality. To see more, see the [Docker Swarm examples](/docs/swarm/examples/).
