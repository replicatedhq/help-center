---
date: "2018-01-30T04:02:20Z"
title: "Service Discovery"
description: "Learn about available service discovery mechanisms in the Replicated Native Scheduler"
weight: "9003"
index: false
type: "guide"
gradient: "redToRed"
---

{{< linked_headline "Service Discovery Mechanisms in the Replicated Native Scheduler" >}}

The Replicated Native Scheduler achieves service discovery through different means than one is used to when using Kubernetes or Docker Swarm. It does not attempt to support DNS based service discovery and overlay networks. All container communication can occur over the host networking stack for multi-node clusters, or over the docker0 bridge network when deploying to a single node. The Replicated Native Scheduler chooses to use its powerful [internal templating engine](/docs/native/packaging-an-application/template-functions/) to allow you to expose the address of services across a single node or a cluster in whichever way he or she chooses. Template output can be used as input to the service's containers via [environment variables](/docs/native/packaging-an-application/environment_variables/), [config files](/docs/native/packaging-an-application/config-files/), or directly in the [container command](/docs/native/packaging-an-application/starting-and-stopping/).

{{< linked_headline "Using the Host Networking Stack" >}}

When deploying an application to a multi-node cluster, the host networking stack is the best choice for service discovery. Replicated chooses not to use overlay networks to keep our stack minimal and compatible with versions of Docker down to 1.7.1. The address of a container or multiple containers in the host networking stack can be accessed from the template functions [`NodePrivateIPAddress`](/docs/native/packaging-an-application/template-functions/#nodeprivateipaddress) and [`NodePrivateIPAddressAll`](/docs/native/packaging-an-application/template-functions/#nodeprivateipaddressall) respectively. When integrating, you may or may not choose to explicitly bind a container port to the host network. it is most common to expose a port if the service needs to be exposed to the internet or some external service or must access it on a known port. In most other cases the exposed and dynamically bound port can be accessed via the [`ContainerExposedPort`](/docs/native/packaging-an-application/template-functions/#containerexposedport) and [`ContainerExposedPortAll`](/docs/native/packaging-an-application/template-functions/#containerexposedportall) template functions.

{{< linked_headline "Using the docker0 Bridge Network" >}}

When deploying an application to a single node, it is recommended to use the [default bridge network](https://docs.docker.com/network/bridge/) that ships with docker. Using this network increases security through isolation and increases interoperability, reducing complexity in your Replicated integration. Replicated exposes the bridge network address using the template function [`ThisNodeDockerAddress`](/docs/native/packaging-an-application/template-functions/#thisnodedockeraddress). Since all ports are exposed to each other automatically between containers on the bridge network, it is not recommended to expose ports to the host networking stack unless they need to be accessible by an external service.
