---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated"
description: "Instructions for installing Replicated via the easy install script, manually or behind a proxy. Also includes instructions for uninstalling Replicated."
keywords: "installing, removing, migrating"
weight: "702"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
aliases: [docs/distributing-an-application/installing-with-swarm]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{<legacynotice>}}

We distribute an installation script that can be used to install Replicated on Docker Swarm. The cluster does not have to be created at this point, the Replicated install script can install Docker Engine and provision a new Swarm cluster.

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
| additional-no-proxy            | Address that can be reached without the HTTP proxy                                                |
| airgap                        | airgap implies "no proxy" and "skip docker"                                                        |
| bypass-storagedriver-warnings | Bypass the storagedriver warning                                                                   |
| daemon-token                  | Authentication token used by operators for automating a cluster installation                       |
| docker-version                | Install a specific version of docker                                                               |
| exclude-subnet                | Prevent docker from creating a network in a subnet. Can be specified multiple times.               |
| hard-fail-on-loopback         | If present, aborts the installation if devicemapper on loopback mode is detected                   |
| http-proxy                    | If present, then use proxy                                                                         |
| log-level                     | If present, this will be the log level of the Replicated daemon (debug, info, or error).           |
| no-docker                     | Skip docker installation                                                                           |
| no-proxy                      | If present, do not use a proxy                                                                     |
| public-address                | The public IP address for stack                                                                    |
| swarm-advertise-addr          | The swarm advertise address                                                                        |
| swarm-listen-addr             | The swarm listen address                                                                           |
| swarm-default-address-pool    | A custom default address pool for swarm networks                                                   |
| swarm-stack-namespace         | The swarm stack namespace to use                                                                   |
| ui-bind-port                  | The port to bind the UI to                                                                         |
| no-ce-on-ee                   | Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux |
| tls-cert-path                 | An absolute path to the trusted CA certificates file on the host                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------- |

Example quick install with flags:

```shell
curl -sSL https://get.replicated.com/swarm-init | sudo bash -s no-proxy ui-bind-port=8000
```

{{< linked_headline "Customizing Overlay Networks" >}}

Replicated requires four overlay networks in addition to any overlay networks required by your app.
By default Swarm assigns a /24 subnet from the 10.0.0.0/8 global subnet to each overlay network.
This may interfere with a customer's existing networks.
Use the `exclude-subnet` param to exclude multiple /16 subnets from the 10.0.0.0/8 default subnet.

Customers that need to exclude the entire 10.0.0.0/8 will need to create all networks in advance with assigned subnets.
Create the following networks before installing Replicated, modifying the subnets for the host:

```shell
SUBNET_1=172.20.0.0/16
SUBNET_2=172.21.0.0/16
SUBNET_3=172.22.0.0/16
SUBNET_4=172.23.0.0/16

docker network create --driver=overlay --subnet=$SUBNET_1 --label=com.docker.stack.namespace=replicated replicated_default
docker network create --driver=overlay --subnet=$SUBNET_2 --label=com.docker.stack.namespace=retraced retraced_default
docker network create --driver=overlay --subnet=$SUBNET_3 --label=PremkitReplicatedNamespace=replicated premkit_replicated
docker network create --driver=overlay --subnet=$SUBNET_4 --label=StatsdReplicatedNamespace=replicated statsd_replicated
```

Then install Replicated and your app. Swarm will create the network(s) for your app in the 10.0.0.0/8 subnet.
Run `docker stack ls` to find your application namespace, which will vary for every install.
In the following results `repl5397a011` is the application namespace.

```shell
NAME                SERVICES
repl5397a011        8
replicated          3
retraced            8
```

Run `docker network ls` to find networks in the application namespace.
In the following results `repl5397a011_voteapp` is an application network.

```shell
NETWORK ID          NAME                   DRIVER              SCOPE
ea5f9efd3242        bridge                 bridge              local
3972c6a9cb30        docker_gwbridge        bridge              local
fcc8f63af47a        host                   host                local
k1m7wagciv3h        ingress                overlay             swarm
eeee239be18e        none                   null                local
se30g4p6s8oc        premkit_replicated     overlay             swarm
obu0vkl7u54k        repl5397a011_voteapp   overlay             swarm
2enrenhp40cu        replicated_default     overlay             swarm
dvj7lqoj6j2r        retraced_default       overlay             swarm
spajlqj8i144        statsd_replicated      overlay             swarm
```

Run `docker network inspect <network>` for each application network and note the Labels:

```shell
docker network inspect repl5397a011_voteapp
...
	"Labels": {
		"com.docker.stack.namespace": "repl5397a011"
	},
...
```

Stop the app in the Replicated UI or with the Replicated CLI.
Then run `docker stack rm repl5397a011` to remove your app if the namespace is `repl5397a011'.

Manually create all the required application networks following the pattern above:

```shell
SUBNET_5=172.24.0.0/16

docker network create --driver=overlay --subnet=$SUBNET_5 --label=com.docker.stack.namespace=repl5397a011 repl5397a011_voteapp
```

Finally, restart your app with the Replicated UI or CLI.

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

{{< linked_headline "Security Groups and Firewalls" >}}

To ensure that overlay networking is available in Docker Swarm, make sure the following ports are open between all nodes that act as Swarm nodes:

* TCP port 2377 for cluster management
* TCP and UDP port 7946 for general communication
* UDP port 4789 for overlay network traffic

For more information about overlay networking in Docker Swarm, see the [Docker Swarm overlay networking documentation](https://docs.docker.com/network/overlay/).
