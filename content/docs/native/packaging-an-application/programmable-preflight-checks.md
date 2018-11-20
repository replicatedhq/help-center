---
date: "2016-07-03T04:02:20Z"
title: "Programmable Preflight Checks"
description: "A guide to implementing Programmable Preflight Checks to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "214"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
aliases: [/docs/packaging-an-application/preflight-checks/,/tags/preflight-checks/,/docs/native/packaging-an-application/preflight-checks]
---

The host requirements section of the YAML gives Replicated the ability to analyze system
requirements and warn or prevent the user from proceeding with an installation or upgrade. In
addition to host requirements, Replicated has the ability to define fully customizable preflight
requirements as of version {{< version version="2.5.0" >}}. These programmable requirements provide
flexibility to the point that an arbitrary command can be executed by a vendor provided image. See
the [commands section](#commands) below for a full list of commands that may be run including
examples.

There are three types of Programmable Preflight Checks:

- Run a preflight check using your own container - see [scheduler](#scheduler)
- Run a shell script using ubuntu trusty - see [raw](#raw)
- Use a common preflight check - see [disk_space_available](#disk-space-available), [disk_space_total](#disk-space-total), [port_available](#port-available), [tcp_dial](#tcp-dial)

# Commands

Commands will be run to determine the status of a requirement. They return result messages, a
status code and an error. Next we will look at examples. For details on the fields please see the
[resource specification](#resource-specification) section at the bottom of the page.

{{< linked_headline "Scheduler" >}}

[Resource spec](/docs/native/packaging-an-application/commands-reference/#scheduler)

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

[Resource spec](/docs/native/packaging-an-application/commands-reference/#raw)

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

[Resource spec](/docs/native/packaging-an-application/commands-reference/#disk-space-available)

### Example

```yaml
custom_requirements:
- id: disk-space-available-mysql
  message: MySQL data directory has sufficient disk space
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

[Resource spec](/docs/native/packaging-an-application/commands-reference/#disk-space-total)

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

[Resource spec](/docs/native/packaging-an-application/commands-reference/#port-available)

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
      ip: '{{repl ThisNodePrivateIPAddress }}'
      cluster: true
      tags: ["lb"]
```

{{< linked_headline "TCP Dial" >}}

[Resource spec](/docs/native/packaging-an-application/commands-reference/#tcp-dial)

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

Programmable Preflight Checks are represented with the following properties.

{{< linked_headline "Requirement" >}}

The requirement resource is the primary resource for Programmable Preflight Checks. A requirement
represents a single check that is to be preformed during the installation and upgrade steps of the
application lifecycle.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | A unique identifier for the requirement |
| message | string or Message | yes | A short description of the requirement |
| details | string or Message | no | A more detailed description of the requirement |
| when | string | no | Will determine if this requirement should be run (evaluated to a boolean value) |
| command | [Command](/docs/native/packaging-an-application/commands-reference/#command) | yes | The command that will be run |
| results | array\[[Result](/docs/native/packaging-an-application/commands-reference/#result)\] | yes | An array of result objects that when evaluated will determine success or failure |
