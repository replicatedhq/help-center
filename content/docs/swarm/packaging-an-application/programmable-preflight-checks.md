---
date: "2016-07-03T04:02:20Z"
title: "Programmable Preflight Checks"
description: "A guide to implementing Programmable Preflight Checks to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "609"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
aliases: [/docs/swarm/packaging-an-application/preflight-checks]
---

The host requirements section of the yaml gives Replicated the ability to analyze system requirements and warn or prevent the user from proceeding with an installation or upgrade. In addition to host requirements, Replicated has the ability to define fully customizable preflight requirements as of version {{< version version="2.30.0" >}}. These programmable requirements provide flexibility to the point that an arbitrary command can be executed by a vendor provided image. See the [commands section](#commands) below for a full list of commands that may be run including examples.

{{< linked_headline "Commands" >}}

Commands will be run to determine the status of a requirement. They return result messages, a status code and an error. Next we will look at examples. For details on the fields please see the [resource specification](#resource-specification) section at the bottom of the page.

### Scheduler

Run a preflight check using your own Service definition.

[Resource spec](/docs/swarm/packaging-an-application/commands-reference/#scheduler)

To begin using custom raw preflight commands, add a Service spec to your release yaml with kind `preflight-swarm`, then configure a `scheduler` command to use it in the `custom_requirements` section of your Replicated yaml.

{{< linked_headline "Example" >}}

```yaml
---
# kind: replicated
custom_requirements:
- id: license-file-exists
  message: License file exists
  details: The vendor license file must exist on the host at /etc/vendor-license
  results:
    - status: success
      message: File /etc/vendor-license exists.
      condition:
        status_code: 0
    - status: error
      message: File /etc/vendor-license does not exists.
      condition:
        status_code: 1
  command:
    id: scheduler
    timeout: 15
    data:
      swarm:
        service: "license-checker" # matches the Service name below
        placement:
          constraints:
            - node.labels.isPreflightNode==true
---
# kind: preflight-swarm
version: "3"
services:
  license-checker:
    image: busybox:latest
    volumes:
      - "/etc:/host/etc"
    command: ["test", "-e", "/host/etc/vendor-license"]
```

{{< linked_headline "Resource Specification" >}}

Custom requirements are represented with the followings and properties.

### Requirement

The requirement resource is the primary resource for Programmable Preflight Checks. A requirement represents a single check that is to be preformed during the installation and upgrade steps of the application lifecycle.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | A unique identifier for the requirement |
| message | string or Message | yes | A short description of the requirement |
| details | string or Message | no | A more detailed description of the requirement |
| when | string | no | Will determine if this requirement should be run (evaluated to a boolean value) |
| command | [Command](/docs/swarm/packaging-an-application/commands-reference/#command) | yes | The command that will be run |
| results | array\[[Result](/docs/swarm/packaging-an-application/commands-reference/#result)\] | yes | An array of result objects that when evaluated will determine success or failure |
