---
date: "2016-07-03T04:02:20Z"
title: "Nginx Secrets"
description: "An example mounting TLS certificates using Docker Swarm secrets"
weight: "405"
categories: [ "Replicated + Swarm Examples" ]
index: "docs/swarm"
gradient: "swarm"
---

## Mounted Secrets Example
This is an example of an Nginx application mounting certificates with Docker Swarm secrets.

```yaml
# kind: replicated

replicated_api_version: 2.9.2
name: "SecretsApp"

properties:
  console_title: "SecretsApp"

config:
- name: ssl
  description: ""
  test_proc:
    display_name: Verify TLS settings
    command: certificate_verify
    timeout: 5
    arg_fields:
    - tls_key
    - tls_certificate
    - hostname
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
  - name: tls_key
    title: Private Key File
    type: file
    required: true
    affix: left
  - name: tls_certificate
    title: Certificate File
    type: file
    required: true
    affix: right

swarm:
  configs:
  - name: nginx_config
    value: |
      server {
        listen                443 ssl;
        server_name           localhost;
        ssl_certificate       /run/secrets/site.crt;
        ssl_certificate_key   /run/secrets/site.key;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
      }
  secrets:
  - name: site.crt
    value: '{{repl ConfigOption "tls_certificate" }}'
  - name: site.key
    value: '{{repl ConfigOption "tls_key" }}'

---
# kind: scheduler-swarm
version: '3.3'
services:
  nginx:
    image: nginx:alpine
    ports:
    - 443:443
    command: "sh -c \"exec nginx -g 'daemon off;\""
    configs:
    - source: nginx_config
      target: /etc/nginx/conf.d/site.conf
    secrets:
    - site.crt
    - site.key

configs:
  nginx_config:
    external: true
  "site.crt":
    external: true
  "site.key":
    external: true
```
