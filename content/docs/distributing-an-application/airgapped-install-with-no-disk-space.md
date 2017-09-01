+++
date = "2017-08-28T00:00:00Z"
lastmod = "2017-08-28T00:00:00Z"
title = "Airgapped Install With No Disk Space"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

```shell
docker logs replicated
ERROR 2016/08/24 22:14:45 airgap/airgap.go:166 write /tmp/airgap-package492843268/images/public/elasticsearch:latest: no space left on device
ERROR 2016/08/24 22:14:45 premkit/log/gin.go:52 [GIN] 500 | 8.964383639s |  | POST    /v0.1/license/airgap
```

When using devicemapper we can easily expand the space of the sparse file that docker uses for storage by modifying the configuration file `/etc/sysconfig/docker-storage` and adding the line `DOCKER_STORAGE_OPTIONS=--storage-opt dm.basesize=XG` replacing the X with the number of gigabytes. Before continuing we should back up any containers we wish to keep and once that is done execute the following:

```shell
service stop docker
rm -rf /var/lib/docker
service start docker
```

### Manual configuration to expand disk space.

Here we create the storage directory and then add a 100G (seek=100) sparse file for the storage pool.

```shell
service stop docker
rm -rf /var/lib/docker
mkdir -p /var/lib/docker/devicemapper/devicemapper
dd if=/dev/zero of=/var/lib/docker/devicemapper/devicemapper/data bs=1G count=0 seek=100
service start docker
It is also possible to use a device for the filesystem which would improve performance, we will have to wipe out "/var/lib/docker" as well so make sure to backup any containers. If it is a physical disk or an additional disk on the Cloud fdisk -l will be useful locating the disk we want to use.
```
```shell
service stop docker
rm -rf /var/lib/docker
ln -s /dev/sdb /var/lib/docker/devicemapper/devicemapper/data
service start docker
```