---
date: "2016-07-03T04:02:20Z"
title: "Events and Orchestration"
description: "The `events` section of the Replicated YAML allows application vendors to sequence and orchestrate containers based on events from other containers."
weight: "206"
categories: [ "Packaging an Application" ]
tags: [ "Application YAML" ]
index: "docs"
---

Events are provided to help with the startup, orchestration and service discovery between your containers. There are
several reasons to use events in your application yaml:

- When one container must be started and in a running state before another container starts
- When one container depends on the ip address or exposed ports of another container

Replicated provides this functionality in a pub/sub style model. Containers can publish events and list the subscriptions.
When the event is fired, the subscribed event starts.

{{< linked_headline "Published Events" >}}

Containers can publish a message when specific events occur. These events can be subscribed to by other containers in your
application and are designed to be used to help manage the state of your application. Some of these events are published
when a container changes state. These events are published as soon as the Replicated operator reports that
the container state has changed.

When setting up event orchestration use unique event names. When starting a container with constraints from multiple parents, the first event to fire causes the container to start.

{{< linked_headline "Container Started Event" >}}

A `container-start` event is published as soon as the Docker Engine reports that your container is started. The container
may still be initializing and loading, but control of the process has been transferred to the `ENTRYPOINT` or `CMD`
specified in the container. When this event is received, all of the template functions are available for this container.

#### Example of a `container-start` event
```yaml
containers:
  - source: public
    image_name: redis
    version: 3.0.5
    publish_events:
    - name: Redis started
      trigger: container-start
      subscriptions:
      - component: App
        container: app
        action: start
```

{{< linked_headline "Container Stopped Event" >}}

When a `container-stop` event is published, your container has been terminated. It may restart, but the current state is stopped. A
`container-start` event will be published if the container is ever restarted.

{{< linked_headline "Container Port Listen Event" >}}

When a `port-listen` event is published, your container has started accepting connections on an exposed public port. This can be useful
in cases where you need to know when a specific service inside your container is actually up and running. The port you're interested in
is specified in the data field, e.g. `data: "3306"`

### Example of a `port-listen` event
```yaml
containers:
  - source: public
    image_name: mysql
    version: 5.7
    publish_events:
    - name: Mysql ready
      trigger: port-listen
      data: "3306"
      subscriptions:
      - component: App
        container: app
        action: start
```

{{< linked_headline "Container Exec Event" >}}

The `exec` event type is provided to execute arbitrary scripts in a container. This command is attempted immediately after the
container starts, and again at an interval of 2 seconds until it returns 0 or 10 minutes has elapsed. If the command succeeds
with a result code of 0, the event triggers. If not, the command will retry for up to 10 minutes and result in a failure if
the exit code is never 0. The command to be executed is given in the `args` field as the arguments are represented as an array
of strings.

```yaml
containers:
  - source: public
    image_name: mysql
    version: 5.7
    publish_events:
    - name: Minecraft Server Started
      trigger: exec
      args: ["grep", "Done", "/data/logs/latest.log"]
      subscriptions:
      - component: Redis
        container: redis
        action: start
```

{{< linked_headline "Subscribed Events" >}}

Any container can subscribe to events from any other container in your application. A subscribed event must also define an action to
take upon triggering of the event. The only action which is currently available is the start action, which causes the subscribing
container to start.

{{< linked_headline "Timeouts" >}}

{{< version version="2.3.0" >}} The `timeout` parameter must be an integer and indicates the number of seconds an event has to execute before a timeout is initiated.  
If the event does not execute before the timeout is reached, then an error will show in the UI and the event sequence will terminate.  
By default the `timeout` option will be set to 10 minutes.  Setting the `timeout` parameter to -1 will disable the timeout feature.

```yaml
containers:
  -source: public
    image_name: example
    publish_events:
    - name: Some Event Started
      trigger: container-stop
      timeout: 30
      subscriptions:
      - component: DB
        container: mysql
        action: start
```
