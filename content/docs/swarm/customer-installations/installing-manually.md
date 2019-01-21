---
date: "2016-07-03T04:02:20Z"
title: "Installing to an Existing Cluster"
description: "Instructions for installing Replicated to an existing Docker Swarm cluster"
keywords: "installing, removing, migrating"
weight: "705"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

The advanced Swarm install requires the host is running Docker with a version between {{< swarm_docker_version_minimum >}} - {{< swarm_docker_version_default >}}.

This method will save the Docker Compose YAML to a file and then run a command using the YAML file as the input. We recommend reading and understanding the Compose file prior to running.

```shell
docker swarm init
curl -sSL -o docker-compose.yml "https://get.replicated.com/docker-compose.yml?swarm_node_address=$(docker info --format '{{.Swarm.NodeAddr}}')"
docker node update --label-add replicated-role=master "$(docker info --format '{{.Swarm.NodeID}}')"
docker network create --driver=overlay --attachable --label=com.docker.stack.namespace=replicated replicated_default
export LC_CTYPE=C;echo "$(head -c 128 /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)" | docker secret create daemon_token -
docker stack deploy -c docker-compose.yml replicated
```

### Airgap

For airgapped installs, the Replicated images will need to be loaded from Docker first, and the `airgap` flag will need to be passed in when generating the compose yaml.

```shell
docker load < replicated.tar
docker load < replicated-ui.tar
docker load < replicated-operator.tar
docker load < cmd.tar
docker load < statsd-graphite.tar
docker load < premkit.tar
docker load < debian.tar
docker load < support-bundle.tar
docker load < retraced.tar
docker load < retraced-postgres.tar
docker load < retraced-nsqd.tar
docker swarm init
curl -sSL -o docker-compose.yml "https://get.replicated.com/docker-compose.yml?airgap=1swarm_node_address=$(docker info --format '{{.Swarm.NodeAddr}}')"
docker node update --label-add replicated-role=master "$(docker info --format '{{.Swarm.NodeID}}')"
docker network create --driver=overlay --attachable --label=com.docker.stack.namespace=replicated replicated_default
export LC_CTYPE=C;echo "$(head -c 128 /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)" | docker secret create daemon_token -
docker stack deploy -c docker-compose.yml replicated
			 
```

### Limitations

The `swarm-init` script includes additional steps to configure docker, proxies, firewalls, the [replicatedctl CLI](/api/replicatedctl/), and aliases to [admin commands](/docs/swarm/packaging-an-application/admin-commands/).

{{< linked_headline "Uninstall Entire Swarm Stack" >}}

To remove the entire Swarm stack run the following script.
{{< warning title="Swarm Uninstall Warning" >}}
This will remove everything including images, volumes, secrets, etc.. Don't do this unless you are planning on completely starting over.
{{< /warning >}}

```shell
docker stack ls | grep replicated_ | awk '{print $1}' | xargs docker stack rm
sleep 5; docker service rm premkit_replicated
sleep 5; docker service rm statsd_replicated
sleep 5; docker volume rm replicated-premkit-data-volume
sleep 5; docker volume ls | grep statsd | awk '{print $2}' | xargs docker volume rm
sleep 5; docker network rm statsd_replicated premkit_replicated
sleep 5; docker stack rm replicated
sleep 5; docker ps -a | grep piper | awk '{print $1}' | xargs docker rm
sleep 10; docker volume ls | grep replicated | awk '{print $2}' | xargs docker volume rm
sleep 5; docker images | grep 'replicated\|premkit' | awk '{print $3}' | xargs docker rmi
sleep 5; docker secret ls | grep 'replicated\daemon_token' | awk '{print $1}' | xargs docker secret rm
sleep 5; docker stack rm retraced
```
