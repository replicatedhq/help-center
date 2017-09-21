---
date: "2017-03-17T00:00:00Z"
lastmod: "2017-03-17T00:00:00Z"
title: "Devicemapper Warning"
weight: "999999"
categories: [ "Knowledgebase" ]
index: "docs"
kb-sections: ["Troubleshooting"]
---

Running devicemapper in loopback mode is discouraged for production. It has known performance problems and a different storage driver should be used.  See [devicemapper performance considerations](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#other-device-mapper-performance-considerations) and [selecting a storage driver](https://docs.docker.com/engine/userguide/storagedriver/selectadriver/) to understand the available storage drivers and limitations.

| Linux Kernel Version | Docker Version Constraints | Recommended Storage Driver |
|----------------------|----------------|----------------------------|
| < 3.17 |  | Consider upgrading the Linux kernel or using [devicemapper with direct-lvm](https://docs.docker.com/engine/userguide/storagedriver/device-mapper-driver/#configure-direct-lvm-mode-for-production). Using Direct-LVM is Docker's recommended  configuration for production for the devicemapper storage driver. |
| 3.18 - 4.0 |  | Consider moving to overlay but be aware that overlay uses a lot of inodes and so you should therefore use a volume that has a large number of inodes and monitor inode usage. See [overlay and docker performance](https://docs.docker.com/engine/userguide/storagedriver/overlayfs-driver/#overlayfs-and-docker-performance) for details and best practices. |
| 4.0+ | 1.12+ | You have the option to use overlay2 which overcomes the inode issue in overlay and has good performance. |

To bypass the warning add a `bypass-storagedriver-warnings` flag when running the replicated or operator install scripts. For example

```bash
curl -sSL https://get.replicated.com/docker > install
cat install | sudo bash -s bypass-storagedriver-warnings
```
