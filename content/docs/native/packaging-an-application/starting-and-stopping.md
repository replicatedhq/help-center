---
date: "2016-07-03T04:02:20Z"
title: "Starting and Stopping"
description: "Controlling the startup process of an application and its component containers"
weight: "208"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

{{< linked_headline "CMD" >}}

It's possible to override the `CMD` and/or `ENTRYPOINT` in a container, when using the Replicated Native Scheduler:

```yaml
  - source: public
    image_name: redis
    ...
    entrypoint: '["redis-server"]'
    cmd: '["--appendonly", "yes"]'
```

{{< linked_headline "Ready State" >}}

You can add a health check that Replicated will poll after your containers have all been started. The purpose of this is to report when your application is fully running and ready to be used. Once your application is running, we stop polling this health check and rely on other methods to monitor the status. The timeout parameter allows you to specify (in seconds) how long to keep retrying the command, if it fails. You can use a timeout value of -1 to indicate infinite polling. A timeout of 0 is not supported and causes the default of 10 minutes to be used.

{{< version version="2.7.0" >}} You can specify an optional third argument to set the HTTP timeout. Replicated will use a default timeout of 5 seconds if not specified.

### Available Commands:
- `http_status_code`
- `tcp_port_accept`

```yaml
state:
  ready:
    command: http_status_code
    args:
    - 'http://{{repl NodePublicIPAddress "My Component" "my-web-container" }}/ping'
    - '200'
    - '15'
    timeout: 900
```

This will curl the provided endpoint (`http://{{repl NodePublicIPAddress "My Component" "my-web-container" }}/ping`) until it recieves a status code of 200. Each curl request will have a timeout of 15 seconds, and Replicated will attempt this for 900 seconds before it declares that the app is in a failed state.
