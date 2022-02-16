---
date: "2016-07-03T04:02:20Z"
title: "Create & Manage Releases"
description: "An introduction to the release channel management workflow for development on the Replicated platform."
weight: "2507"
categories: [ "Shipping With Kubernetes" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<legacynotice>}}

{{< linked_headline "Create Releases" >}}

The [Replicated vendor portal](https://vendor.replicated.com) provides you with a location to create and release versions of your application to various release channels. The vendor portal hosts a built-in YAML editor and linter to help you write and validate YAML.

{{< linked_headline "Promoting Releases" >}}

Once a release is ready to be installed, the release can be promoted to one or more release channels. More details can be found in our [Promote Releases](/docs/native/packaging-an-application/promote-releases/) documentation.

{{< linked_headline "Manage Release Channels" >}}

By default, there are 3 release channels: Stable, Beta and Unstable. When you first log in to Replicated and select the Channels tab, you'll see these default release channels created. You can delete, edit or create new channels at any time. The channels Replicated creates by default are commonly used for:

### Unstable
The Unstable channel is designed for you to constantly push releases to, much in the same way that you continuously deploy new versions to your cloud product. This is the channel that your development environment should have a license assigned to. This channel is designed to be internal and for testing, not for your customers to be licensed against.

### Beta
The Beta channel is created for release candidates and early adopting customers. We recommend you promote a release to the Beta channel once it's passed automated testing in the Unstable channel. You can also choose to license some early-adopting customers against this channel.

### Stable
For most of your customers, you will create a license that assigns them to the Stable channel. By doing so, they'll only receive updates when you push a new version to this channel.
