---
date: "2018-02-05T15:07:00Z"
title: "Discourse on Replicated Native"
description: "A fully featured example of Discourse deployed on the Replicated Native scheduler."
weight: "402"
categories: [ "Examples" ]
index: "docs"
tags: ["Application YAML", "Example", "Configuration"]
---

## Discourse

Discourse is open source software for creating a community discussion platform. It is a Ruby on Rails application with a single page app frontend, backed by both Postgres and Redis.

This is a fully featured, commented, single and multiple deployment of Discord on Replicated Native. Individual components are split out and fully configurable. This template can be used for the basis of a new application, or as a model for using different options available when deploying a Replicated release.

### Preflight Checks

This example comes with a large suite of Discourse's recommended preflight checks:

* Port 80 is available
* Port 443 is available
* 5GB free disk space
* 4GB system memory
* 2 CPU cores

### Components

Discourse is made up of four components:

#### Nginx

Nginx is a web server and reverse proxy that is used as the load balancer for this application. It points to at least one upstream Discourse Ruby on Rails instance, and provides TLS termination using application-configured TLS certificates.

#### Discourse

Discourse is the primary Ruby on Rails application used for deployment. In this example, front end assets are pre-compiled and served by the Ruby on Rails application.

#### Postgres

Postgres is the primary database for all data that needs to be persisted. In this example, Postgres can be either run locally or configured as an external database. Backups are snapshotted and restored via Replicated.

#### Redis

Redis is used for caching and state management for application workers. Like Postgres, it can be configured to run on-premise or as an external store. For disaster recovery, Redis is configured in Append-Only File (AOF) mode, with RDB snapshots configured for use with Replicated's snapshot and restore feature.

### Configuration

Users can configure certain aspects of how Discourse is deployed. This includes external databases, but also includes other configuration options:

`Admin Username/Password`

Discourse sets up an initial admin user for the community. This is a required setting and must be configured before the application is started.

`Unicorn Workers`

Discourse depends on Unicorn, a multi-process Rack application server. Performance can be adjusted by changing the number of workers based on the system's available virtual cores.

`Unicorn Sidekiqs`

Discourse depends on Sidekiq, a Ruby-based job runner. In Rails, this is used for asynchronous work such as email delivery. Increasing the number of Sidekiq processes will increase the speed at which the job queue is processed.

`Ruby Global Method Cache Size`

This setting changes Ruby's method cache, changing how many method references can be stored without a lookup. For large applications, this increases memory usage, but can drastically reduce method lookup times. It comes with the smallest recommended setting, but can be changed to match larger systems.

`Ruby Garbage Collector Heap Growth Max Slots`

For a large application with high memory use, this setting increases by performance by allowing garbage collection to grow Ruby's heap by a specified size in each cycle, until it hits the size required to hold everything in memory. This setting increases memory use, but will reduce CPU usage. While by default this example uses the recommended settings, they can be changed to match the underlying system.

`Enable Let's Encrypt`

Discourse comes with native support for Let's Encrypt. This will provide and renew a TLS certificate for Discourse, as long as it can pass the Let's Encrypt authentication challenges. Typically, this requires the application to be publicly accessible, and should be disabled when run in a private environment. Enabling this setting will enable it in Discord, and disable TLS termination in nginx.

### YAML

