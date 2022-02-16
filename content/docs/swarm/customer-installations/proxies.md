---
date: "2018-07-15T04:02:20Z"
title: "Proxies"
description: "Instructions for configuring Replicated in environments with an HTTP Proxy"
weight: "707"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{<legacynotice>}}

The Replicated [install script](/docs/swarm/customer-installations/installing/) provides several configuration options for working with an HTTP proxy.
Passing the `no-proxy` flag to the install script will disable all proxy discovery and configuration.

## Proxy Discovery

Replicated attempts to discover an HTTP proxy by checking the following environment variables in sequence:

* HTTP_PROXY
* http_proxy
* HTTPS_PROXY
* https_proxy

If none of these is set, Replicated will prompt the user to enter a proxy address or confirm that no proxy is required.

## Proxy Configuration

If a proxy address is discovered or set, Replicated will assemble a default list of NO_PROXY addresses including localhost, the address of the `docker0` interface, and the address of the server running the Replicated daemon. Additional addresses can be added with the `additional-no-proxy` parameter, which can be specified multiple times.
Note that this parameter does not accept an IP range in CIDR notation.

```bash
cat swarm-init.sh | sudo bash -s additional-no-proxy=corporate.internal additional-no-proxy=10.128.0.9
```

To prevent errors during image pulls, Replicated will add the `HTTP_PROXY` and `NO_PROXY` environment variables to docker and restart it.

The installer will configure the Replicated daemon and operator containers to run with the `HTTP_PROXY` and `NO_PROXY` variables set in the environment.

Replicated will not add the `HTTP_PROXY` or `NO_PROXY` environment variables to any application service automatically.
Use the [ConsoleSetting](/docs/swarm/packaging-an-application/template-functions/#consolesetting) template function to add `HTTP_PROXY` to the environment of any of your application services.
```yaml
environment:
  - HTTP_PROXY={{repl ConsoleSetting "http.proxy"}}
```
