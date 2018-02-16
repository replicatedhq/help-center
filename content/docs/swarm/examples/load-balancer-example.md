---
date: "2018-01-06T01:19:20Z"
title: "Load Balancer Example"
description: "An example of load-balancing a clustered app."
weight: "401"
categories: [ "Replicated Scheduler Examples" ]
index: "docs/native sd"
---

## Load-Balanced Counter App
This example runs multiple instances of the [counter app](https://help.replicated.com/docs/examples/counter-app/) on separate nodes.
An nginx container serves as a load balancer to the backend counter containers.

```yaml
name: Load-Balanced Counter App
replicated_api_version: 2.15.0
version: "1.0"
release_notes: The initial release of my load-balanced counter application.
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
      - component: Counter
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
- name: Load Balancer
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
        upstream counter {
          {{repl range $index, $ip := NodePrivateIPAddressAll "Counter" "freighter/counter" }}
          server {{repl $ip}}:3000;
          {{repl end}}
        }
        server {
          listen       80;
          server_name  localhost;

          location / {
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header Host $host;
            proxy_pass http://counter;
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
- name: Counter
  cluster: true
  cluster_host_count:
    min: 1
    max: 2
  containers:
  - source: public
    support_files: []
    image_name: freighter/counter
    version: "1.0"
    cmd: ""
    publish_events:
    - name: Container freighter/counter started
      trigger: container-start
      data: ""
      subscriptions:
      - component: Load Balancer
        container: nginx
        action: start
    config_files: []
    customer_files: []
    env_vars:
    - name: REDIS_HOST
      value: '{{repl NodePrivateIPAddress "DB" "redis" }}'
    - name: REDIS_PORT
      value: '{{repl ContainerExposedPort "DB" "redis" "6379" }}'
    ports:
    - public_port: "3000"
      private_port: "3000"
    volumes: []
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
