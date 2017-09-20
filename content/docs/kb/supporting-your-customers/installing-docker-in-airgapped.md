---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Installing Docker in an Airgapped Environment"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Airgapped Environment", "Docker"]
---

Installing a supported version of Docker on a server that does not have any internet access is a simple process, 
but it can require you to install a few dependencies. Most airgapped environments will still have access to yum 
and apt, but they will be pointing to local mirrors.

First we must locate and download the desired package of Docker from one of the official repositories:

*Note: Some distributions do not support newer versions of Docker, Replicated will continue to support a minimum 
1.7.1 version of Docker. We recommend that your customers install the latest 
[Replicated supported](/docs/distributing-an-application/airgapped-installations/#prepare-the-environment) version of 
Docker, see the table below.*

| OS | Highest Docker Version Supported in Replicated |
|---|---|
| [CentOS 7 / RHEL 7](http://yum.dockerproject.org/repo/main/centos/7/Packages/) | {{< docker_version_default >}} |
| [Ubuntu 12.04 (precise) / 14.04 (trusty ) / 15.10 (wily) / 16.04](https://apt.dockerproject.org/repo/pool/main/d/docker-engine/) | {{< docker_version_default >}} |
| [Fedora 22](http://yum.dockerproject.org/repo/main/fedora/22/Packages/) | {{< docker_version_default >}} |
| [Debian 7 (Wheezy) / 8 (Jessie)](https://apt.dockerproject.org/repo/pool/main/d/docker-engine/) | {{< docker_version_default >}} |
| [Ubuntu 15.04 (vivid)](https://apt.dockerproject.org/repo/pool/main/d/docker-engine/) | 1.9.1 |
| [Fedora 21](http://yum.dockerproject.org/repo/main/fedora/21/Packages/) | 1.9.1 |
| [CentOS 6 / RHEL 6](http://yum.dockerproject.org/repo/main/centos/6/Packages/) | 1.7.1 |
| [Ubuntu 14.10 (utopic)](https://apt.dockerproject.org/repo/pool/main/d/docker-engine/) | 1.7.1 |

Once the correct package has been downloaded and transferred to the airgapped machine they need to install it using 
one of the following commands:

## rpm (CentOS/RHEL/Fedora)
```shell
rpm -ivh <package_name>.rpm
```

## dpkg (Ubuntu/Debian)
```shell
dpkg --install <package_name>.deb
```

Different versions of Docker require different dependencies that may have to be manually downloaded/transferred/installed 
to the airgapped machine. Your customers will have to follow the same procedure for each one of those dependencies.

Make sure you take a look at our Docs for the rest of the [Airgapped](/docs/distributing-an-application/airgapped-installations/) 
installation instructions.
