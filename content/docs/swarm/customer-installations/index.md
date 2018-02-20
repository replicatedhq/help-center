---
date: "2016-07-03T04:02:20Z"
title: "Distributing An Application"
description: "Ship it to your customer"
weight: "301"
categories: [ "Distributing a Swarm Application" ]
index: "docs/swarm"
---

Applications built on top of the Swarm scheduler can be distributed in both on-line and airgapped environments. The quickest way to distribute your Swarm application is to use the Replicated Swarm easy installer. This will install the latest version Docker supported for your customer's environment, and install the services needed for Replicated to run on Swarm.

For custom environments, there is a [manual installation process](#).

```bash
curl -sSL https://get.replicated.com/ | sudo sh
```

Additionally, there are [multiple options for customizing]({{< relref "installing.md" >}}) Docker Swarm installations for different environments.

## Swarm on AWS

By default, we recommend using the `172.31.0.0/16` CIDR range to take advantage using Docker Swarm overlay networks on a VPC. Customers using `10.0.0.0/16` will need to set a different subnet for the Docker Swarm overlay network.

## Operating System Support

Replicated on Swarm supports Docker versions 1.9.1 and above. This version of Docker and Replicated is tested and known to work on:

- Debian 7.7+
- Ubuntu 14.04 / 15.10 / 16.04
- Fedora 21 / 22
- Red Hat Enterprise Linux 7+
- CentOS 7+
- Amazon Linux 2014.03 / 2014.09 / 2015.03 / 2015.09 / 2016.03 / 2016.09 / 2017.03
- Oracle Linux 7+

{{ <callout> }}
Replicated on Swarm is unsupported on operating systems that depend on Linux 2.x series kernels, such as Red Hat Enterprise Linux 6.5 or CentOS 6.5. To use these operating systems, consider using the [Replicated Scheduler](/docs/native/), which has a wider range of Docker version and operating system support.
{{ </callout> }}

## Airgapped Installations

Airgapped installations, which are entirely self-contained, are used in highly sensitive environments where applications need total isolation from external networks. Airgapped Swarm installations ship in entirely self contained networks. In a multi-node environment, all Swarm nodes will need to be on the same network to establish the overlay network required for distributed communication in the cluster.

{{ <callout> }}
To ensure that overlay networking is available in Docker Swarm, make sure the following ports are open between all nodes that act as Swarm nodes:

* TCP port 2377 for cluster management
* TCP and UDP port 7946 for general communication
* UDP port 4789 for overlay network traffic

For more information about overlay networking in Docker Swarm, see the [Docker Swarm overlay networking documentation](https://docs.docker.com/network/overlay/).
{{ </callout> }}
