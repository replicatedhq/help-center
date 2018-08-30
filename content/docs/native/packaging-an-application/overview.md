---
date: "2016-07-03T04:02:20Z"
title: "Packaging An Application"
description: "The components section of the Replicated YAML defines how the containers will be created and started."
weight: "200"
categories: [ "Packaging a Native Application" ]
aliases: [/docs/native/packaging-an-application/,/categories/packaging-an-application/,/docs/packaging-an-application/yaml-overview/,/tags/development/,/guides/get-to-know-our-features/]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
hideFromList: true
---

This section will walk you through creating the first release, and will document all available options you can use when writing an application for the Replicated Native Scheduler.

Replicated will deploy an application that is defined in a YAML manifest. There are several top level keys (sections) of a Replicated YAML. The YAML spec is defined at [https://github.com/replicatedhq/libyaml/](https://github.com/replicatedhq/libyaml/).

An example, short and valid YAML file for the Replicated Native Scheduler is below. These keys are explained below this YAML.

```yaml
replicated_api_version: {{< replicated_api_version_current >}}
name: My Enterprise Application
properties:
  app_url: http://{{repl ThisNodePrivateIPAddress }}
  console_title: My Enterprise Application
backup:
  enabled: true

# Create a random string to persist over the lifetime of this installation
cmds:
  - name: jwt_hmac_secret
    cmd: random
    args:
      - "128"

# Include a single redis container
components:
  - name: Redis
    containers:
      - source: public
        image_name: redis
        version: 3.2.11

# Define CPU and memory graphs to show in the Admin Console
monitors:
  cpuacct:
    - Redis,redis
  memory:
    - Redis,redis

# Define the config screen to show in the Admin Console
config:
  - name: hostname
    title: Hostname
    description: Ensure this domain name is routable on your network.
    type: text
    required: true
```

{{< linked_headline "Replicated API Version" >}}

The `replicated_api_version` key is required as a top level key in every YAML. This should be set to the minimum version of Replicated required to run this release. The current API version to use is {{< replicated_api_version_current >}}, and the latest version can always be found on our [changelog](https://release-notes.replicated.com). The Replicated Native Scheduler will refuse to install an application requiring a newer version of Replicated than available. This is designed so you can rely on newer features of Replicated in your application.

```yaml
replicated_api_version: {{< replicated_api_version_current >}}
```

{{< linked_headline "Application Basics" >}}

The next section includes some basic information about your application release including the app name.

```yaml
name: My Enterprise Application
```

{{< linked_headline "Detailed App Properties Description" >}}

The properties section includes definitions of some recommended application properties. For a list of available properties see [Application Properties](/docs/native/packaging-an-application/application-properties). You will notice the `{{repl` escape sequence. This invokes a Replicated [template function](/docs/native/packaging-an-application/template-functions) which is a way to pull generated, customer supplied, or other outside values into an installation.

```yaml
properties:
  app_url: http://{{repl ThisNodePrivateIPAddress }}
  console_title: My Enterprise Application
```

{{< linked_headline "Terms" >}}

The terms section allows you to specify content to display to the end-user in the Admin Console prior to installing a license. These terms must be accepted by the end-user before proceeding. This functionality is only available when using the release channel installation script available in the "/channels" screen of the Vendor Portal.

```yaml
terms:
  markdown: |
    # Terms

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non bibendum orci. Sed quis malesuada nisl, id congue ex. Nunc vestibulum eleifend tellus, vel facilisis odio aliquam non. Quisque ut est quis neque tempor feugiat...
```

{{< linked_headline "Snapshots (Backups)" >}}

The snapshots key is available to to enable and configure [Snapshots](/docs/snapshots/). The following example will enable snapshots from the Admin Console, using the default behavior.

```yaml
backup:
  enabled: true
```

{{< linked_headline "CMD" >}}

The Replicated platform has some built in [commands](/docs/config-screen/commands) that make writing your configuration much more powerful. In the `cmds` section you can write commands which you can use later.  These are useful to generate install-time values such as default TLS certs/keys, randomized passwords, other other values.

```yaml
cmds:
  - name: jwt_hmac_secret
    cmd: random
    args:
      - "128"
```

{{< linked_headline "Components" >}}

The [components section](/docs/native/packaging-an-application/components-and-containers/) defines the container runtime environment for your containers when using the Replicated Native Scheduler. This includes everything, including the container image, environment variables, [startup events](/docs/native/packaging-an-application/events-and-orchestration/), [config files](/docs/native/packaging-an-application/config-files/) and [clustering](/docs/packaging-an-application/clustering/).

```yaml
components:
 - name: Redis
    containers:
      - source: public
        image_name: redis
        version: 3.2.11
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

This section is where you can [configure fields to gather input from the user](/docs/native/packaging-an-application/config-screen/). This input can be used to further configure your application. The values here can be used as inputs to environment variables and config files by using the [template functions](/docs/native/packaging-an-application/template-functions/). They can also be tested for validity with [test procs](/docs/native/packaging-an-application/test-procs/). These items will render as a form in the Settings screen of the Replicated admin console.

```yaml
config:
  - name: hostname
    title: Hostname
    description: Ensure this domain name is routable on your network.
    type: text
    required: true
    ...
```

There are other keys, not listed here, that are required to enable advanced functionality. To see more, [continue reading](/docs/native/packaging-an-application/components-and-containers) or head to the [examples of the Replicated Native Scheduler](/docs/native/examples/).
