---
date: "2018-01-30T04:02:20Z"
title: "Service Discovery"
description: "Learn about available service discovery mechanisms in the Replicated Native Scheduler"
weight: "9003"
categories: [ "Replicated Scheduler Guide" ]
index: "guides/native"
type: "guide"
gradient: "redToRed"
---

{{< linked_headline "Service Discovery Mechanisms in the Replicated Native Scheduler" >}}

The Replicated Native Scheduler achieves service discovery through different means than one is used to when using Kubernetes or Docker Swarm. It does not attempt to support DNS based service discovery and overlay networks. All container communication can occur over the host networking stack for multi-node clusters, or over the docker0 bridge interface for single node clusters. The Replicated Native Scheduler chooses to use its powerful internal templating engine to allow the integrator to expose the address of services across a single node or a cluster in whichever way he or she chooses. Template output can be used as input to the service containers via environment variables, configuration files, or directly in the command.

{{< linked_headline "Service Discovery over the Host Networking Stack" >}}

When deploying an application to a multi-node cluster, the host networking stack is the best choice for service discovery. The address of a container or multiple containers in the host networking stack can be accessed via the template functions `NodePrivateIPAddress` and `NodePrivateIPAddressAll` respectively. The application integration engineer may or may not choose to explicitly bind a port to the host network via container configuration options. This is most common if the port needs to be exposed to the internet or some external service or must access this service on a known port. In most other cases the exposed and dynamically bound port can be accessed via the `ContainerExposedPort` and `ContainerExposedPortAll` template functions.

{{< linked_headline "Service Discovery over the Docker0 Bridge Network" >}}

...
