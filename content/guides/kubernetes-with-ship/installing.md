---
date: "2018-05-01T19:00:00Z"
title: "Testing The Customer Installation"
description: "A step-by-step guide of what the experience will be like installing the application"
weight: "30003"
categories: [ "Ship Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< note title="Part 3 Of A Series" >}}
This is part 3 of a guide that walks through creating a sample application in Replicated Ship. If you haven't followed the previous sections of this guide, go back to [deploying an application](../create-a-release) before following this guide.
{{< /note >}}

{{< linked_headline "Installing the Release" >}}

Now we can produce an installation script for our test customer.

![Install A Release](/images/guides/ship/install-script.png)

Copy the command from this screen, and take it to a workstation that has Docker installed, and run it. This is how you can distribute software that's packaged in Ship.

```shell
$  docker pull replicated/ship && \
   docker run -p 8800:8800 --rm -it -v `pwd`:/out \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -e HTTP_PROXY -e HTTPS_PROXY -e NO_PROXY \
     replicated/ship init \
     "replicated.app/init?customer_id=0WPn1Ng6xxxxxxxxxxxxxjpUW&installation_id=Oa4adGM5q3e24super-secretf3BQd"

Reading replicated.app/init?customer_id=0WPn1Ng6dfxxxxxxxxxx4ENWfxjpUW&installation_id=Oa4adGM5q3e2super-secretBQd ...
Determining application type ...
Detected application type replicated.app

Please visit the following URL in your browser to continue the installation

        http://localhost:8800

```

From here, you'll work through the `lifecycle` we defined previously, until you get to the "You're all done" page:

![All Done](/images/guides/ship/all-done.png)

{{< linked_headline "Instsalling to a cluster" >}}

Executing this installer script generated everything that's needed to deploy our application to a Kubernetes cluster. But we need to bring a Kubernetes cluster, and should already have `kubectl` set up and configured to continue with the next steps.

### Deploy resources

As instructed in the lifeycle, we can

```shell
kubectl apply -f installer/k8s
```

and we're off to the races. If you're on Docker for Desktop, the `LoadBalancer` service should get your nginx listening on port `80` on localhost. If you're on a cloud-provided cluster, you'll need to inspect `kubectl get svc` to find the load balancer IP.

