---
date: "2016-07-03T04:02:20Z"
title: "Supported Operating Systems"
description: "View the supported operating systems"
keywords:  "operating system, os"
weight: "703"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

Replicated supports Linux-based servers that can run current versions of Docker.

Your machine must support docker-engine {{< swarm_docker_version_minimum >}} - {{< swarm_docker_version_default >}}
(with {{< swarm_docker_version_default >}} being the recommended version). This also requires a 64-bit distribution with a kernel minimum of 3.10.

Replicated provides an easy install script for Swarm that works with the following list of operating systems:

- Debian 7.7 - 10
- Ubuntu 14.04.5 / 16.04 / 18.04 / 20.04
- Red Hat Enterprise Linux 7.4 - 7.9
- CentOS 7.4 - 7.9
- Oracle Linux 7.4 - 7.9

As new operating systems start to support Docker we extend our install script and QA process to include them.  Operating
systems that support Docker but are not yet included in the easy install script can still be used
using the [manual install instructions](/docs/swarm/customer-installations/installing-manually/).

{{< linked_headline "Swarm and RHEL 6.x / CentOS 6.x" >}}

Replicated on Swarm is unsupported on operating systems that depend on Linux 2.x series kernels, such as Red Hat Enterprise Linux 6.5 or CentOS 6.5.

