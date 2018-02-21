---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, removing, migrating"
weight: "302"
categories: [ "Distributing a Swarm Application" ]
index: "docs/swarm"
aliases: [docs/distributing-an-application/installing-with-swarm]
gradient: "swarm"
---

We distribute an installation script that can be used to install Replicated into a new or existing Swarm cluster. The cluster does not have to be created at this point, the Replicated install script can install Docker Engine and provision a new Swarm cluster.

{{< linked_headline "Basic install (recommended):" >}}

The basic install will install Docker (as needed) and Replicated. It will save the install script to a file which you can inspect and then run. We recommend reading and understanding the install script prior to running.

```shell
curl -sSL -o install.sh  https://get.replicated.com/swarm-init
sudo bash ./install.sh
```

{{< linked_headline "Quick Install:" >}}

The quick Swarm install will install Docker (as needed) and Replicated. Use this method if you have no need to view/change the installer script and you just want a one-line install.

```shell
curl -sSL https://get.replicated.com/swarm-init | sudo bash
```

{{< linked_headline "Flags:" >}}

The install script can take flags to help your customers with specialized enterprise setups.

| Flag                          | Usage                                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |
| airgap                        | airgap implies "no proxy" and "skip docker"                                                        |
| bypass-storagedriver-warnings | Bypass the storagedriver warning                                                                   |
| daemon-token                  | Authentication token used by operators for automating a cluster installation                       |
| docker-version                | Install a specific version of docker                                                               |
| exclude-subnet                | Prevent docker from creating a network in a subnet. Can be specified multiple times.               |
| http-proxy                    | If present, then use proxy                                                                         |
| log-level                     | If present, this will be the log level of the Replicated daemon (debug, info, or error).           |
| no-docker                     | Skip docker installation                                                                           |
| no-proxy                      | If present, do not use a proxy                                                                     |
| public-address                | The public IP address for stack                                                                    |
| swarm-advertise-addr          | The swarm advertise address                                                                        |
| swarm-listen-addr             | The swarm listen address                                                                           |
| swarm-stack-namespace         | The swarm stack namespace to use                                                                   |
| ui-bind-port                  | The port to bind the UI to                                                                         |
| no-ce-on-ee                   | Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux |

Example quick install with flags:

```shell
curl -sSL https://get.replicated.com/swarm-init | sudo bash -s no-proxy ui-bind-port=8000
```

{{< linked_headline "Advanced Install" >}}

The advanced Swarm install requires the host is running Docker with a version between {{< swarm_docker_version_minimum >}} - {{< swarm_docker_version_default >}}.

This method will save the Docker Compose YAML to a file and then run a command using the YAML file as the input. We recommend reading and understanding the Compose file prior to running.

```shell
docker swarm init
curl -sSL -o docker-compose.yml "https://get.replicated.com/docker-compose.yml?swarm_node_address=$(docker info --format '{{.Swarm.NodeAddr}}')"
docker node update --label-add replicated-role=master "$(docker info --format '{{.Swarm.NodeID}}')"
export LC_CTYPE=C;echo "$(head -c 128 /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)" | docker secret create daemon_token -
docker stack deploy -c docker-compose.yml replicated
```

{{< linked_headline "Installing Behind a Proxy" >}}

Proxy support for Swarm will be included in a future release of Replicated.

{{< linked_headline "Uninstall Entire Swarm Stack" >}}

To remove the entire Swarm stack run the following script.
{{< warning title="Swarm Uninstall Warning" >}}
This will remove everything including images, volumes, secrets, etc.. Don't do this unless you are planning on completely starting over.
{{< /warning >}}

```
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

{{ <callout> }}
To ensure that overlay networking is available in Docker Swarm, make sure the following ports are open between all nodes that act as Swarm nodes:

* TCP port 2377 for cluster management
* TCP and UDP port 7946 for general communication
* UDP port 4789 for overlay network traffic

For more information about overlay networking in Docker Swarm, see the [Docker Swarm overlay networking documentation](https://docs.docker.com/network/overlay/).
{{ </callout> }}
