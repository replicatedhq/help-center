---
date: "2016-07-03T04:02:20Z"
title: "GetELK"
description: "An advanced example of the ELK Stack deployed through Replicated with a complex and complete configuration section."
weight: "404"
categories: [ "Examples" ]
index: "docs"
tags: ["Application YAML"]
---

## GetELK
We've wrapped the ELK stack (Elasticsearch, Logstash and Kibana) in Replicated to be easy to configure, install and update. This is a complex example that uses much of the functionality of the Replicated config YAML.


```yaml
replicated_api_version: "2.3.5"
name: ELK
console_support_markdown: |
  ## email: support@getelk.com
properties:
  app_url: http{{repl if ConfigOptionEquals "https_enabled" "1" }}s{{repl end }}://{{repl ConfigOption "hostname" }}
  console_title: getELK Admin Installer
state:
  ready:
    command: tcp_port_accept
    args:
    - '{{repl NodePublicIPAddress "Elasticsearch" "getelk/elasticsearch" }}'
    - "9200"
backup:
  enabled: true
  pause_all: true
monitors:
  cpuacct:
  - Elasticsearch,getelk/elasticsearch
  memory:
  - Elasticsearch,getelk/elasticsearch
components:
- name: Elasticsearch
  containers:
  - source: public
    image_name: getelk/elasticsearch
    version: 1.5.0-3
    publish_events:
    - name: Container getelk/elasticsearch started
      trigger: container-start
      subscriptions:
      - component: Logstash & Kibana
        container: getelk/logstash
        action: start
      - component: Logstash & Kibana
        container: getelk/kibana
        action: start
    config_files:
    - filename: /elasticsearch/config/elasticsearch.yml
      source: github
      owner: getelk
      repo: elasticsearch
      path: files/elasticsearch.yml
      ref: 97c7227ea98c3447540e3462b96da95152d3347d
    ports:
    - private_port: "9200"
      public_port: "9200"
      port_type: tcp
    volumes:
    - host_path: /data
      container_path: /data
      options: ["Z"]
  - source: public
    image_name: getelk/elasticsearch-head
    version: 0.2.0
    publish_events:
    - name: Container elasticsearch-head started
      trigger: container-start
- name: Logstash & Kibana
  containers:
  - source: public
    image_name: getelk/logstash
    version: 1.4.2-7
    publish_events:
    - name: Container getelk/logstash started
      trigger: container-start
    config_files:
    - filename: /opt/conf/logstash.conf
      source: github
      owner: getelk
      repo: logstash
      path: files/logstash.conf
      ref: 1679872e02b828f2cac666b36af1738f1a0b2221
    customer_files:
    - name: logstash_input_lumberjack_cert_file
      filename: /opt/certs/logstash-forwarder.crt
    - name: logstash_input_lumberjack_key_file
      filename: /opt/certs/logstash-forwarder.key
    env_vars:
    - name: AWS_ACCESS_KEY_ID
      value: '{{repl ConfigOption "logstash_input_sqs_aws_access_key" }}'
    - name: AWS_SECRET_ACCESS_KEY
      value: '{{repl ConfigOption "logstash_input_sqs_aws_secret_key" }}'
    ports:
    - private_port: '{{repl ConfigOption "logstash_input_collectd_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_collectd_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_collectd_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_tcp_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_tcp_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_tcp_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_udp_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_udp_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_udp_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_snmp_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_snmp_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_snmp_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_syslog_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_syslog_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_syslog_enabled" "1" }}'
    - private_port: "25826"
      public_port: "25826"
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_collectd_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_ganglia_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_ganglia_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_ganglia_enabled" "1" }}'
    - private_port: '{{repl ConfigOption "logstash_input_lumberjack_port" }}'
      public_port: '{{repl ConfigOption "logstash_input_lumberjack_port" }}'
      port_type: tcp
      when: '{{repl ConfigOptionEquals "logstash_input_lumberjack_enabled" "1" }}'
  - source: public
    image_name: getelk/kibana
    version: 4.0.1-6
    publish_events:
    - name: Container getelk/kibana started
      trigger: container-start
      subscriptions:
      - component: SSL/Authentication
        container: getelk/auth
        action: start
    config_files:
    - filename: /opt/kibana/config/kibana.yml
      source: github
      owner: getelk
      repo: kibana
      path: files/kibana.yml
      ref: af0c9cc784c78d6b4b1a53e4656e612014ae1aa9
- name: SSL/Authentication
  containers:
  - source: public
    image_name: nginx
    version: 1.7.10
    publish_events:
    - name: Container nginx started
      trigger: container-start
    config_files:
    - filename: /etc/nginx/conf.d/default.conf
      source: github
      owner: getelk
      repo: replicated
      path: files/nginx_default.conf
      ref: 3bac048801f32001095d9d372688803e24f41cce
    - filename: /etc/nginx/conf.d/elasticsearch_head.conf
      source: github
      owner: getelk
      repo: elasticsearch-head
      path: files/nginx.conf
      ref: 46809d3c90c9d6f847634a715e999af99d7fc9e9
    customer_files:
    - name: ssl_cert_file
      filename: /opt/certs/server.crt
    - name: ssl_key_file
      filename: /opt/certs/server.key
    ports:
    - private_port: "80"
      public_port: "80"
      port_type: tcp
      when: '{{repl ConfigOptionEquals "http_enabled" "1" }}'
    - private_port: "443"
      public_port: "443"
      port_type: tcp
      when: '{{repl ConfigOptionEquals "https_enabled" "1" }}'
    - private_port: "9100"
      public_port: "9100"
      port_type: tcp
  - source: public
    image_name: getelk/auth
    version: 0.4.0
    publish_events:
    - name: Container getelk/auth started
      trigger: container-start
      subscriptions:
      - component: SSL/Authentication
        container: nginx
        action: start
    config_files:
    - filename: /root/config.yaml
      source: github
      owner: getelk
      repo: replicated
      path: files/auth_config.yaml
      ref: 46658db4b3464d37c1aab5dffe7a1aadc24abe7a
    env_vars:
    - name: REPLICATED_AUTH_PASSWORD
      value: '{{repl ConfigOption "authentication_type_password_password" }}'
    - name: REPLICATED_AUTH_HASHKEY
      value: '{{repl ConfigOption "authentication_type_password_hashkey" }}'
    - name: REPLICATED_AUTH_BLOCKKEY
      value: '{{repl ConfigOption "authentication_type_password_blockkey" }}'
cmds:
- name: hashkey
  cmd: random
  args:
  - "64"
  - _0-9a-zA-Z-
- name: blockkey
  cmd: random
  args:
  - "32"
  - _0-9a-zA-Z-
- name: publicip
  cmd: publicip
  args: []
- name: ssl_cert
  cmd: cert
  args:
  - "4096"
- name: lumberjack_cert
  cmd: cert
  args:
  - "4096"
- name: autogenerated_text
  cmd: echo
  args:
  - auto-generated
config:
- name: hostname
  title: Hostname
  description: Ensure this domain name is routable on your network.
  items:
  - name: hostname
    title: Hostname
    value_cmd:
      name: publicip
      value_at: 0
    type: text
    required: true
    test_proc:
      display_name: Test Hostname Resolution
      command: resolve_host
- name: privacy
  items:
  - name: http_enabled
    title: HTTP Enabled
    help_text: When enabled, Kibana will listen for and respond to requests on the HTTP protocol (port 80).
    default: "0"
    type: bool
  - name: https_enabled
    title: HTTPS Enabled
    help_text: A valid x509 SSL certificate and private key files are required to use this option. The certificate and key must be in PEM format. The key must be *unencrypted*.
    recommended: true
    default: "1"
    type: bool
- name: ssl
  description: ""
  when: https_enabled=1
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
    title: Private Key File
    value_cmd:
      name: autogenerated_text
      value_at: 0
    data_cmd:
      name: ssl_cert
      value_at: 0
    when: https_enabled=1
    type: file
    required: true
    affix: left
  - name: ssl_cert_file
    title: Certificate File
    value_cmd:
      name: autogenerated_text
      value_at: 0
    data_cmd:
      name: ssl_cert
      value_at: 1
    when: https_enabled=1
    type: file
    required: true
    affix: right
  - name: spacer
    type: label
    title: ""
- name: authentication
  title: Authentication
  description: When enabled, Kibana will prevent anonymous connections and prompt for a users to log in.
  items:
  - name: authentication_type
    title: ""
    default: authentication_type_anonymous
    type: select_one
    items:
    - name: authentication_type_anonymous
      title: Anonymous
      type: text
    - name: authentication_type_password
      title: Password
      recommended: true
      type: text
  - name: authentication_type_password_password
    title: Password
    help_text: A shared password which will by used to grant access to Kibana
    when: authentication_type=authentication_type_password
    type: password
    required: true
  - name: authentication_support_email
    title: Support Email Address
    help_text: An email address to display on the login form
    when: authentication_type!=authentication_type_anonymous
    type: text
    required: true
  - name: authentication_type_password_hashkey
    title: Hash Key
    value_cmd:
      name: hashkey
      value_at: 0
    when: authentication_type=authentication_type_password
    type: text
    hidden: true
    required: true
  - name: authentication_type_password_blockkey
    title: Block Key
    value_cmd:
      name: blockkey
      value_at: 0
    when: authentication_type=authentication_type_password
    type: text
    hidden: true
    required: true
- name: inputs
  title: Inputs
  description: Define inputs for logstash to create
  test_proc: null
  items:
  - name: inputs_enabled
    title: Choose which inputs to enable for Logstash.
    help_text: Inputs are how data gets into your Logstash system.  You can enable as many or as few as is relevant to your requirements.
    type: select_many
    items:
    - name: logstash_input_collectd_enabled
      title: collectd
      recommended: true
      default: "1"
      type: bool
    - name: logstash_input_file_enabled
      title: file
      default: "0"
      type: bool
    - name: logstash_input_ganglia_enabled
      title: ganglia
      default: "0"
      type: bool
    - name: logstash_input_generator_enabled
      title: generator
      default: "0"
      type: bool
    - name: logstash_input_log4j_enabled
      title: log4j
      default: "0"
      type: bool
    - name: logstash_input_lumberjack_enabled
      title: lumberjack
      default: "1"
      type: bool
    - name: logstash_input_rabbitmq_enabled
      title: rabbitmq
      default: "0"
      type: bool
    - name: logstash_input_snmp_enabled
      title: snmp
      default: "0"
      type: bool
    - name: logstash_input_sqs_enabled
      title: sqs
      default: "0"
      type: bool
    - name: logstash_input_syslog_enabled
      title: syslog
      recommended: true
      default: "1"
      type: bool
    - name: logstash_input_tcp_enabled
      title: tcp
      default: "0"
      type: bool
    - name: logstash_input_udp_enabled
      title: udp
      default: "0"
      type: bool
    - name: logstash_input_unix_enabled
      title: unix socket
      default: "0"
      type: bool
    - name: logstash_input_websocket_enabled
      title: websocket
      default: "0"
      type: bool
    - name: logstash_input_zeromq_enabled
      title: zeromq
      default: "0"
      type: bool
  - name: logstash_input_collectd_port
    title: Collectd listen port
    default: "25826"
    when: logstash_input_collectd_enabled=1
    type: text
    required: true
  - name: logstash_input_ganglia_port
    title: Ganglia listen port
    default: "8649"
    when: logstash_input_ganglia_enabled=1
    type: text
    required: true
  - name: logstash_input_file_path
    title: File input path
    when: logstash_input_file_enabled=1
    type: text
    required: true
  - name: logstash_input_generator_count
    title: Generator count
    default: "1000"
    when: logstash_input_generator_enabled=1
    type: text
    required: true
  - name: logstash_input_log4j_port
    title: Log4j listen port
    default: "4560"
    when: logstash_input_log4j_enabled=1
    type: text
    required: true
  - name: logstash_input_lumberjack_port
    title: Lumberjack port
    when: logstash_input_lumberjack_enabled=1
    type: text
    required: true
  - name: logstash_input_lumberjack_key_file
    title: Lumberjack private key file
    value_cmd:
      name: autogenerated_text
      value_at: 0
    data_cmd:
      name: lumberjack_cert
      value_at: 0
    when: logstash_input_lumberjack_enabled=1
    type: file
    affix: left
    required: true
  - name: logstash_input_lumberjack_cert_file
    title: Lumberjack cert file
    value_cmd:
      name: autogenerated_text
      value_at: 0
    data_cmd:
      name: lumberjack_cert
      value_at: 1
    when: logstash_input_lumberjack_enabled=1
    type: file
    affix: right
    required: true
  - name: logstash_input_rabbitmq_host
    title: RabbitMQ host
    when: logstash_input_rabbitmq_enabled=1
    type: text
    required: true
  - name: logstash_input_rabbitmq_port
    title: RabbitMQ port
    default: "5672"
    when: logstash_input_rabbitmq_enabled=1
    type: text
    required: true
  - name: logstash_input_snmp_port
    title: SNMP listen port
    default: "1062"
    when: logstash_input_snmp_enabled=1
    type: text
    required: true
  - name: logstash_input_sqs_queue
    title: SQS queue
    when: logstash_input_sqs_enabled=1
    type: text
    required: true
  - name: logstash_input_sqs_aws_access_key
    title: SQS AWS access key id and secret access key
    when: logstash_input_sqs_enabled=1
    type: text
    required: true
  - name: logstash_input_sqs_aws_secret_key
    title: SQS AWS secret access key
    when: logstash_input_sqs_enabled=1
    type: text
    required: true
  - name: logstash_input_syslog_port
    title: Syslog listen port
    default: "514"
    when: logstash_input_syslog_enabled=1
    type: text
    required: true
  - name: logstash_input_tcp_port
    title: TCP listen port
    when: logstash_input_tcp_enabled=1
    type: text
    required: true
  - name: logstash_input_udp_port
    title: UDP listen port
    when: logstash_input_udp_enabled=1
    type: text
    required: true
  - name: logstash_input_unix_path
    title: Path of unix socket
    when: logstash_input_unix_enabled=1
    type: text
    required: true
  - name: logstash_input_websocket_url
    title: Websocket URL
    default: 0.0.0.0
    when: logstash_input_websocket_enabled=1
    type: text
    required: true
  - name: logstash_input_zeromq_address
    title: ZeroMQ address
    default: tcp://*:2120
    when: logstash_input_zeromq_enabled=1
    type: text
    required: true
  - name: logstash_input_zeromq_topology
    title: ZeroMQ topology
    help_text: one of ["pushpull", "pubsub", "pair"]
    when: logstash_input_zeromq_enabled=1
    type: text
    required: true
- name: outputs
  title: Outputs
  description: Define additional outputs for Logstash to create.  By default, your data will be sent to your new, local Elasticsearch cluster.  If you want any additional output, select it here.
  items:
  - name: outputs_enabled
    title: Choose which outputs to enable for Logstash.
    help_text: You can enable as many or as few as is relevant to your requirements. Elasticsearch is enabled by default.
    type: select_many
    items:
    - name: logstash_output_rollbar_enabled
      title: rollbar
      default: "0"
      type: bool
  - name: logstash_output_rollbar_access_token
    title: Rollbar access token
    when: logstash_output_rollbar_enabled=1
    type: text
    required: true
  - name: logstash_output_rollbar_environment
    title: Rollbar project environment
    default: production
    when: logstash_output_rollbar_enabled=1
    type: text
    required: true
  - name: logstash_output_rollbar_level
    title: Rollbar log level
    default: info
    when: logstash_output_rollbar_enabled=1
    type: text
    required: true
  - name: logstash_output_rollbar_format
    title: Rollbar format string
    default: '%{message}'
    when: logstash_output_rollbar_enabled=1
    type: text
    required: true
```
