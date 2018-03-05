---
date: "2018-01-04T00:00:00Z"
lastmod: "2018-01-04T00:00:00Z"
title: "HTTP Proxies"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["HTTP Proxy", "HTTP_PROXY", "No Proxy", "NO_PROXY"]
aliases: [/tags/http-proxy,/tags/http_proxy,/tags/no-proxy,/tags/no_proxy]
---

Replicated does not automatically add an HTTP_PROXY (HTTPS_PROXY, http_proxy, https_proxy) environment variable to your application containers. You can add this via the [environment variables](/docs/packaging-an-application/components-and-containers/#environment-variables) section of the Replicated native scheduler YAML configuration using the [template function](/docs/packaging-an-application/template-functions/) `{{repl Param "HttpProxy"}}`. This template function is available for all schedulers.

Replicated will automatically add NO_PROXY and no_proxy environment variables to your application containers when using the Replicated native scheduler. Replicated will append the `PRIVATE_ADDRESS` of all operators on all hosts and the Docker bridge network gateway address of all hosts as well as anything set in the "replicated" container's NO_PROXY or no_proxy environment variable. These environment variables can be set or modified in the `/etc/(default|sysconfig)/replicated` and `/etc/(default|sysconfig)/replicated-operator` files.

Below is an example `/etc/default/replicated` configuration file with the addition of a NO_PROXY environment variable:

```
RELEASE_CHANNEL=stable
PRIVATE_ADDRESS=10.128.0.8
SKIP_OPERATOR_INSTALL=0
REPLICATED_OPTS=" -e DAEMON_TOKEN=mrHgGWUlBdt1gmDTU7QU3d4xwCFA -e LOG_LEVEL=info -e NODENAME=testing.replicated.internal -e NO_PROXY=somebigbank.internal"
REPLICATED_UI_OPTS=""
```
