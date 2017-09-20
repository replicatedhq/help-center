---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Custom Supplied TLS Certs and Keys"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML"]
---

Most customers will set up a subdomain & DNS for their instance of your application. During
setup you can allow them to identify their hostname and provide custom SSL certs for their
instance (as shown below). The YAML below will allow the user to determine if they’d like
to proceed with the SSL certs provided during the initial setup of the management console,
provide their own, or use self-signed certs that are generated with the cmd in the `cmds`
section. The YAML also writes the active file to the nginx container as a customer file.
for these fields (and ‘test’ buttons for testing
[hostname resolution](/docs/packaging-an-application/test-procs/#resolve-host)
& [cert verification](/docs/packaging-an-application/test-procs/#certificate-verification)
is also provided below.

![Config Screen TLS](/images/post-screens/config-tls.png)

```yaml
# The meta-data about your application
replicated_api_version: 1.3.0
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  console_title: Flask App

# Setting's screen markup
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    value: '{{repl ConsoleSetting "tls.hostname"}}'
    type: text
    test_proc:
      display_name: Check DNS
      command: resolve_host
      arg_fields: []
  - name: mgmt_certs
    type: bool
    title: Use same management console TLS cert/key
    default: "1"
- name: override_certs
  when: mgmt_certs=0
  test_proc:
    display_name: Verify TLS settings
    command: certificate_verify
    timeout: 5
    arg_fields:
    - ssl_cert_file
    - ssl_key_file
    - hostname
  items:
  - name: ssl_key_file
    title: SSL Private Key
    when: mgmt_certs=0
    value: Use self-signed cert
    data_cmd:
      name: ssl_cert
      value_at: 0
    type: file
    affix: left
  - name: ssl_cert_file
    title: SSL Certificate
    when: mgmt_certs=0
    value: Use self-signed cert
    data_cmd:
      name: ssl_cert
      value_at: 1
    type: file
    affix: right

#
# This section uses a flask image from google and nginx image to create a hello world website.
#
components:
- name: webserver
  containers:
  - source: public
    image_name: google/python-hello
    version: latest
    ports:
    - private_port: "8080"
      public_port: "8080"
      port_type: tcp
- name: loadbalancer
  containers:
  - source: public
    image_name: nginx
    version: latest
    ports:
    - private_port: "443"
      public_port: "443"
      port_type: tcp
    - private_port: "80"
      public_port: "80"
      port_type: tcp
    config_files:
    - filename: /opt/certs/server.key
      contents: '{{repl if ConfigOptionEquals "mgmt_certs" "0" }}{{repl ConfigOptionData "ssl_key_file"}}{{repl else}}{{repl ConsoleSetting "tls.key.data"}}{{repl end}}'
    - filename: /opt/certs/server.cert
      contents: '{{repl if ConfigOptionEquals "mgmt_certs" "0" }}{{repl ConfigOptionData "ssl_cert_file"}}{{repl else}}{{repl ConsoleSetting "tls.cert.data"}}{{repl end}}'
    - filename: /etc/nginx/conf.d/default.conf
      contents: |
        upstream web-server {
          # Replace this line with your webserver
          server {{repl NodePrivateIPAddress "webserver" "google/python-hello"}}:8080 fail_timeout=0;
        }

        server {
          listen 0.0.0.0:80;
          return 301 https://$host$request_uri;
        }

        server {
          listen 0.0.0.0:443;
          server_name {{repl ConfigOption "hostname" }};

          ssl on;
          ssl_certificate /opt/certs/server.cert;
          ssl_certificate_key /opt/certs/server.key;

          location / {
            proxy_set_header        Host $host;
            proxy_set_header        X-Real-IP $remote_addr;
            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header        X-Forwarded-Proto $scheme;
            proxy_pass              http://web-server;
          }
        }
#
# This cmd is used to generate the cert & key.
#
cmds:
- name: ssl_cert
  cmd: cert
  args:
  - "2048"
```
