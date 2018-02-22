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

