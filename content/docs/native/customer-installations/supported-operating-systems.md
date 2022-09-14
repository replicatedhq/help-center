---
date: "2016-07-03T04:02:20Z"
title: "Supported Operating Systems"
description: "View the supported operating systems"
keywords:  "operating system, os"
weight: "303"
categories: [ "Managing Customer Installation" ]
index: ["docs/native", "docs"]
aliases: [docs/distributing-an-application/supported-operating-systems,/docs/native/packaging-an-application/supported-operating-systems/]
icon: "replicatedCircle"
---

{{<legacynotice name="native">}}

Replicated supports Linux-based servers that can run current versions of Docker.

Your machine must support docker-engine {{< docker_version_minimum >}} - {{< docker_version_default >}} (with {{< docker_version_default >}} being the recommended version). This also requires a 64-bit distribution with a kernel minimum of 3.10.

Replicated provides an easy install script to work with the following list of operating system.

- Debian 7.7 - 11
- Ubuntu 14.04.5 / 16.04 / 18.04 / 20.04 / 22.04
- Red Hat Enterprise Linux 7.4 - 7.9 / 8.4 - 8.6 / 9.0
- CentOS 7.4 - 7.9 / 8.4 / 9.0
- Amazon Linux 2014.03 / 2014.09 / 2015.03 / 2015.09 / 2016.03 / 2016.09 / 2017.03 / 2017.09 / 2018.03 / 2.0
- Oracle Linux 7.4 - 7.9 / 8.4

Red Hat Enterprise Linux, CentOS and Oracle Linux 6.5+ were supported until end of life on November 30, 2020.

Red Hat Enterprise Linux 9 requires a Red Hat Enterprise subscription to install Docker.

As new operating systems start to support Docker we extend our install script and QA process to include them.  Operating systems that support Docker but are not yet included in the easy install script can still be used using the [manual install instructions](/docs/native/packaging-an-application/installing-manually/).

For detailed requirements and installation guides see the docker installation docs.

