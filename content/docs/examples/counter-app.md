---
date: "2016-07-03T04:02:20Z"
title: "Counter App Example"
description: "An example of a general-purpose Replicated app definition. This can be used as a starting point as it covers the basic functionality of the Replicated platform."
weight: "402"
categories: [ "Examples" ]
index: "docs"
tags: ["Application YAML"]
---

## Counter App
This is an example of a general-purpose Replicated app definition. You can use this app as a template for your own, as it covers the basic functionality of the Replicated platform.

[View the example-counter project on GitHub](https://github.com/replicatedcom/example-counter)

```yaml
# My Counter App version 1.0
---
replicated_api_version: 1.0.0
name: My Counter App
version: "1.0"
release_notes: The initial release of my counter application.
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  logo_url: "" # TODO: customer_files
  console_title: My Counter App Console
backup:
  enabled: false
cmds:
- name: host_ip
  cmd: publicip
  args: []
components:
- name: DB
  containers:
  - source: public
    image_name: redis
    version: latest
    cmd: "[\"redis-server\", \"--appendonly\", \"yes\"]"
    publish_events:
    - name: Container redis started
      trigger: container-start
      data: ""
      subscriptions:
      - component: App
        container: freighter/counter
        action: start
    config_files: []
    customer_files: []
    env_vars: []
    ports: []
    volumes:
    - host_path: /data
      container_path: /data
      options: ["Z"]
    support_files: []
    restart:
      policy: on-failure
      max: 1000
- name: App
  containers:
  - source: public
    image_name: nginx
    version: latest
    cmd: ""
    publish_events:
    - name: Container nginx started
      trigger: container-start
      data: ""
      subscriptions: []
    config_files:
    - filename: /etc/nginx/conf.d/default.conf
      contents: |
        server {
          listen       80;
          server_name  localhost;

          location / {
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header Host $host;
            proxy_pass http://{{repl NodePrivateIPAddress "App" "freighter/counter" }}:{{repl ContainerExposedPort "App" "freighter/counter" "3000" }};
          }
        }
    customer_files: []
    env_vars: []
    ports:
    - private_port: "80"
      public_port: "80"
      port_type: tcp
      when: ""
    volumes: []
    support_files: []
  - source: public
    image_name: freighter/counter
    version: "1.0"
    cmd: ""
    publish_events:
    - name: Container freighter/counter started
      trigger: container-start
      data: ""
      subscriptions:
      - component: App
        container: nginx
        action: start
    config_files: []
    customer_files: []
    env_vars:
    - name: REDIS_HOST
      static_val: '{{repl NodePrivateIPAddress "DB" "redis" }}'
    - name: REDIS_PORT
      static_val: '{{repl ContainerExposedPort "DB" "redis" "6379" }}'
    ports: []
    volumes: []
    support_files: []
    restart:
      policy: always
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    type: text
    recommended: false
    default: ""
    value_cmd:
      name: host_ip
      value_at: 0
    when: ""
    affix: ""
    required: true
    items: []
```
