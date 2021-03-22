---
date: "2016-07-03T04:02:20Z"
title: "Concepts and Terminology"
description: "The core concepts and terms used in these documents to describe the Replicated functionality."
weight: "2502"
categories:  [ "Delivering with Kubernetes" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
For KOTS documentation, check out [kots.io](https://kots.io/vendor).
{{</kotsdocs>}}

Before deploying your application, there are a few terms to learn, as they are used throughout this guide.

### Application
An application (or app) is the software package you are installing onto your customer's servers. It isn't a single binary, rather it's all of the individual components which make your product.

### Channel
Channels are used to stage out releases for customers or customer segments. By default there are Stable, Beta and Unstable channels.

### Release
A release is a version of the application, complete with release notes & version number.

### Admin Console
The Admin Console is the on-prem UI that is used to install, license, configure and update an application delivered by Replicated.
