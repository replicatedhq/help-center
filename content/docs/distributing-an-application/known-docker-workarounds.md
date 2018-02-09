---
date: "2018-01-09T20:02:20Z"
date: "2018-01-09T20:02:20Z"
title: "Known Docker Workarounds"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

## Overlay driver enabled despite being on an unsupported configuration
The default driver chosen by some Docker versions on RHEL and CentOS, overlay, has requirements that are not always satisfied. Overlay and Overlay2 require ftype=1 and a kernel >= 3.18, which not all installations fulfill. If these requirements are not met, we recommend specifying a different storage driver. Devicemapper may be enabled for production by following the [Docker Device Mapper Documentation](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#configure-direct-lvm-mode-for-production).

## Docker 17.12.0-ce on CentOS and RHEL does not install all needed dependencies
On CentOS and RHEL, a needed dependency of libseccomp >= 2.2.1 is not enforced. This is present on 7.4, but not 7.3 or earlier. This can be remedied by running
```shell
yum install http://mirror.centos.org/centos/7/os/x86_64/Packages/libseccomp-2.3.1-3.el7.x86_64.rpm
```
 as per the [GitHub issue](https://github.com/moby/moby/issues/35906).

## Docker 17.06.0-ce requires container-selinux >= 2.9 on RHEL
Installing the CentOS container-selinux package and rerunning the Replicated installation script resolves this. The latest version of the package can be found [here](http://mirror.centos.org/centos/7/extras/x86_64/Packages/). As of the 11th of January 2018 this command installed the latest version available:
```shell
yum install http://mirror.centos.org/centos/7/extras/x86_64/Packages/container-selinux-2.33-1.git86f33cd.el7.noarch.rpm
```
Related [stackoverflow question](https://stackoverflow.com/questions/45272827/docker-ce-on-rhel-requires-container-selinux-2-9).