```yaml
---
# kind: replicated
# apiVersion: v2
replicated_api_version: 2.15.1
name: Discourse
version: ""
release_notes: ""
console_support_markdown: ""
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  logo_url: ""
  console_title: Discourse Native
  bypass_local_registry: false
  shell_alias: ""
identity:
  enabled: ""
  provisioner: ""
  sources: []
state:
  ready: null
backup:
  enabled: ""
  hidden: ""
  pause_all: false
  pause_containers: "false"
  script: ""
  kubernetes:
    pvc_names: []
monitors:
  cpuacct: []
  memory: []
  custom: []
host_requirements:
  replicated_version: '>=2.15.1'
  cpu_cores: 2
  memory: 4GB
  disk_space: 5GB
custom_requirements:
- id: port-available-discourse80
  message:
    default_message: Discourse HTTP port is available
  details:
    default_message: Port 80 must be available for Discourse
  when: '{{repl eq AppVersion AppVersionFirst }}'
  results:
  - status: success
    message:
      default_message: Port 80 is available
    condition:
      status_code: 0
  - status: error
    message:
      default_message: Port 80 is not available
    condition:
      status_code: 98
  command:
    id: port_available
    data:
      cluster: true
      ip: '{{repl ThisNodePublicIPAddress }}'
      port: "80"
      tags:
      - discourse
- id: port-available-discourse443
  message:
    default_message: Discourse HTTP port is available
  details:
    default_message: Port 443 must be available for Discourse
  when: '{{repl eq AppVersion AppVersionFirst }}'
  results:
  - status: success
    message:
      default_message: Port 443 is available
    condition:
      status_code: 0
  - status: error
    message:
      default_message: Port 443 is not available
    condition:
      status_code: 98
  command:
    id: port_available
    data:
      cluster: true
      ip: '{{repl ThisNodePublicIPAddress }}'
      port: "443"
      tags:
      - discourse
# Generate a password for the Postgres Database. This will persist between runs.
cmds:
- name: gen_db_password_result
  cmd: random
  args:
  - "32"
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  test_proc: null
  when: ""
  filters: []
  items:
  - name: hostname
    title: Hostname
    help_text: ""
    recommended: false
    default: ""
    value: '{{repl ConsoleSetting "tls.hostname" }}'
    multi_value: []
    default_cmd: null
    value_cmd: null
    data_cmd: null
    readonly: false
    when: ""
    type: text
    multiple: false
    hidden: false
    affix: ""
    props: {}
    required: false
    test_proc:
      display_name: Check DNS
      command: resolve_host
      timeout: 0
      arg_fields: []
      args: []
      run_on_save: ""
    is_excluded_from_support: false
    filters: []
    items: []
- name: postgres
  title: Postgres
  items:
  - name: use_external_postgres
    title: Use External Postgres
    help_text: When enabled, point Discourse at an external Postgres instance.
    type: bool
    default: "0"
  - name: discourse_db_host
    title: Host
    type: text
    default: ""
    when: use_external_postgres=1
  - name: discourse_db_port
    title: Port
    type: text
    default: ""
    when: use_external_postgres=1
  - name: discourse_db_username
    title: Username
    type: text
    default: ""
    when: use_external_postgres=1
  - name: discourse_db_password
    title: Password
    type: password
    default: ""
    when: use_external_postgres=1
  - name: discourse_db_database
    title: Database
    type: text
    default: ""
    when: use_external_postgres=1
  - name: discourse_db_database
    title: Database
    type: text
    hidden: true
    default: "discourse"
    when: use_external_postgres=0
- name: redis
  title: Redis
  items:
  - name: use_external_redis
    title: Use External Redis
    help_text: When enabled, point Discourse at an external Redis instance.
    type: bool
    default: "0"
admin_commands: []
custom_metrics: []
graphite:
  port: 0
statsd:
  port: 0
components:
- name: Redis
  containers:
  - source: public
    image_name: redis
    version: latest
    when: '{{repl ConfigOptionEquals "use_external_redis" "0" }}'
- name: Postgres
  containers:
  - source: public
    image_name: postgres
    version: 10.1
    when: '{{repl ConfigOptionEquals "use_external_postgres" "0" }}'
- name: Discourse
  containers:
  - source: public
    image_name: discourse/base
    version: 2.0.20180128
    cmd: ['/sbin/boot']
    env_vars:
    - name: RAILS_ENV
      value: production
    - name: UNICORN_WORKERS
      value: 3
    - name: UNICORN_SIDEKIQS
      value: 1
    - name: RUBY_GLOBAL_METHOD_CACHE_SIZE
      value: 131072
    - name: RUBY_GC_HEAP_GROWTH_MAX_SLOTS
      value: 40000
    - name: RUBY_GC_HEAP_INIT_SLOTS
      value: 400000
    - name: RUBY_GC_HEAP_OLDOBJECT_LIMIT_FACTOR
      value: 1.5
    - name: DISCOURSE_DB_HOST
      value: '{{repl ConfigOption "discourse_db_host" }}'
    - name: DISCOURSE_DB_PORT
      value: '{{repl ConfigOption "discourse_db_port" }}'
    - name: DISCOURSE_DB_DATABASE
      value: '{{repl ConfigOption "discourse_db_database" }}'
    - name: DISCOURSE_DB_USERNAME
      value: '{{repl ConfigOption "discourse_db_username" }}'
    - name: DISCOURSE_DB_PASSWORD
      value: '{{repl ConfigOption "discourse_db_password" }}'
```
