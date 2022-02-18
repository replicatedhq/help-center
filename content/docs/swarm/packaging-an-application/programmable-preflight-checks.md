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

{{<legacynotice>}}

The host requirements section of the yaml gives Replicated the ability to analyze system requirements and warn or prevent the user from proceeding with an installation or upgrade. In addition to host requirements, Replicated has the ability to define fully customizable preflight requirements as of version {{< version version="2.30.0" >}}. These programmable requirements provide flexibility to the point that an arbitrary command can be executed by a vendor provided image. See the [commands section](#commands) below for a full list of commands that may be run including examples.

{{< linked_headline "Commands" >}}

Commands will be run to determine the status of a requirement. They return result messages, a status code and an error. Next we will look at examples. For details on the fields please see the [resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

Run a preflight check using your own Service definition.

[Resource spec](/docs/swarm/packaging-an-application/commands-reference/#scheduler)

To begin using custom raw preflight commands, add a Service spec to your release yaml with kind `preflight-swarm`, then configure a `scheduler` command to use it in the `custom_requirements` section of your Replicated yaml.

### Example

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

{{< linked_headline "Example: Running checks on specific nodes" >}}

In certain cases, you may want to limit which nodes certain requirements apply to. You can use `placement` to
limit checks to only run on specific nodes. For example, you may only want to run performance checks on GPU-equipped nodes, but not on general web-app nodes.

```yaml
---
# kind: replicated
custom_requirements:
- id: gpu-node-has-gpu-access
  message: Nodes labeled with role=gpu have GPUs
  details: Nodes labeled with role=gpu must have access to GPU functionality
  results:
    - status: success
      message: GPU performance check succeeded
      condition:
        status_code: 0
    - status: error
      message: Unable to check for GPU on node
      condition:
        status_code: 1
  command:
    id: scheduler
    timeout: 120
    data:
      swarm:
        service: "gpu-checker" # matches the Service name below
        placement:
          constraints:
            - node.labels.role==gpu
---
# kind: preflight-swarm
version: "3"
services:
  gpu-checker:
    image: registry.replicated.com/myapp/gpu_perf_checker:1.0.0
    command: ["/scripts/ensure_gpu.sh"]
```

{{< linked_headline "TCP Dial" >}}

[Resource spec](/docs/swarm/packaging-an-application/commands-reference/#tcp-dial)

### Example

```yaml
custom_requirements:
- id: tcp-dial-github
  message: Can access github.com
  details: Can connect to the address github.com:443.
  results:
  - status: success
    message: Successful connection to the address github.com:443.
    condition:
      status_code: 0
  - status: error
    message: Failed to connect to the address github.com:443.
    condition:
      status_code: 111
  - status: warn
    message:
      default_message: 'Invalid status code {{.status}}. ERROR: {{.error}}'
      args:
        status: '{{repl .StatusCode }}'
        error: '{{repl .Error }}'
    # else error
  command:
    id: tcp_dial
    data:
      addr: 'github.com:443'
      cluster: false
```

{{< linked_headline "HTTP Request" >}}

[Resource spec](/docs/swarm/packaging-an-application/commands-reference/#http-request)

### Example

```yaml
custom_requirements:
- id: http-request-github
  message: Can access github.com
  details: Can connect to address https://github.com.
  results:
  - status: success
    message: Successful connection to the address github.com.
    condition:
      status_code: 200
  - status: error
    message:
      default_message: 'Invalid status code {{.status}}. ERROR: {{.error}}'
      args:
        status: '{{repl .StatusCode }}'
        error: '{{repl .Error }}'
    # else error
  command:
    id: http_request
    data:
      url: 'https://github.com'
      method: 'HEAD'
      cluster: false
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
