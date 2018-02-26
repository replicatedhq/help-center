---
date: "2018-01-30T04:02:20Z"
title: "Why Replicated and Docker Swarm"
description: "An overview of why it makes sense to ship Replicated with your Docker Swarm application"
weight: "80001"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "guide"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Why Replicated with Docker Swarm" >}}

Docker Swarm enhances the Docker experience by providing users with the ability to turn their Docker instances into a clustered environment, complete with service orchestration, private overlay networking, load balancing, and fault tolerance. For developers writing applications, Docker Swarm also provides service discovery, as well as distributed configuration and secrets management.

Replicated lets developers take advantage of all of the features of Docker Swarm while providing all of the tools necessary to distribute to the enterprise. Instead of using Replicated's built in distributed systems features, it builds upon Swarm to provide applications that are robust, while letting end users configure their applications and run them in isolated on-premise environments.

The Replicated services also benefit from the same fault-tolerance properties present in a Docker Swarm cluster. By running as Docker Swarm stacks and services themselves, Replicated's core components get the same private networking, fault tolerance, and service discovery benefits. Users using the [Integration API](/categories/integration-api/) benefit from this by always having access to the API via Docker Swarm's internal DNS and discovery mechanisms, no matter where in the cluster the Replicated components are running.

{{< linked_headline "Enhancing Docker Swarm Applications with Replicated" >}}


Docker Swarm is a great tool to ship a reusable manifest to orchestrate and schedule an application across a cluster. Replicated provides functionality on top of this, to complement Docker Swarm.

