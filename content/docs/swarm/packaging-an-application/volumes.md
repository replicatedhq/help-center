---
date: "2016-07-03T04:02:20Z"
title: "Managing Volumes"
description: "Managing persistence volumes in a Docker Swarm application"
categories: [ "Packaging a Swarm Application" ]
weight: "602"
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Managing Volumes" >}}

Docker Swarm supports both binding a host path as part of a definition for a single service as well as anonymous and named volumes in the [top-level volumes key](https://docs.docker.com/compose/compose-file/#volumes). When scheduling your services, keep in mind that the tasks (containers) backing a service can be deployed on any node in a swarm, and this may be a different node each time the service is updated. It is possible to specify [constraints](https://docs.docker.com/compose/compose-file/#placement) so that the service's tasks are deployed on a node that has the volume present. [Node labels](https://docs.docker.com/engine/reference/commandline/service_create/#specify-service-constraints---constraint) are particularly useful in this case and can be configured via the Replicated browser admin console by your customer. See the example below:

```yaml
---
# kind: replicated

...
swarm:
  nodes:
    - labels:
        role: db
...

---
# kind: scheduler-swarm

version: '3'
services:
  db:
    image: postgres
    deploy:
      placement:
        constraints:
          - node.labels.role == db
```

![Add Labels Screenshot](/images/post-screens/swarm-labels.png)

When using named volumes, Docker will use the default driver configured by the Engine (in most cases, this is the local driver) by default. In addition, Docker can be configured to use a [volume driver](https://docs.docker.com/storage/volumes/) that is multi-host aware. See [this link](https://docs.docker.com/v18.09/engine/extend/legacy_plugins/#volume-plugins) for a list of Docker volume plugins available. Replicated does not add any additional support for volume plugins. This must be configured by your customer at runtime.
