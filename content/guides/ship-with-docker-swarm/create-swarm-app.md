---
date: "2018-01-30T04:02:20Z"
title: "Creating a Replicated + Swarm Release"
description: "Guide to creating a Replicated + Docker Swarm Release"
weight: "800002"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "chapter"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

In this section, we will start by building a Redis service that can run on any Docker Swarm cluster, and end by turning it into a fully functional Replicated release.

{{< linked_headline "Prerequisites" >}}

To finish this section, you will need:

* A machine with Docker (version 1.13.1 and above) installed
* A Replicated account (sign up at [https://vendor.replicated.com/](https://vendor.replicated.com/))

{{< linked_headline "Create a Docker Compose App" >}}

Docker Compose is a tool for shipping a suite of services and containers as a single stack. Docker Swarm uses stacks and services defined as Docker Compose specs to deploy to a clustered environment. In this example, we will deploy a simple Redis service, but the specification can large scale, enterprise stacks.

Create a file called `docker-compose.yaml` and add a basic Redis stack:

```yaml
version: '3'
services:
  redis:
    image: redis:3.2-alpine
```

This is a minimal example that will create a Redis service with the `redis:3.2-alpine` image. On a computer with Docker running, we can start this by running: `docker-compose up`. 

After running this, you'll have a Redis service running in the foreground. Type `ctrl-C` into the terminal to exit. This is a great example, but runs locally in Docker (as opposed to Docker Swarm), and is a single instance in the foreground. To move this into something ready for production, let's launch it as a Docker Swarm Service.

First, we should turn our Docker instance into a Swarm node. To do this, initialize Swarm:

```shell
$ docker swarm init

Swarm initialized: current node (x1js134wd5td2ast6d3yixoq0) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-2fhvhgsummkv3ryq0721wdw53347wega00re637h4x1zrhpl53-72y223dujrw7ikm64wag2i509 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

Now, we can turn our Compose file into a Stack:

```shell
$ docker stack deploy -c compose.yml my-redis

Creating network my-redis_default
Creating service my-redis_redis
```

In the next part of this guide, we will create a Replicated release with our Docker Compose specification. After this, we will license and ship an on-premise version of our software to end customers.

{{< linked_headline "The Replicated Vendor Portal" >}}

The Replicated Vendor Portal offers tooling necessary to create and deploy software services, license software to customers, and iterate upon our software via releases. In this section, we will take the Redis service we created in the prior section and turn it into a licensable Replicated release. In the next sections, we will create a customer license, install Replicated on Swarm, and run our software in an on-premise environment.

If you require help at any time with these steps, help is available through the [Replicated community](https://help.replicated.com/community) or via email at [contact@replicated.com](mailto:contact@replicated.com). 

{{< linked_headline "Create a New Application" >}}

The first step in porting our software to a Replicated release is to create a new application in the [Vendor Portal](https://vendor.replicated.com). Sign up and activate your account to access the primary dashboard, which prompts you to create a new application. Fill in an application name, select the `Docker Swarm + Replicated` option, and click "Create application" to continue.

![](/images/guides/swarm/create-app.png)

Creating a Replicated application redirects you to a specific dashboard for this application. This dashboard is the main location for managing releases, customer licenses, and channels  releases to customer licenses. The default page for applications is the "Channels" page.

![](/images/guides/swarm/default-screen.png)

New applications have "Stable", "Beta", and "Unstable" channels that we can use to start creating releases. Click the "Releases" item on the left menu to navigate to the release history. Click the "Create a release" button to start the process of creating our first release.

![](/images/guides/swarm/create-release.png)

{{< linked_headline "Create a Release" >}}

YAML is the language we use to define a Replicated application. Front and center is a YAML editor where you define the containers and configuration that comprises your application and how Replicated extends it to your customer's environment. To the right of the YAML editor is a preview of the configuration items as defined by your Replicated YAML. The default document stubs in a hostname field, but you will want to use config items to let end users customize your application to fit natively to their enterprise environments.

![](/images/guides/swarm/default-yaml.png)

In this editor, there will be two YAML documents separated by a page separator: `---`. The first document, annotated with `# kind: replicated`, represents all of the Replicated-specific functionality available to you such as configuration, snapshots, and configuration files. The second document, annotated with `# kind: scheduler-swarm` represents our Docker Compose file defining all of the Swarm services and their configuration.

For now, we won't touch the Replicated configuration, and add our application's Compose specification. Under the `# kind: scheduler-swarm` document, add the application we defined in our prior section:

```yaml
version: '3'
services:
  redis:
    image: redis:3.2-alpine
```

Save the release to return to the Releases page with our new release listed. 

![](/images/guides/swarm/release-list.png)


Next, let's make it available for installation. Click the "Promote" button on the right side of the release, check the "Unstable" channel, and click Promote again.

![](/images/guides/swarm/promote-release.png)

Our release is now ready to install for "Unstable" users of our application.

In the [next guide](../installing), we'll walk through creating a customer, issuing a license, and installing this application on a test server.
