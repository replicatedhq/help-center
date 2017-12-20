---
date: "2017-12-19T18:23:24Z"
lastmod: "2017-12-19T18:23:35Z"
title: "Overlay Networking"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Private Networking", "Networking", "Firewall"]
---

Understand the various options available for overlay networking with the Replicated scheduler.

## Overview

While the Docker Swarm and Kubernetes schedulers provide a built-in overlay networking option, the native Replicated scheduler requires external tooling to support overlay and private networking.

In environments where this is required, Replicated recommends using Docker Swarm or Kubernetes. This may not be possible with systems running on CentOS6 or RHEL6 on the 2.6 Linux kernel series, which does not support a version of Docker greater than 1.7.1. On these systems, use of the Replicated scheduler is required.

Multiple alternatives exist for meeting the need for overlay and private networking in these environments, detailed below.

### Wireguard

[Wireguard](https://www.wireguard.com) provides the lowest level of VPN tunnelling to establish a private network between peers. It is encrypted, easy to configure, and performant, but requires the Linux 3.10 kernel as a minimum. In these environments, Swarm is typically preferred.

Wireguard must be provisioned before Replicated is installed. To use Wireguard, choose the `wg0` interface during the Replicated installation, and ensure that the user's `replicated.yml` uses `wg0` when looking up private IPs for services.

### Flannel

[Flannel](http://github.com/coreos/flannel) provides a simple layer 3 overlay network with multiple backends. This provides a bridged overlay network, allowing containers to be assigned an IP on the overlay network. Flannel requires etcd to be installed on all nodes of the cluster for maintaining cluster state.

To use Flannel, install etcd and flannel on each machine. Once configured, [Docker needs to be configured to use the Flannel](https://github.com/coreos/flannel/blob/master/Documentation/running.md). After Docker has been configured, Replicated can be installed. It is important that, when running Flannel, services refer to each other by their internal Docker IPs rather than attempting to communicate with the host.

### ZeroTier

[ZeroTier](http://zerotier.com/) is a simple virtual networking layer that is easy to configure and run. Users download the ZeroTier agent and connect it into a virtual network of their choosing, providing a private mesh for all connected devices to communicate with each other. ZeroTier requires a controller, and by default, will use the external hosted ZeroTier controller service for networking.

ZeroTier is open source, and in an airgap environment, users can ship or use their own internal ZeroTier Controller, which is available when [compiled from source](https://github.com/zerotier/ZeroTierOne/tree/master/controller). All private nodes must be able to access the private controller, and while this option provides no authentication, access to it can be controlled to only the nodes that require access to the ZeroTier network.