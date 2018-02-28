---
date: "2018-01-30T04:03:20Z"
title: "Iterating on Releases"
description: "Iterate on Applications by Deploying New Features"
weight: "800004"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "chapter"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Iterating on Releases" >}}

In this guide, we will extend on the Redis service we released in earlier guides. If you haven't created and installed a Redis service via Replicated on Swarm, please start with [Creating a Swarm App](../create-swarm-app) and [Installing](../installing).

{{< linked_headline "Iterating on Releases" >}}

Now that our Redis service is running on a Replicated on Swarm install, it is time to start iterating on and deploying releases for our application. Most applications are composed of multiple service, so let's add an nginx component to our application.

To start iterating on our application, navigate to the Releases dashboard from the Replicated Vendor Portal. On this dashboard, you will see the first release that we created. At the top, click the "Create release" button. Once again, we are on the Create a Release page with the YAML editor that we used in [Creating a Swarm App](../create-swarm-app). This time the content reflects the last release we created, and includes our Redis service.

{{< linked_headline "Add Nginx Container" >}}

Add the following block of YAML under services before the `redis` service:

```yaml
nginx:
  image: nginx:1.13.9-alpine
  ports:
  - 80:80
```

Now our release should look something like this:

```yaml
---
# kind: replicated

name: "myredisapp"

---
# kind: scheduler-swarm
version: '3'
services:
  nginx:
    image: nginx:1.13.9-alpine
    ports:
    - 80:80
  redis:
    image: redis:3.2-alpine
```

This release is now ready. Save it and return to the Releases dashboard.

We can now promote this release and update the instance we created in the [Installing](../installing) section.

{{< linked_headline "Promote Release" >}}

The Release Dashboard shows 2 releases now. We can see that release sequence 1 is pinned to Unstable. Before updates are propagated to channels, we must update the channel to the release we want. Click "Promote" next to release sequence 2, check the "Unstable" channel, and promote the release.

Our release is now the current version for the "Unstable" channel. It's now time to update our application.

{{< linked_headline "Update Application" >}}

The [Installing](../installing) section required us to install Replicated and a license onto a new server. Return to that server's dashboard with our running application. The base dashboard has a "Check Now" button that we can use to discover and update to our new release. Click it, and we will be prompted to install the new release.

After the release is installed, we can verify that multiple containers are running by clicking on the "Cluster" link on the top navigation. There, we should see our "redis" and "nginx" services running. Navigate to your server's IP address on a web browser to see the default nginx welcome page.

{{< linked_headline "Next Steps" >}}

You have successfully created a Docker Swarm app, converted it into a Replicated on Swarm application, and deployed it to a running server running Swarm. From there, you created a new release to make it configurable for your end users.

You're ready to begin customizing this application to meet your needs, or create a new one from scratch. As always, we are here to help you succeed on building your application in Replicated. For more help, check our [community](https://help.replicated.com/community) or our [Swarm documentation](https://help.replicated.com/docs/swarm).
