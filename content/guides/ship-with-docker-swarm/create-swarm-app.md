---
date: "2018-01-30T04:02:20Z"
title: "Creating a Replicated + Swarm Application"
description: "Guide to creating a Replicated + Docker Swarm Application"
weight: "8003"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "guide"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

In this section, we will start by creating a Docker Compose application that can run on any Docker Swarm cluster, and end by turning it into a fully functional Replicated release.

{{ < linked_headline "Prerequisites" >}}

To successfully complete this section, you will need the following:

* A machine with Docker (minimum version 1.9.1) installed
* A Replicated account (sign up at [https://vendor.replicated.com/](https://vendor.replicated.com/))

{{ < linked_headline "Create a Docker Compose Application" >}}

Docker Swarm services and stacks are based on Docker Compose, a tool for shipping a suite of services and containers as a single stack. In this example, we will deploy a simple Redis application, but the specification can large scale, enterprise application stacks.

Create a file called `compose.yaml` and add the following to it:

```yaml
version: '3'
services:
  redis:
    image: redis:3.2-alpine
```

This is a minimal example that will create a Redis service with the `redis:3.2-alpine` image. On a computer with Docker running, we can start this by running: `docker-compose -f compose.yaml up`. 

After running this, you'll have a Redis service running in the foreground. Type `ctrl-C` into the terminal to exit. This is a great example, but this is running in Docker (as opposed to Docker Swarm), and is a single instance in the foreground. To move this into something ready for production, let's launch it as a Docker Swarm Service.

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

That's it! We can now look at our service in Swarm via `docker service ls` and interact with it. For many Software as a Service (SaaS) applications, running applications on Swarm provides all of the features required to successfully deploy, distribute, and scale applications. However, when packaging these applications for an on-premise enterprise environment, more is required.

On-premise deployments exist in diverse deployments, and there is no one-size-fits-all approach to these deployments. Replicated provides a shell around Swarm applications that gives application developers and end users the ability to configure their application, integrate with enterprise identity services (such as LDAP or Active Directory), snapshot and restore data services, audit user actions, and more. Replicated applications on Swarm can provide this in normal, internet-facing environments as well as sensitive airgapped environments where access is tightly controlled.

In the next part of this guide, we will create a Replicated release with our Docker Compose specification that can be used to license and ship an on-premise version of our application to end customers.

{{< linked_headline "The Replicated Vendor Portal" >}}

The Replicated Vendor Portal provides tooling necessary to create and deploy applications, license applications to customers, and iterate upon releases of these applications. In this section, we will take the application we created in the prior section and turn it into a ready to release Replicated application. In the next sections, we will then license this application to a customer, and finally iterate upon our application with new releases that can be pulled by or pushed to end customers.

If you require help at any time with these steps, help is available through the [Replicated community](https://help.replicated.com/community) or via email at [contact@replicated.com](mailto:contact@replicated.com). 

{{< linked_headline "Create a New Application" >}}

The first step in porting our application to a Replicated application is to create a new application in the [Vendor Portal](https://vendor.replicated.com. After signing up and activating your account, you will be prompted to create a new application.

After creating your application, you will be redirected to the dashboard for your application. This dashboard is the main location for managing everything related to this application, from releases to customer licenses. The default page for applications is the "Channels" page. In Replicated, a channel represents a stage for your application and is assigned to a release, or version of your application. Through this, your application can map to your organization's release strategy by concurrently providing stable, alpha, beta, and other channels for deployment. These channels, when assigned to your customers, can then update to the latest release for a given channel. When a customer is assigned to multiple channels, they can switch on-demand.

Currently, we have a default channel that we can use to start creating releases. Click the "Releases" item on the left menu to navigate to the release history, which is currently empty. Click the "Create a release" button to start the process of creating our first release.

{{< linked_headline "Create a Release" >}}

Releases in Replicated are created via a YAML document, and this is reflected on the Create a Release page. Front and center is a YAML editor where you define your application's components and how Replicated extends your application to your customer's environment. To the right of the YAML editor is a preview of the configuration items as defined by your Replicated YAML. This will be stubbed in with a hostname field, but you will want to use config items to let end users customize your application to fit natively to their enterprise environments.



<!-- 

{{< linked_headline "Create And Ship A Release" >}}

When starting out with Replicated, the [Vendor Portal](https://vendor.replicated.com) will be the place you spend most of your time. Going through this guide will help you become familiar with the concepts and ideas that are important to be successful shipping on Replicated using the Vendor Portal. If you get stuck or need help with any of these steps, head to our [community](https://help.replicated.com/community) or send us an email to [contact@replicated.com](mailto:contact@replicated.com) and we'll be happy to help.

{{< linked_headline "Create A New Application" >}}

To start, log in (or create an account) on [vendor.replicated.com](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you will be prompted to create a new application. Give it a name like "Docker Swarm + Replicated", select the "Replicated" option, and click "Create application".

![Create Application](/images/guides/swarm/create-app.png)

{{< linked_headline "Releases" >}}

You'll now be sent to the channels page. This is your release channels, where you can stage and promote releases later. We'll come back to this. For now, click on the Releases item on the left menu. You should see a screen that tells you that you haven't yet created any releases. Go ahead and click the "Create a release" button to continue.

![Create Release](/images/guides/swarm/create-release.png)

{{< linked_headline "Create A Release" >}}

Now, you'll see a YAML editor where you can define your application and how Replicated should run it in your customer's environment. We'll cover each section of this sample YAML in these guides.

![Default YAML](/images/guides/swarm/default-yaml.png)

Replicated on Swarm runs Docker Compose stacks, and you are responsible for building and pushing Docker images to any registry (including [one that we created for you](/docs/native/getting-started/docker-registries) when you signed up). For this guide, our application is going to be a Redis service. When done, we'll ship a license file that can be used to install Redis (and support and update it).

Swarm applications differ from Replicated scheduler in that two separate YAML documents exist in a release: the Replicated configuration and the Docker Compose configuration. Both of these exist in the same editor, separated by the YAML multi-doc syntax: `---`. Both documents support the full range of Replicated's template functions.

Find the line in the document that starts with `# kind: scheduler-swarm`. This is the line where the Replicated configuration ends and the Docker Compose configuration begins. Here, we will specify our minimum Docker Compose version, which declares the available features. The [Docker Compose](https://docs.docker.com/compose/compose-file/) reference provides a table of Compose file formats to Docker Engine releases.

For this example, we're going to use Compose file format 3.6. Below the start of the scheduler-swarm file, add the following:

```yaml
version: '3.6'
```

Now that we have defined our version, it's time to add our Redis service. Add the Redis service, with the public redis container image:

```yaml
# kind: scheduler-swarm
services:
  redis:
    image: redis:3.2.11
```

At this point, [here's](https://gist.github.com/gerred/3ec7e311f37e0231b6d2b4a95296a238) what the full release YAML should look like.

Next, click the Save Release button. Once the release is saved, promote it to the Unstable channel to make it available for installation. To do this, click thhe "< Releases" link in the top left and then click the Promote button on the row we just created (it should have Sequence 1). In this popup, check the Unstable channel, and click the Promote button.

![Create Application](/images/guides/native/promote-release.png)

This release is ready to be installed and used in on-premise environments.

In the [next guide](../install), we'll walk through creating a license and installing the redis application on a test server.
 -->
