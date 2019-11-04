---
date: "2016-07-03T04:02:20Z"
title: "Installing Manually"
description: "Instructions for installing Replicated without the quick install script"
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

`docker-compose.yml` accepts arguments listed below.  Note that if `user_id` and `group_id` are not specified, Replicated containers will run with root privileges.

| Flag | Default | Usage |
| ---- | ------- | ----- |
| user_id               |  | User ID that will be used to create Replicated containers. If specified, `group_id` may need to be specified as well. |
| group_id              |  | Group ID that will be used to create Replicted containers. If specified, `user_id` must be specified as well. |
| log_level             | info | Log level for Replicated container.  Possible values are `debug`, `info`, `warn`, `error` |
| public_address        | | The public IP address for stack.  This parameter is optional, but if it is not specified, `NodePublicIP...` template functions will return empty strings. |
| registry_bind_port    | 9874 | Local Replicated registry port. This parameter is usually not specified. |
| swarm_node_address    | | The IP address that will be used as this install's private address. This is a required parameter. |
| swarm_stack_namespace | replicated | Namespace where application stack will be deployed. This parameter is usually not specified. |
| tls_cert_path         | | The location of the trusted CA bundle on the host. |
| ui_bind_port          | 8800 | Replicated UI port.  This parameter is usually not specified. |
| airgap                | 0 | Indicates that this is an airgap install. |

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
curl -sSL -o docker-compose.yml "https://get.replicated.com/docker-compose.yml?airgap=1&swarm_node_address=$(docker info --format '{{.Swarm.NodeAddr}}')"
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
sleep 5; docker stack rm retraced
sleep 5; docker ps -a | grep piper | awk '{print $1}' | xargs docker rm
sleep 10; docker volume ls | grep replicated | awk '{print $2}' | xargs docker volume rm
sleep 5; docker images | grep 'replicated\|premkit' | awk '{print $3}' | xargs docker rmi
sleep 5; docker secret ls | grep 'replicated\daemon_token' | awk '{print $1}' | xargs docker secret rm
```
