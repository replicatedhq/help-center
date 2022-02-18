---
date: "2018-10-26T08:00:00Z"
title: "Commands Reference"
description: "Command reference sub-specification for Programmable Preflight Checks and Test Procedures."
weight: "611"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

{{<legacynotice>}}

# Commands

Commands are a sub-specification of both [Programmable Preflight Checks](/docs/swarm/packaging-an-application/programmable-preflight-checks/) and [Test Procedures](/docs/swarm/packaging-an-application/programmable-test-procs/). They return result messages, a status code and an error. Next we will look at examples. For details on the properties please see the [resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

The scheduler command references a Service defined in a special YAML file defined with kind `preflight-swarm` or `test-proc-swarm`. Standard out and standard error will be captured and returned via the result message. Any exit code as a result of the Service will be returned via the status code of the command. When the Service cannot be run due to an error, an error will be returned. The Service will be run on the nodes as specified by placement constraints in your compose YAML. All images used by the `scheduler` command Services must be defined in the [images](/docs/swarm/getting-started/docker-registries/#declaring-images) section of your Replicated YAML.

**Id:** `scheduler`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| data | `{ swarm: { service: string, placement: DeployPlacement } }` | yes | Specifies Swarm command reference: service name & [DeployPlacement](https://docs.docker.com/compose/compose-file/#placement) |

### Example

```yaml
id: scheduler
timeout: 15
data:
    swarm:
        service: "license-checker" # matches the Service name in the Compose YAML
        placement:
            constraints:
                - node.labels.isPreflightNode==true
```

{{< linked_headline "TCP Dial" >}}

The tcp dial command will determine whether a connection can be made over tcp to the address
specified. Status code 111 (connection refused) will be returned when unable to connect to the
address. The clustering and tags properties will determine where the command is run. If cluster is
*false* the command will run **only** on the local node.

**Id:** `tcp_dial`

**Status Codes:** 1, 22, 62, 111 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| addr | string | yes | The address to connect to |
| cluster | string | no | Is clustering enabled (evaluated to a boolean value) |
| tags | array[string] | no | Determines nodes where the check is performed when cluster=true |
| conflicts | array[string] | no | Skips nodes with the tag when cluster=true |

### Example

```yaml
id: tcp_dial
data:
  addr: 'github.com:443'
  cluster: false
```

{{< linked_headline "HTTP Request" >}}

The HTTP Request command will make an HTTP request to the URL specified.
The [HTTP Status Code](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) will be returned upon a successful HTTP request.
Status code 111 (connection refused) will be returned when unable to connect to the address.
The clustering and tags properties will determine where the command is run.
If cluster is *false* the command will run **only** on the local node.

**Id:** `http_request`

**Status Codes:** 1, 22, 62, 111 [*](#status-codes) and all [HTTP Status Codes](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| url | string | yes | The HTTP request URL |
| method | string | no | The HTTP request method (default "GET") |
| headers | map[string]array[string] | no | Additional HTTP request headers |
| body | string | no | The HTTP request body |
| insecureSkipVerify | boolean | no | Skip TLS certificate verification |
| noProxy | boolean | no | Bypass any HTTP proxy |

### Example

```yaml
id: http_request
data:
  url: 'https://github.com'
  method: 'HEAD'
  cluster: false
```

# Resource Specification

{{< linked_headline "Command" >}}

The command resource represents the command that is to be run. The command will return messages, a
status code and possibly an error. See the [commands section](#commands) for a list of supported
operations.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | The command id |
| timeout | int | no | Timeout in seconds, default 15 seconds, -1 denotes no timeout |
| data | object | no | The command data |

{{< linked_headline "Result" >}}

The result resource represents the different possible outcomes of the command. A result contains
a status, message and condition. Result are evaluated in order and the first matching result will
determine the requirement status. If no condition properties are specified that result will always
evaluate to true. If no results match the requirement will receive status `error`.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| status | string | yes | One of success, warn or error |
| message | string or Message | yes | A description of the result |
| condition | Condition | no | The condition that must be met |

{{< linked_headline "Condition" >}}

All properties of a condition must be met to determine that condition to be true. The `bool_expr`
property is intended to be evaluated using Replicated templates. This template will receive
the following variables from the result of the command: `.Results` (array of messages), `.Result`
(the first message), `.StatusCode`, `.Error`.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| error | boolean | no | Did the command result in an error? |
| status_code | int | no | The command status code |
| bool_expr | string | no | An expression that can be evaluated and parsed as a boolean |

{{< linked_headline "Message" >}}

A message resource can be localized via the id. It contains a default message that will be
displayed when no localization is present. Messages have arguments that can be substituted into the
text via templates.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | no | The message identifier. Can be used to localize the message. |
| default_message | string | yes | The default message |
| args | map[string]string | no | Arguments to the message |

{{< linked_headline "Status Codes" >}}

| **Code** | **Description** |
|----------|-----------------|
| 1 | Catchall for general errors |
| 22 | Invalid argument |
| 62 | Timeout |
| 98 | Address already in use |
| 111 | Connection refused |
