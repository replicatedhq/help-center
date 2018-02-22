---
date: "2016-07-03T04:02:20Z"
title: "Counter App Example"
description: "An example of a general-purpose Replicated app definition. This can be used as a starting point as it covers the basic functionality of the Replicated platform."
weight: "403"
categories: [ "Replicated + Swarm Examples" ]
index: "docs/swarm"
gradient: "swarm"
---

## Counter App
This is an example of a general-purpose Replicated app definition. You can use this app as a template for your own, as it covers the basic functionality of the Replicated platform.

[View the example-counter project on GitHub](https://github.com/replicatedcom/example-counter)

```yml
# My Counter App version 1.0
---
# kind: replicated
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
images:
- name: redis
  tag: 3.2-alpine
  source: public
- name: nginx
  tag: latest
  source: public
- name: freighter/counter
  tag: "1.0"
  source: public
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
swarm:
  configs:
  - name: nginx_config
    value: |
      server {
        listen       80;
        server_name  localhost;

        location / {
          proxy_set_header X-Real-IP  $remote_addr;
          proxy_set_header X-Forwarded-For $remote_addr;
          proxy_set_header Host $host;
          proxy_pass http://counter:3000}};
        }
      }
    
---
# kind: scheduler-swarm
version: "3.6"
services:
  redis:
    image: redis:3.2-alpine
    command: "[\"redis-server\", \"--appendonly\", \"yes\"]"
    ports:
      - "6379"
    volumes:
      - redis-data:/data
  nginx:
    image: nginx:latest
    ports:
      - 80:80
    configs:
      - source: nginx_config
        target: /etc/nginx/conf.d/default.conf
    depends_on:
      - counter
  counter:
    image: freighter/counter:1.0
    ports:
      - "3000"
    environment:
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      - redis
    deploy:
      mode: replicated
      replicas: 2
    update_config:
      parallelism: 1
      delay: 10s
      failure_action: continue
      monitor: 60s
      max_failure_ratio: 0.3
configs:
  nginx_config:
    external: true
volumes:
  redis-data:
```
