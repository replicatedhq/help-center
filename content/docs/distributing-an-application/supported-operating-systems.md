---
date: "2016-07-03T04:02:20Z"
title: "Supported Operating Systems"
description: "View the supported operating systems"
keywords:  "operating system, os"
index: "docs"
hideFromList: true
categories: [ "Distributing an Application" ]
---

Replicated supports Linux-based servers that can run current versions of Docker.

Your machine must support docker-engine {{< docker_version_minimum >}} - {{< docker_version_default >}}
(with {{< docker_version_default >}} being the recommended version). This also requires a 64-bit distribution with a
kernel minimum of 3.10.

On some operating systems including CentOS 6 and RHEL 6, features have been backported into the kernel to allow Docker to run. It is not recommend to run Docker under a 2.x kernel and support for it is best-effort based. In the docker logs you may see the following:

```
time="2017-01-01T00:00:00.000000000-00:00" level=warning msg="You are running linux kernel version 2.6.32-573.8.1.el6.x86_64, which might be unstable running docker. Please upgrade your kernel to 3.10.0."
```

Replicated provides an easy install script to work with the the following list of operating system.

- Debian 7.7+
- Ubuntu 14.04 / 15.10 / 16.04
- Fedora 21 / 22
- Red Hat Enterprise Linux 6.5+
- CentOS 6+
- Amazon Linux 2014.03 / 2014.09 / 2015.03 / 2015.09 / 2016.03 / 2016.09 / 2017.03
- Oracle Linux 6.5+

As new operating systems start to support Docker we extend our install script and QA process to include them.  Operating
systems that support Docker but are not yet included in the easy install script can still be used
using the [manual install instructions](/docs/distributing-an-application/installing-manually/).

For detailed requirements and installation guides see the docker installation docs.

