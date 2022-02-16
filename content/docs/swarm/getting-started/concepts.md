---
date: "2016-07-03T04:02:20Z"
title: "Concepts and Terminology"
description: "The core concepts required to deliver an application on Replicated using Docker Swarm."
weight: "501"
categories:  [ "Deploying With Docker Swarm" ]
index: ["docs/swarm", "docs"]
icon: "replicatedDockerSwarm"
gradient: "swarm"
---

{{<legacynotice>}}

Before deploying your application, there are a few terms to learn, as they are used throughout this guide.

### Application
An application is the software package you are installing onto your customer's servers. It isn't a single binary, rather it's all of the individual components and containers that are required to get a functional version of your product.

### Release
A Release is an installable version of the application, complete with all metadata such as release notes and instructions.

### Release Channel
Release Channels are used to stage out releases for customers or customer segments. By default there are Stable, Beta and Unstable channels. A Release Channel contains a history (stack) of releases that have been promoted to the channel.

### Admin Console
The Admin Console is the on-prem web-based interface that is used to install, license, configure and update an application delivered by Replicated.
