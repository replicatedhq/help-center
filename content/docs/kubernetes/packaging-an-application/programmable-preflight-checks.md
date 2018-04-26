---
date: "2016-07-03T04:02:20Z"
title: "Programmable Preflight Checks"
description: "A guide to implementing Programmable Preflight Checks to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "2609"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
aliases: [/docs/packaging-an-application/preflight-checks-k8s/,/docs/kubernetes/packaging-an-application/preflight-checks]
---

The host requirements section of the yaml gives Replicated the ability to analyze system
requirements and warn or prevent the user from proceeding with an installation or upgrade. In
addition to host requirements, Replicated has the ability to define fully customizable preflight
requirements as of version {{< version version="2.5.0" >}}. These custom requirements provide
flexibility to the point that an arbitrary command can be executed by a vendor provided image. See
the [commands section](#commands) below for a full list of commands that may be run including
examples.

There are two types of custom preflight checks:

- Run a shell script using ubuntu trusty - see [raw](#raw)
- Use a common preflight check - see [api_version](#api-version), [cluster_size](#cluster-size), [no_restore_in_progress](#no-restore-in-progress), [server_version](#server-version), [total_cores](#total-cores), [total_memory](#total-memory), [volume_claim_bound](#volume-claim-bound), [volume_claims](#volume-claims).

# Commands

Commands will be run to determine the status of a requirement. They return result messages, a
status code and an error. Next we will look at examples. For details on the fields please see the
[resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Raw" >}}

The raw command is run inside Replicated's [command container](https://hub.docker.com/r/replicated/cmd/).
The clustering and tags properties will determine where the command is run. If clustering is
disabled the command will run on all nodes in the cluster. Additional properties to the raw command
are all that can be specified in the container section of the yaml.

**Id:** `raw`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| cmd | string | yes | The cmd to be run when executing the container |
| cluster | string | no | Is clustering enabled (evaluated to a boolean value) |
| tags | array[string] | no | Determines nodes where the check is performed when cluster=true |
| conflicts | array[string] | no | Skips nodes with the tag when cluster=true |
| additional... |  | no | all possible container properties |

### Example

```yaml
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
    # else error
  command:
    id: raw
    data:
      cmd: '["test", "-e", "/host/etc/vendor-license"]'
      volumes:
      - host_path: /etc
        container_path: /host/etc
        options: ["ro"]
```

- Use a common preflight check - see [api_version](#api-version), [cluster_size](#cluster-size), [no_restore_in_progress](#no-restore-in-progress), [server_version](#server-version), [total_cores](#total-cores), [total_memory](#total-memory), [volume_claim_bound](#volume-claim-bound), [volume_claims](#volume-claims).

{{< linked_headline "API Version" >}}

{{< linked_headline "Cluster Size" >}}

{{< linked_headline "No Restore in Progress" >}}

{{< linked_headline "Server Version" >}}

{{< linked_headline "Total Memory" >}}

{{< linked_headline "Volume Claim Bound" >}}

{{< linked_headline "Volume Claims" >}}

# Resource Specification

Custom requirements are represented with the followings and properties.

{{< linked_headline "Requirement" >}}

The requirement resource is the primary resource for custom preflight checks. A requirement
represents a single check that is to be preformed during the installation and upgrade steps of the
application lifecycle.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | A unique identifier for the requirement |
| message | string or Message | yes | A short description of the requirement |
| details | string or Message | no | A more detailed description of the requirement |
| when | string | no | Will determine if this requirement should be run (evaluated to a boolean value) |
| command | Command | yes | The command that will be run |
| results | array[Result] | yes | An array of result objects that when evaluated will determine success or failure |

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
