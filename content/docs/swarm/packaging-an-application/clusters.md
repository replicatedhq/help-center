---
date: "2018-11-16T04:02:20Z"
title: "Clusters"
description: "Specify cluster requirements with the swarm section."
weight: "614"
categories: [ "Packaging a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
nextPage: "swarm/customer-installations/overview.md"
---

{{<legacynotice>}}

In addition to managing [configs](/docs/swarm/packaging-an-application/config-files/) and [secrets](/docs/swarm/packaging-an-application/secrets/), The `swarm` section of the YAML can be used to specify node counts and labels that must be applied to the Swarm cluster where your app is running.

Below is an example of the `swarm` section of an application config YAML.

```yaml
swarm:
  minimum_node_count: 4
  nodes:
  - role: manager
    labels:
      mongo: primary
    minimum_count: 1
  - role: worker
    labels:
      mongo: secondary
    minimum_count: 2
```

{{< linked_headline "Minimum Node Count" >}}

When `minimum_node_count` is specified and there are an insufficient number of nodes in the cluster, the Cluster page of the Replicated Console will render a node count label in orange to indicate that more nodes should be added.
The label will switch to green when the required number of nodes are in the cluster.
Having an insufficient number of nodes will not prevent Replicated from attempting to start the application.

![](/images/guides/swarm/swarm-cluster.png) 

{{< linked_headline "Nodes" >}}

The `swarm.nodes` section is a list of requirements that apply to groups of one or more nodes.
Each group will have a label at the top of the Cluster page that will render in orange or green depending on whether all requirements for the group have been met.

### minimum_count

The number of nodes that should have the role and labels specified

### role

Should be `manager` or `worker`

### labels

A string map.
The Cluster page provides UI for adding and removing labels on individual nodes, equivalent to running `docker node update --label-add` and `docker node update --label-rm` on the command line.

{{< linked_headline "Task Placement" >}}

Use [Swarm's placement constraints and preferences](https://docs.docker.com/engine/swarm/services/#placement-constraints) to assign tasks to specific nodes in a cluster.
This feature can be used to ensure that stateful services depending on volumes are not rescheduled to another node.
When a [snapshot](/docs/snapshots/swarm/) is taken of a volume, Replicated stores the role and labels of the node that volume was on.
This allows Replicated to restore the volume to the correct node for the service when recovering from a snapshot.

```yaml
services:
  mongoreplicas:
    image: mongo:3.2
    ports:
    - "27017"
    volumes:
    - mongodata:/data
    deploy:
      replicas: 2
      mode: replicated
      placement:
        constraints: [node.labels.mongo==secondary]
        preferences:
        - spread: node.labels.mongo
```
