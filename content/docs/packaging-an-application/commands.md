---
date: "2016-07-03T04:02:20Z"
title: "Commands"
description: "The `cmds` section of the Replicated YAML allows you to leverage the power of external commands within your application configuration."
weight: "208"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML", "CLI Commands" ]
index: "docs"
---

The `cmds` section of the YAML allows you to leverage the power of external commands within your configuration. The sole
purpose of these `cmds` is to generate data for input in the configuration screen.

A command takes a variable number of string arguments and returns an array of strings. We have created an API with some
useful commands. There is also the option to run the command raw. This command will take any `raw` string input and run
the command in an [Ubuntu Trusty container](https://hub.docker.com/r/replicated/cmd/).

The command is run at YAML import time only (during app installation & during app updates).

Below is an example of a command that will generate a private key, a x509 certificate, and a random admin password that
are used as configuration for our app.

```yaml
cmds:
- name: cert_cmd_result
  cmd: cert
  args:
  - "1024"
- name: gen_secret_result
  cmd: random
  args:
  - "32"
```

```yaml
config:
  ...
  items:
  - name: server_private_key
    title: Private key file
    type: file
    hidden: true
    data_cmd:
      name: cert_cmd_result
      value_at: 0
  - name: server_cert
    title: Certificate file
    type: file
    hidden: true
    data_cmd:
      name: cert_cmd_result
      value_at: 1
  - name: server_authority
    title: X.509 Signing Authority
    type: file
    hidden: true
    data_cmd:
      name: cert_cmd_result
      value_at: 2
  - name: admin_password
    title: Generated Admin Password
    type: text
    value_cmd:
      name: gen_secret_result
      value_at: 0
```

# Available Commands
{{< linked_headline "cert" >}}

Generates a private key and x509 certificate pair. The resulting certificate is signed by the master authority belonging to the local instance of the Replicated management container. The authority certificate is also returned by this command so that clients can verify the full X.509 chain.

*Note 1*: The authority certificate is generated the first time the management container is run on a system.

*Note 2*: If you do not pass-in your own domain or IP address values to this command, you'll need to make sure that your server is set up to ignore bad certificate chains.

*Note 2 (long explanation)*: To properly verify the resulting certificate chain, the server using this new certificate must be accessible via the domains or the IP addresses encoded into the cert. You can specify these values as arguments to the cert command. If you don't, default values will be used, and the defaults will almost certainly not match the domain or IP address of the actual machine using the cert.

### Arguments
- Key length: The length in bits of the private key. Default: 1024
- Domains: Comma-separated list of domains for which this certificate is valid. Default: "example.com"
- IP addresses: Comma-separated list of IP addresses for which this certificate is valid. Default: the IP address bound to eth0 on the machine running the Replicated management container.

### Return value
- 0: The new PEM-encoded private key.
- 1: The new PEM-encoded certificate.
- 2: The PEM-encoded cert authority used to sign the new certificate.

```yaml
cmds:
- name: cert_cmd_result
  cmd: cert
  args:
  - "4096"
  - mycounterapp.com
```

{{< linked_headline "publicip" >}}

Gets the public IP address of the agent server.

This function reaches out to an external service to acquire the ip and the result can then be written to a config item.

### Return value
- 0: Public IP address

```yaml
- name: host_ip
  cmd: publicip
  args: []
```

{{< linked_headline "random" >}}

Generates a random string with the default charset [_A-Za-z0-9].

### Arguments
- Length - The length of the string (default 16 characters).
- Charset

### Return value
- 0: Random string

```yaml
- name: hash_key
  cmd: random
  args:
  - "64"
  - "[A-Za-z0-9]"
```

{{< linked_headline "echo" >}}

Echos the first argument.

### Arguments
- String to echo

### Return value
- 0: String

```yaml
- name: hello_world
  cmd: echo
  args:
  - Hello World!
```

{{< linked_headline "system" >}}

{{< version version="1.2.x only" >}} Runs command directly on the machine on which Replicated is running. Be careful as Replicated supports many
linux distributions.

### Arguments
- Variable

### Return value
- 0: String

```yaml
- name: hello_world
  cmd: system
  args:
  - echo
  - Hello World!
```

{{< linked_headline "raw" >}}

Runs command from a bash shell inside an "ubuntu:trusty" docker container. The docker image is hosted on dockerhub at https://hub.docker.com/r/freighter/cmd/

### Arguments
- Variable

### Return value
- 0: String

```yaml
- name: hello_world
  cmd: raw
  args:
  - echo
  - Hello World!
```
