---
date: "2016-07-03T04:02:20Z"
title: "Nginx Secrets Example"
description: "An example mounting TLS certificates using Docker Swarm secrets"
weight: "405"
categories: [ "Replicated + Swarm Examples" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

{{<legacynotice>}}

## Mounted Secrets Example
This is an example of an Nginx application mounting certificates with Docker Swarm secrets.

```yaml
---
# kind: replicated

replicated_api_version: 2.29.0
name: "Swarm Nginx Example"

properties:
  console_title: Swarm Nginx Example
  app_url: https://{{repl ConsoleSetting "tls.hostname" }}
  logo_url: https://s3.amazonaws.com/poly-screenshots.angel.co/Project/5e/418654/b33617f926fd6c7df2ddab361dd3d60d-original.png

host_requirements:
  cpu_cores: 2
  memory: 8GB
  disk_space: 80GB
  docker_space: 10GB
  replicated_version: ">=2.29.0"

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
  - name: nginx_config
    value: |
      server {
        listen                443 ssl;
        server_name           localhost;
        ssl_certificate       /run/secrets/tls_cert;
        ssl_certificate_key   /run/secrets/tls_key;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
      }
  - name: nginx_index
    value: |
      <p>
        <h1>Hello!</h1>
      </p>
      <p>
        The example app is working.
      </p>
  secrets:
  - name: tls_cert
    value: '{{repl ConsoleSetting "tls.cert.data" }}'
  - name: tls_key
    value: '{{repl ConsoleSetting "tls.key.data" }}'

monitors:
  cpuacct:
  - nginx
  memory:
  - nginx

backup:
  enabled: true

---
# kind: scheduler-swarm
version: "3.3"
services:
  nginx:
    image: nginx:alpine
    ports:
    - 443:443
    configs:
    - source: nginx_config
      target: /etc/nginx/conf.d/site.conf
    - source: nginx_index
      target: /usr/share/nginx/html/index.html
    secrets:
    - tls_cert
    - tls_key

configs:
  nginx_config:
    external: true
  nginx_index:
    external: true

secrets:
  tls_cert:
    external: true
  tls_key:
    external: true
```
