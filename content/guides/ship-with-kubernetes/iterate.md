---
date: "2018-01-30T04:02:20Z"
title: "Iterating and Updating"
description: "A guide to walk you through iterating and updating a Kubernetes release in Replicated"
weight: "11003"
categories: [ "Kubernetes Guide" ]
index: "guides/kubernetes"
type: "chapter"
gradient: "kubernetes"
icon: "replicatedKubernetes"
nextPage: "kubernetes/getting-started/overview.md"
---

# Iterate and Ship Updates

This guide will walk you through making a change and shipping an update to an application after it's been deployed. It's assumed you have the environment from parts 1 and 2 of this guide ([creating a release](../create-release) and [installing](../install)). If you haven't completed these guides, head back and finish them first.

Now that we have a Kubernetes cluster running, a common task is to ship updates. Our application is simple, but we can ship an update. The default Kubernetes example we used isn't using the standard Redis image from Docker Hub. Let's update this application to use it.

{{< linked_headline "Create a New Release" >}}

On the Releases page of the [Vendor Portal](https://vendor.replicated.com), click the Create Release link on top. Once again, you'll be taken to a YAML editor that shows the contents of the most recently created release. This gives us everything we've done so far, and our task now is to only write the changes needed to update Redis.

{{< linked_headline "Change Redis Tag" >}}

In the release YAML, find the redis image to change. The line in the YAML looks like:

```yaml
image: k8s.gcr.io/redis:e2e  # or just image: redis
```

To change this to a known, official Redis image:

```yaml
image: redis:3.2.11
```

Just replace the `k8s.gcr.io` reference with the `redis` reference to continue.

{{< linked_headline "Save and Promote The Release" >}}

Following the same process we did before, click the Save Release button, go back one screen and click Promote. Choose the Unstable branch again to promote release 2 to this branch. That's all that's needed to ship an update to a channel. Now, any license installed from the "Unstable" channel will start with this new release, and any installation already running will be prompted to update to the new release.

{{< linked_headline "Update the Test Server" >}}

To install and test this new release, we need to connect to the Admin Console dashboard on port :8800 using a web browser. At this point, it will likely show that our test application is Up To Date and that No Updates Are Available. Replicated will periodically check for new updates and this message will change. But we can force Replicated to check now and not wait for the next interval.

Click on the Check Now button. A popup should appear stating that there's an update available with a single button titled "View Update".

![View Update](/images/guides/native/view-update.png)

Click the View Update button and the Admin Console will show the release history of your application, including the new release we just promoted. Clicking the Install Update button on this still will apply the new YAML which will change the Redis image. When it's finished, navigate back to the dashboard and you should see that the application is up to date again.

Next, head to the [Kubernetes scheduler documentation](/docs/kubernetes/getting-started) to learn how to prepare your application to ship on Replicated with Kubernetes.

