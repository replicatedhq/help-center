+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Relocating Docker's Data"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

### Devicemapper Symlink

This method may create issues with image layering, images may take up much more space than they actually should. First determine which file and variable needs modification for your Linux distribution using the information under Best Practice Method.

### Debian/Ubuntu Example

Here we modify `"/etc/default/docker"` and add the variable DOCKER_OPTS along with the path we want for docker's base data directory.

```shell
cat /etc/default/docker
DOCKER_OPTS="-g $(readlink -f /var/lib/docker)"
service docker stop
docker ps -q | xargs docker kill
cd /var/lib/docker/devicemapper/mnt
umount ./*
mv /var/lib/docker /mnt/docker
ln -s /mnt/docker /var/lib/docker
service docker start
```

### Best practice method

The best method for changing Docker's base directory and migrating data to that new base directory is to backup the images, containers, and volumes. After the backups have been created we want to pass the flag "-g" to docker with the absolute path to our new base directory and restart docker.

### Debian/Ubuntu

```shell
cat /etc/default/docker
DOCKER_OPTS="-g /mnt/docker"
docker info | grep "Docker Root"
```

### CentOS 6

```shell
cat /etc/syscofig/docker
other_args="-g /your/storage/dir"
docker info | grep "Docker Root"
```

### CentOS 7

```shell
cat /lib/systemd/system/docker.service
ExecStart=/usr/bin/dockerd -g /mnt/docker
systemctl daemon-reload
systemctl restart docker
docker info | grep "Docker Root"
```