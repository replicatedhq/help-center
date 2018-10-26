---
date: "2018-10-26T08:00:00Z"
title: "Commands Reference"
description: "Command reference sub-specification for Programmable Preflight Checks and Test Procedures."
weight: "216"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

# Commands

Commands are a sub-specification of both [Programmable Preflight Checks](/docs/native/packaging-an-application/programmable-preflight-checks/) and [Test Procedures](/docs/native/packaging-an-application/programmable-test-procs/). They return result messages, a status code and an error. Next we will look at examples. For details on the properties please see the [resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

The scheduler command references a container in the components section of the YAML. Standard out
and standard error will be captured and returned via the result message. Any exit code as a result
of the container will be returned via the status code of the command. When the container cannot be
run due to an error, an error will be returned. The container will be run on the nodes as specified
by the component section of the container YAML.

**Id:** `scheduler`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| data | `{replicated: {component: string, container: string}}` | yes | A component and container reference |
| cmd | string | no | Optionally override the container cmd |
| config_files | array[ConfigFile] | no | {{< version version="2.7.0" >}} Additional config files to mount as volumes in the container |
| entrypoint | array[string] | no | Optionally override the container entrypoint |
| ports | array[ExposedPort] | no | Optionally override the container exposed ports |

### Example

```yaml
id: scheduler
timeout: 30 # in seconds, default to 15, -1 == no timeout
data:
  component: DB # the component and container from the components section of the YAML
  container: mysql
  cmd: "[\"sh\", \"-c\", \"'exec mysql -h {{repl ThisNodePrivateIPAddress }} -u myuser -p {{repl ConfigOption \"mysql_pass\" }} yourdatabase < /opt/check-schema-version.sql'\"]"
  config_files:
    - filename: /opt/check-schema-version.sql
  contents: |
    select version from schema limit 1;
  ports: [] # override scheduler container properties
```

{{< linked_headline "Raw" >}}

The raw command is run inside Replicated's [command container](https://hub.docker.com/r/replicated/cmd/).
The clustering and tags properties will determine where the command is run. If clustering is
disabled the command will run on all nodes in the cluster. Additional properties to the raw command
are all that can be specified in the container section of the YAML.

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
id: raw
data:
  cmd: '["test", "-e", "/host/etc/vendor-license"]'
  volumes:
    - host_path: /etc
  container_path: /host/etc
  options: ["ro"]
```

{{< linked_headline "Disk Space Available" >}}

The disk space available command will return the disk space available in bytes. Note that the
result is always a string and must be parsed (e.g. `{{repl .Result | ParseFloat | lt 1e+9 }}` or
`{{repl .Result | ParseFloat | HumanSize }}`). The clustering and tags properties will determine
where the command is run. If cluster is *false* the command will run on all nodes in the
cluster.

**Id:** `disk_space_available`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| dir | string | yes | The directory to check |
| cluster | string | no | Is clustering enabled (evaluated to a boolean value) |
| tags | array[string] | no | Determines nodes where the check is performed when cluster=true |
| conflicts | array[string] | no | Skips nodes with the tag when cluster=true |

### Example

```yaml
id: disk_space_available
data:
  cluster: true
  tags: ["db"]
  dir: /data/mysql
```

{{< linked_headline "Disk Space Total" >}}

The disk space total command will return the disk space available in bytes. Note that the result is
always a string and must be parsed (e.g. `{{repl .Result | ParseFloat | lt 1e+9 }}` or
`{{repl .Result | ParseFloat | HumanSize }}`). The clustering and tags properties will determine
where the command is run. If cluster is *false* the command will run on all nodes in the
cluster.

**Id:** `disk_space_total`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| dir | string | yes | The directory to check |
| cluster | string | no | Is clustering enabled (evaluated to a boolean value) |
| tags | array[string] | no | Determines nodes where the check is performed when cluster=true |
| conflicts | array[string] | no | Skips nodes with the tag when cluster=true |

### Example

```yaml
id: disk_space_total
data:
  cluster: true
  tags: ["db"]
  dir: /data/mysql
```

{{< linked_headline "Port Available" >}}

The port available command will determine whether the port and ip are available for use. Status
code 98 (address already in use) will be returned when unable to bind to the address. The
clustering and tags properties will determine where the command is run. If cluster is *false*
the command will run on all nodes in the cluster.

**Id:** `port_available`

**Status Codes:** 1, 22, 62, 98 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| port | string | yes | The port to check |
| proto | string | no | The protocol, one of `tcp` (default) or `udp` |
| ip | string | no | The ip to bind to, defaults to 0.0.0.0 (will take precedence over interface if set) |
| interface | string | no | The interface to bind to |
| cluster | string | no | Is clustering enabled (evaluated to a boolean value) |
| tags | array[string] | no | Determines nodes where the check is performed when cluster=true |
| conflicts | array[string] | no | Skips nodes with the tag when cluster=true |

### Example

```yaml
id: port_available
data:
  port: '80'
  ip: '{{repl ThisNodePrivateIPAddress }}'
  cluster: true
  tags: ["lb"]
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
