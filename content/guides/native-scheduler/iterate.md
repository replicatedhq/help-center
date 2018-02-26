---
date: "2018-01-30T04:02:20Z"
title: "Iterating And Updating"
description: "A guide to walk you through iterating and updating a release in Replicated"
weight: "9003"
categories: [ "Replicated Scheduler Guide" ]
index: "guides/native"
type: "guide"
gradient: "redToRed"
aliases: [/guides/getting-started]
---

# Iterate and Ship Updates

This guide will walk you through making a change and shipping an update to an application after it's been deployed. It's assumed you have the environment from parts 1 and 2 of this guide ([creating a release](../create-release) and [installing](../install)). If you haven't completed these guides, head back and finish them first.

Now that we have a server running, a common task is to ship updates. Our application is simple (just a redis container), but let's add an nginx congtainer to our test application.

{{< linked_headline "Create A New Release" >}}

On the Releases page of the [Vendor Portal](https://vendor.replicated.com), click the Create Release link on top. Once again, you'll be taken to a YAML editor that shows the contents of the most recently created release. This gives us everything we've done so far, and our task now is to only write the changes needed to add nginx into our application.

{{< linked_headline "Add nginx Container" >}}

Nginx is a powerful tool that can support a lot of configuration, but we will ship a basic, unconfigured nginx container. Scroll down in the YAML to the `components:` section again. There's a single container (redis) that we previously added. Above this container definition, add the following nginx container definition. Indentation is important in YAML, if you have problems, the [entire final YAML is published here](https://gist.github.com/marccampbell/98e25e9ca8e1133fc07174d3f9d2609c) for reference.

```yaml
      - source: public
        image_name: nginx
        version: "1.13.9"
        ports:
          - private_port: 80
            public_port: 80
```

{{< linked_headline "Save And Promote The Release" >}}

Following the same process we did before, click the Save Release button, go back one screen and click Promote. Choose the Unstable branch again to promote release 2 to this branch. That's all that's needed to ship an update to a channel. Now, any license installed from the "Unstable" channel will start with this new release, and any installation already running will be prompted to update to the new release.

{{< linked_headline "Update The Test Server" >}}

To install and test this new release, we need to connect to the Admin Console dashboard on port :8800 using a web browser. At this point, it will likely show that our test application is Up To Date and that No Updates Are Available. Replicated will periodically check for new updates and this message will change. But we can force Replicated to check now and not wait for the next interval.

Click on the Check Now button. A popup should appear stating that there's an update available with a single button titled "View Update".

!

Click the View Update button and the Admin Console will show the release history of your application, including the new release we just promoted. Clicking the Install Update button on this still will pull the nginx container, and restart the application to include nginx. When it's finished, navigate back to the dashboard and you should see that the application is up to date again.

In the [final guide](../next-steps) in this series, we'll offer suggestions about where to go next, what to add and how to prepare your application to ship on Replicated with the Replicated Native Scheduler.

