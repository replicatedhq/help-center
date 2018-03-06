---
date: "2016-07-03T04:02:20Z"
title: "Redis"
description: "An example deploying a Swarm application with templated configuration"
weight: "405"
categories: [ "Replicated + Swarm Examples" ]
index: "docs/swarm"
gradient: "swarm"
---

## Redis Example
This is an example of Redis setup with templated configuration. This example will insert some configuration values into the Redis config via templating.

```yaml
# kind: replicated

replicated_api_version: 2.9.2
name: "Redis"

properties:
  console_title: "Redis"

config:
- name: redis
  title: Redis Configuration
  description: Redis Configuration Items
  items:
  - name: redis_timeout
    title: Timeout
    type: text
    required: true

swarm:
  configs:
  - name: redis_config
    value: |
      bind 127.0.0.1
      port 6379
      timeout {{repl ConfigOption "redis_timeout" }}

---
# kind: scheduler-swarm
version: '3.3'
services:
  redis:
    image: redis:3.2-alpine
    command: "redis-server /usr/local/etc/redis/redis.conf"
    configs:
    - source: redis_config
      target: /usr/local/etc/redis/redis.conf

configs:
  redis_config:
    external: true
```
