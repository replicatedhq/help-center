---
date: "2018-05-01T19:00:00Z"
title: "Iterate Locally"
description: "Get set up to develop ship applications locally"
weight: "30105"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

This guide moves past the "Hello World" example and walks through setting up a full end-to-end developer environment for iterating on your Ship Application.

{{< linked_headline "Project Setup" >}}

The first step is to start from the [Replicated Ship Starter Project](https://github.com/replicatedhq/replicated-starter-ship) and get set up with your own copy of that repo.

You'll want to follow the steps in the [Project Readme](https://github.com/replicatedhq/replicated-starter-ship#replicated-ship-starter) to get the `make run-local` and `make run-local-headless` tasks running properly.


{{< linked_headline "Running your  Application" >}}

Once you have the project set up, you should test your outputs in a real Kubernetes cluster. The easiest and fastest way to iterate is to run [Docker for Desktop](https://www.docker.com/products/docker-desktop) and use the built-in Kubernetes cluster option. [GKE](https://cloud.google.com/kubernetes-engine/) or other cloud-based managed clusters should also work. 

You can use the following to test deploying your rendered Kubernetes Assets to the cluster:

```bash
make deploy
```

{{< linked_headline "Iterating Quickly" >}}

As you're editing your Kubernetes YAML in the `base` directory, you can run

```shell
make run-local-headless deploy
```

to quickly re-render your outputs and deploy them to a `kubectl` configured Kubernetes cluster.

{{< linked_headline "Next Steps" >}}

Now that you're set up with a development environment, its time to 
[automate releases with github](../manage-with-github).
