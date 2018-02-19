---
date: "2016-07-03T04:02:20Z"
title: "Restart Policies"
description: "Controlling Container Restart Events"
weight: "207"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
---

{{< linked_headline "Restart Policies" >}}

The Replicated Native Scheduler will warn if a container stops, but it doesn't take action to reschedule and/or restart a container, by default. You can rely on Docker's built-in restart policies to control this behavior when using the Replicated Native Scheduler.

Optionally, containers can be configured to be restarted automatically. Currently supported restart policies match those supported natively by Docker. If the policy is not specified, the container will never be restarted. This behavior is equivalent to this setting:

### Never restart
```yaml
  restart:
    policy: never
```

Specifying the following policy will always restart the container regardless of the exit code.

### Always restart
```yaml
  restart:
    policy: always
```

Specifying the following policy will cause the container to be restarted with it terminates with an error. The max parameter is optional. If omitted, the container will be restarted indefinitely.

### Restart on error only

```yaml
  restart:
    policy: on-failure
    max: 1000
```
Please refer to our Examples page for additional component configuration examples.


{{< linked_headline "Startup" >}}

The startup section of a container allows you to specify the CMD value that will be passed to your container when it's started. It's generally good to end your Dockerfile with an ENTRYPOINT command. If you specify a value for the CMD, it will be passed as parameters to the your ENTRYPOINT.

As with all inputs to containers, you have full access to the Replicated template library when creating a CMD value.
