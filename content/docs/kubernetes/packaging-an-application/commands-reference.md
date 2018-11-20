---
date: "2018-10-26T08:00:00Z"
title: "Commands Reference"
description: "Command reference sub-specification for Programmable Preflight Checks and Test Procedures."
weight: "2612"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

# Commands

Commands are a sub-specification of both [Programmable Preflight Checks](/docs/kubernetes/packaging-an-application/programmable-preflight-checks/) and [Test Procedures](/docs/kubernetes/packaging-an-application/programmable-test-procs/). They return result messages, a status code and an error. Next we will look at examples. For details on the properties please see the [resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

The scheduler command references a Pod defined in a special YAML file defined with kind `preflight-kubernetes` or `test-proc-kubernetes`. Standard out and standard error will be captured and returned via the result message. Any exit code as a result of the Pod will be returned via the status code of the command. When the Pod cannot be run due to an error, an error will be returned. The Pods can be scheduled to run on all nodes with the `global` mode or on a limited set of Nodes using selectors. All images used by the `scheduler` command Pods must be defined in the [images](/docs/kubernetes/getting-started/docker-registries/#bundling-airgap-images) section of your Replicated YAML.

**Id:** `scheduler`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| data | `{kubernetes: {pod_name: string, node_selector: map[string]string, global: bool}` | yes | A pod reference |

### Example

```yaml
id: scheduler
timeout: 15
data:
  kubernetes:
    pod_name: "license-checker"
    global: true
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
