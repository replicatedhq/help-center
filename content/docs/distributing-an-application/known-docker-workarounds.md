---
date: "2018-01-09T20:02:20Z"
title: "Known Docker Installation Issues and Workarounds"
description: "Issues that Replicated has run into with various Docker installations"
keywords: "installing, docker"
weight: "302"
categories: [ "Distributing an Application", "Knowledgebase" ]
index: "docs"
tags: ["Installing Replicated"]
---

## Overlay driver enabled despite being on an unsupported configuration
The default driver chosen by some Docker versions on RHEL and CentOS, overlay, has requirements that are not always satisfied. Overlay and Overlay2 require ftype=1 and a kernel >= 3.18, which not all installations fulfill. If these requirements are not met, we recommend specifying a different storage driver. Devicemapper may be enabled for production by following the [Docker Device Mapper Documentation](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#configure-direct-lvm-mode-for-production).

## Docker 17.12.0-ce on CentOS and RHEL does not install all needed dependencies
On CentOS and RHEL, a needed dependency of libseccomp >= 2.2.1 is not enforced. This is present on 7.4, but not 7.3 or earlier. This can be remedied by running 
```shell
yum install http://mirror.centos.org/centos/7/os/x86_64/Packages/libseccomp-2.3.1-3.el7.x86_64.rpm
```
 as per the [GitHub issue](https://github.com/moby/moby/issues/35906).
