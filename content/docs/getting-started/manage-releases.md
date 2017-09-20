---
date: "2016-07-03T04:02:20Z"
title: "Create & Manage Releases"
description: "An introduction to the release channel management workflow for development on the Replicated platform."
weight: "103"
categories: [ "Getting Started" ]
tags: [ "Replicated Vendor" ]
index: "docs"
---

{{< linked_headline "Create Releases" >}}

The [Replicated vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels.

{{< linked_headline "Editing Releases" >}}

Once you have created a release you can use the built-in YAML editor to define the release contents. The editor provides various keyboard shortcuts as [defined here](https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts).

{{< linked_headline "Promoting Releases" >}}

In order to deploy a release you will need to promote the release to the proper channel(s). More details can be found in our [Promote Releases](/docs/distributing-an-application/promote-releases/) documentation.

{{< linked_headline "Manage Releases & Channel" >}}

By default, there are 3 release channels: Stable, Beta and Unstable. When you first log in to Replicated and select the Channels tab, you'll see these default release channels created:

### Stable
For most of your customers, you will create a license that assigns them to the Stable channel. By doing so, they'll only receive updates when you push a new version to this channel.

### Beta
The Beta channel is designed to provide a channel to test the upgrade path. You can also choose to license some early-adopting customers against this channel.

### Unstable
The Unstable channel is designed for you to constantly push releases to, much in the same way that you continuously deploy new versions to your cloud product. This is the channel that your development environment should have a license assigned to. You likely will not deliver any Unstable licenses to your customers.

In addition to creating additional Release Channels in the [Replicated vendor site](https://vendor.replicated.com/channels), you can also use the [Vendor API](/api/vendor-api/).
