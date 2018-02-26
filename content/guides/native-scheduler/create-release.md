---
date: "2018-01-30T04:02:20Z"
title: "Create And Ship A Release"
description: "A guide to walk you through creating and shipping a release in Replicated"
weight: "9001"
categories: [ "Replicated Scheduler Guide" ]
index: "guides/native"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/getting-started]
---

# Create And Ship A Release

When starting out with Replicated, the [Vendor Portal](https://vendor.replicated.com) will be the place you spend most of your time. Going through this guide will help you become familiar with the concepts and ideas that are important to be successful shipping on Replicated using the Vendor Portal. If you get stuck or need help with any of these steps, head to our [community](https://help.replicated.com/community) or send us an email to [contact@replicated.com](mailto:contact@replicated.com) and we'll be happy to help.

{{< linked_headline "Create A New Application" >}}

To start, log in (or create an account) on [vendor.replicated.com](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you will be prompted to create a new application. Give it a name like "Learning Replicated", select the "Replicated + built-in scheduler" option, and click "Create application".

![Create Application](/images/guides/native/create-app.png)

{{< linked_headline "Releases" >}}

You'll now be sent to the channels page. This is your release channels, where you can stage and promote releases later. We'll come back to this. For now, click on the Releases item on the left menu. You should see a screen that tells you that you haven't yet created any releases. Go ahead and click the "Create a release" button to continue.

![Create Release](/images/guides/native/create-release.png)

{{< linked_headline "Create A Release" >}}

Now, you'll see a YAML editor where you can define your application and how Replicated should run it in your customer's environment. We'll cover each section of this sample YAML in these guides.

![Default YAML](/images/guides/native/default-yaml.png)

Replicated runs Docker containers, and you are responsible for building and pushing Docker images to any registry (including [one that we created for you](/docs/native/getting-started/docker-registries) when you signed up). For this guide, our application is going to be just a redis container. When done, we'll ship a license file that can be used to install redis (and support and update it).

Find the line in the YAML document that says `components: []`. This is the section you will need to edit to define your containers and all options needed to start and run them. Let's add the public redis container image to our application. Replace the `components: []` line with this block ([here's a copy of what the full YAML document should look like](https://gist.github.com/marccampbell/3c05d46e85ccbc3cf6dfa884431515e6))

```yaml
components:
  - name: Stateful Things
    containers:
      - source: public
        image_name: redis
        version: "3.2.11"
```

Next, click the Save Release button. Once the release is saved, we should promote it to the Unstable channel to make it available for installation. To do this, click thhe "< Releases" link in the top left and then click the Promote button on the row we just created (it should have Sequence 1). In this popup, check the Unstable channel, and click the Promote button.

![Create Application](/images/guides/native/promote-release.png)

That's all there is to creating and promoting a release in Replicated.

In the [next guide](../install), we'll walk through creating a license and installing the redis application on a test server.

