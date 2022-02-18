---
date: "2018-03-03T04:02:20Z"
title: "Concepts and Terminology"
description: "The core concepts and terms used in these documents to describe the Replicated functionality."
weight: "40003"
categories:  [ "Ship" ]
index: ["docs/ship", "docs"]
gradient: "console"
icon: "replicatedShip"
---

{{<legacynotice>}}

Before deploying your application, there are a few terms to learn, as they are used throughout this guide.

### Application
An application (or app) is the software package you are installing onto your customer's servers. It isn't a single binary, rather it's all of the individual components which make your product.

### Channel
Channels are used to stage out releases for customers or customer segments. By default there are Stable, Beta and Nightly channels.

### Release
A release is a version of the application, complete with release notes & version number.

### Ship OSS / Ship CLI

Replicated Ship is an Open Source Software tool that customers run locally, like an installer, to configure the initial site-specific options for a Replicated application. It also provides a way to integrate updates of that application into a customer's existing continuous integration & deployment pipeline, and to make update releases available as Pull Requests into infrastructure-as-code respositories.

Replicated Ship can also be used to manage off-the-shelf commercial or open source applications packaged as raw Kubernetes YAML or Helm Charts.

### Ship Cloud / Ship Hosted

Ship Cloud is a hosted solution that enables individuals or teams to collaborate and manage multiple applications with Ship, without the overhead of operating and maintaining a fleet of Ship instances.
