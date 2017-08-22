---
date: "2016-07-03T04:02:20Z"
title: "Concepts and Terminology"
description: "The core concepts and terms used in these documents to describe the Replicated functionality."
weight: "102"
categories:  [ "Getting Started" ]
similar: ["docs/getting-started/get-started.md"]
tags: ""
index: "docs"
---

Before shipping your application, there are a few terms to learn, as they are used throughout this guide.

### Application
An application (or app) is the software package you are installing onto your customer's servers. It isn't a single binary, rather it's all of the individual components which make your product.

### Channel
Channels are used to stage out releases for customers or customer segments. By default there are Stable, Beta and Unstable channels.

### Release
A release is a shipped version of the application, complete with release notes & version number.

### Image
An image is a Docker image that will be used to create a container at runtime.

### Container
A container is a running instance of an image.