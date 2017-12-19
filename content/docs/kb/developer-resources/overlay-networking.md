---
date: "2017-12-19T18:23:24Z"
lastmod: "2017-12-19T18:23:35Z"
title: "Overlay Networking"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Overlay Networking", "Networking", "Firewall"]
---

Understand the various options available for overlay networking with the Replicated scheduler.

## Overview

While the Docker Swarm and Kubernetes schedulers provide a built-in overlay networking option, the native Replicated scheduler requires external tooling to support overlay and private networking.

In environments where this is required, Replicated recommends using Docker Swarm or Kubernetes. This may not be possible with systems running on CentOS6 or RHEL6 on the 2.6 Linux kernel series, which does not support a version of Docker greater than 1.7.1. On these systems, use of the Replicated scheduler is required.

Multiple alternatives exist for meeting the need for overlay and private networking in these environments, detailed below.

### Wireguard

* Kernel level
* Requires pre-provisioning
* Higher kernel version, can probably just use Swarm

### Flannel

* Requires Docker restart
* Offers full container-level overlay network
* Multiple drivers to accomodate different systems

### ZeroTier

* Provides peer-to-peer private networking in environments
* Typically requires an outside Internet connection to reach the controller
* In airgap environments, a ZeroTier controller can be run, but must be accessible by peer machines.
