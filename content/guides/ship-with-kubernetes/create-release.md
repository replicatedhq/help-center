---
date: "2018-01-30T04:02:20Z"
title: "Create a Kubernetes Release"
description: "An overview of why it makes sense to deploy Replicated with your Kubernetes application"
weight: "11001"
categories: [ "Kubernetes Guide" ]
index: "guides/kubernetes"
type: "chapter"
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

# Create and Promote a Release

When starting and learning the Replicated platform, the [Vendor Portal](https://vendor.replicated.com) will be the place you spend most of your time. This guide is designed to help you get familiar with the concepts and ideas that are important to successfully deploy your application with Replicated. If you get stuck or need help, head to our [community](https://help.replicated.com/community/).

This guide will deploy one of the canonical Kubernetes applications using Replicated, and then iterate on it to deliver an update. The guide isn't going to teach Kubernetes, but will start with a working Kubernetes application ([Guestbook all-in-one example](https://raw.githubusercontent.com/kubernetes/examples/12cff4b7a59334080958469052bf9cde80e75618/guestbook/all-in-one/guestbook-all-in-one.yaml)).

{{< linked_headline "Create a New Application" >}}

To start, log in (or create a new team) on [vendor.replicated.com](https://vendor.replicated.com) and create a new application. After signing up and activating your account, you will be prompted to create a new application. Give it a name like "Kubernetes Guestbook Example", select the "Kubernetes + Replicated" option, and click "Create application".

![Create Application](/images/guides/kubernetes/create-application.png)

{{< linked_headline "Releases" >}}

You'll should be at the channels page now. This is a list of your release channels, which are logical stacks for you to stage and promote releases to your customers. We'll explore this in more detail later. For now, click on the Releases item on the left menu and then click the "Create a release" button.

![Create Release](/images/guides/kubernetes/create-release.png)

{{< linked_headline "Create a Release" >}}

You should now see a YAML editor where you can define how you application will work and the integration with Replicated functionality. Once you are familiar with this concepts, you'll probably use our CLI and API to automate this and not manually edit YAML in this site. But for now, let's continue by adding the Guestbook example.

![Default YAML](/images/guides/kubernetes/default-yaml.png)

The default YAML document you have contains some boilerplate Replicated settings, and no Kubernetes specs. A Replicated release is a multi-doc YAML file, where each document is separated with a `---` line. The first line in each document must be a comment that identifies the type "kind" of document that is included. At the bottom of the default YAML file, you should see an empty document that contains:

```yaml
---
# kind: scheduler-kubernetes

#
# Deploying your application via Kubernetes
# https://help.replicated.com/docs/packaging-an-application/kubernetes/
#
```

The first 2 lines of this are Replicated specific, and cannot be changed. But below this, let's paste in the [Guestbook application YAML](https://raw.githubusercontent.com/kubernetes/examples/12cff4b7a59334080958469052bf9cde80e75618/guestbook/all-in-one/guestbook-all-in-one.yaml). The example YAML contains a few different Kubernetes specs, each identifies with a `---` separator. We need to include the `# kind: scheduler-kubernetes` directive below each separator.  For reference, the [fully constructed YAML is available](https://gist.github.com/marccampbell/073749867dadba44b5a01b687d006552).

{{< linked_headline "Save and Promote Release" >}}

Next, click the Save Release button. Once the release is saved, we should promote it to the Unstable channel to make this release available for installation. To do this, click the "< Releases" link in the top left and then click the Promote button on the row we just created. In this popup, choose the Unstable channel and click the Promote button.

![Create Application](/images/guides/kubernetes/promote-release.png)

That's all there is to creating and promoting a release in Replicated using Kubernetes.

In the [next guide](../install), we'll walk through creating a license and installing Kubernetes and the guestbook application on a test server.
