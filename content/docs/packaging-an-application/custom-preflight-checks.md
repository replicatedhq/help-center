---
date: "2017-01-26T00:00:00Z"
title: "Custom Preflight Checks"
description: "A guide to implementing the Custom Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "214"
categories: [ "Packaging an Application" ]
tags: [ "Preflight Checks", "Application YAML" ]
index: "docs"
---

The host requirements section of the yaml gives Replicated the ability to analyze system
requirements and warn or prevent the user from proceeding with an installation or upgrade. In
addition to host requirements, Replicated has the ability to define fully customizable preflight
requirements as of version {{< version version="2.5.0" >}}. These custom requirements provide
flexibility to the point that an arbitrary command can be executed by a vendor provided image. See
the [commands section](#commands) below for a full list of commands that may be run including
examples.

There are three types of custom preflight checks:

- Run a preflight check using your own container - see [scheduler](#scheduler)
- Run a shell script using ubuntu trusty - see [raw](#raw)
- Use a common preflight check - see [disk_space_available](#disk-space-available), [disk_space_total](#disk-space-total), [port_available](#port-available), [tcp_dial](#tcp-dial)

# Commands

Commands will be run to determine the status of a requirement. They return result messages, a
status code and an error. Next we will look at examples. For details on the fields please see the
[resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

The scheduler command references a container in the components section of the yaml. Standard out
and standard error will be captured and returned via the result message. Any exit code as a result
of the container will be returned via the status code of the command. When the container cannot be
run due to an error, an error will be returned. The container will be run on the nodes as specified
by the component section of the container yaml.

**Id:** `scheduler`

**Status Codes:** 1, 22, 62 [*](#status-codes)

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| source | ReplicatedSchedulerSource<br />`{component: string, container: string}` | yes | A component and container reference |
| cmd | string | no | Optionally override the container cmd |
| config_files | array[ConfigFile] | no | {{< version version="2.7.0" >}} Additional config files to mount as volumes in the container |
| entrypoint | array[string] | no | Optionally override the container entrypoint |
| ports | array[ExposedPort] | no | Optionally override the container exposed ports |

### Example

```yaml
custom_requirements:
- id: check-schema-version
  message: Database schema is at the correct version
  details: The database schema must be at version 2
  when: '{{repl eq AppVersionCurrent 2 }}' # only when upgrading from app version 2
  results:
  - status: success # error, warn, success
    message: Schema is at version 2
    condition: # error, status_code, bool_expr
      status_code: 0 # and
      bool_expr: '{{repl Trim .Result | eq "2" }}' # template vars .StatusCode, .Result, .Results, .Error
  - status: error
    message: # it is possible to localize these messages
      id: custom_requirements[check-schema-version].results[1] # this is the default message id
      default_message: Schema is at incorrect version {{.version}}. Please upgrade your schema to version 2.
      args:
        version: '{{repl Trim .Result }}'
    condition: # error, status_code, bool_expr
      status_code: 0
  - status: warn
    message:
      default_message: Unexpected status {{.status_code}}
      args:
        status_code: '{{repl .StatusCode }}'
    # if no error: true condition is specified the check will fallback to the default error message
  command:
    id: scheduler
    timeout: 30 # in seconds, default to 15, -1 == no timeout
    data:
      component: DB # the component and container from the components section of the yaml
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
custom_requirements:
- id: disk-space-available-mysql
  message: Mysql data directory has sufficient disk space
  details: The /data/mysql directory must have at least 8GB of disk space available.
  when: '{{repl eq AppVersion AppVersionFirst }}' # initial install only
  results:
  - status: success
    message: Directory /data/mysql has enough space available
    condition:
      status_code: 0 # and
      bool_expr: '{{repl Trim .Result | ParseFloat | lt 8e9 }}' # 8GB
  - status: error
    message:
      default_message: Directory /data/mysql has {{.bytes}} space available. Please increase disk space to at least 8GB.
      args:
        bytes: '{{repl ParseFloat .Result | HumanSize }}'
    condition:
      status_code: 0
  - status: warn
    message:
      default_message: 'Invalid status code {{.status}}. ERROR: {{.error}}'
      args:
        status: '{{repl .StatusCode }}'
        error: '{{repl .Error }}'
    # else error
  command:
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
custom_requirements:
- id: disk-space-total-mysql
  message: Mysql data directory has sufficient disk space
  details: The /data/mysql directory must have at least 8GB of disk space total.
  when: '{{repl ne AppVersion AppVersionFirst }}' # upgrade only
  results:
  - status: success
    message: Directory /data/mysql has enough space total
    condition:
      status_code: 0 # and
      bool_expr: '{{repl Trim .Result | ParseFloat | lt 8e9 }}' # 8GB
  - status: error
    message:
      default_message: Directory /data/mysql has {{.bytes}} space total. Please increase disk space to at least 8GB.
      args:
        bytes: '{{repl ParseFloat .Result | HumanSize }}'
    condition:
      status_code: 0
  - status: warn
    message:
      default_message: 'Invalid status code {{.status}}. ERROR: {{.error}}'
      args:
        status: '{{repl .StatusCode }}'
        error: '{{repl .Error }}'
    # else error
  command:
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
custom_requirements:
- id: port-available-lb-80
  message: Load balancer port is available
  when: '{{repl eq AppVersion AppVersionFirst }}' # only on first install
  details: Port 80 must be available for the load balancer.
  results:
  - status: success
    message: Port 80 is available
    condition:
      status_code: 0
  - status: error
    message: Port 80 is not available
    condition:
      status_code: 98
  - status: warn
    message:
      default_message: 'Invalid status code {{.status}}. ERROR: {{.error}}'
      args:
        status: '{{repl .StatusCode }}'
        error: '{{repl .Error }}'
    # else error
  command:
    id: port_available
    data:
      port: '80'
      ip: '{{repl ThisNodePublicIPAddress }}'
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
