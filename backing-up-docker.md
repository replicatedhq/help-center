+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Backing Up Docker"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

The best method to backup an image is to use [docker save.] (https://docs.docker.com/engine/reference/commandline/save/)

We first want to list all the available images.

```shell
docker images
REPOSITORY                               TAG                 IMAGE ID            CREATED             SIZE
quay.io/replicated/replicated-operator   beta                c5ea60b58967        21 hours ago        33.09 MB
quay.io/replicated/replicated            beta                b590f45795f8        21 hours ago        114.7 MB
quay.io/replicated/replicated-ui         beta                b9a2644a9ad8        7 days ago          59.71 MB
```

Choosing an image to backup.

```shell
mkdir /backups
docker save c5ea60b58967 > /backups/repicated-operator.tar
ls -lah /backups/repicated-operator.tar
-rw-r--r-- 1 root root 33M Aug 25 18:16 /backups/repicated-operator.tar
```

### Restoring docker images.

The best method to restore an image is to use [docker load](https://docs.docker.com/engine/reference/commandline/load/)

```shell
docker load -i /backups/repicated-operator.tar
```

### Backup Docker container

The best method to backup a container (volumes not in this archive) is to use [docker export](https://docs.docker.com/engine/reference/commandline/export/)

```shell
docker ps
CONTAINER ID        IMAGE                                         COMMAND                  CREATED             STATUS              PORTS                              NAMES
35e957cefa39        quay.io/replicated/replicated-ui:beta         "/usr/bin/replicated-"   40 minutes ago      Up 40 minutes       0.0.0.0:8800->8800/tcp             replicated-ui
a68d2d325db1        quay.io/replicated/replicated-operator:beta   "/usr/bin/replicated-"   40 minutes ago      Up 40 minutes                                          replicated-operator
2dc7b9457d3c        quay.io/replicated/replicated:beta            "entrypoint.sh -d"       40 minutes ago      Up 40 minutes       0.0.0.0:9874-9879->9874-9879/tcp   replicated
docker export 35e957cefa39 > /backups/container.tar
ls -lah /backups/container.tar
-rw-r--r-- 1 root root 58M Aug 25 18:35 /backups/container.tar
```

### Restoring docker containers.

The best method to restore a container is to use [docker import](https://docs.docker.com/engine/reference/commandline/import/)

```shell
docker import /backups/container.tar
sha256:052464adb309050247640efa54d3201f918592c1d80d9afcda9f363e91aa81ef
```

### Backup Docker volumes

Please see [backup-restore-or-migrate-data-volumes] (https://docs.docker.com/engine/admin/volumes/volumes/)
