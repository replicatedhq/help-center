---
date: "2018-05-01T19:00:00Z"
title: "Testing The Customer Installation"
description: "A step-by-step guide of what the experience will be like installing the application"
weight: "30103"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< note title="Part 3 Of A Series" >}}
This is part 3 of a guide that walks through creating a sample application in Replicated Ship. If you haven't followed the previous sections of this guide, go back to [deploying an application](../create-a-release) before following this guide.
{{< /note >}}

{{< linked_headline "Installing the Release" >}}

Now that we've created a customer and a release, we can produce an installation script for our test customer.

![Get Install Script](/images/guides/ship/customer-install-script.png)

In the modal, you'll want to navigate to "Ship OSS".

![Get Install Script](/images/guides/ship/copy-install-script.png)


{{< note title="Installing Ship" >}}
This guide assumes you'll run Ship with Homebrew using 
`brew install ship`, or [downloading the binary](https://github.com/replicatedhq/ship#installation), but you can also run Ship with the `replicated/ship` docker container.
{{< /note >}}

Copy the command from this screen, we'll run it in the next step. When your end customer installs your application, you'll give them this command to run on their workstation.


{{< linked_headline "Run the command" >}}

Run the command from the modal. It should look something like:

```shell
ship init "replicated.app/superci-enterprise?license_id=MoYBbdP4sy6qomD9WdAWjAsWPsKF3YZ1"
```

This command will read the release we created in [https://vendor.replicated.com](https://vendor.replicated.com) and then prompt us to open a browser:

```shell

Reading replicated.app/superci-enterprise?license_id=MoYBbdP4sy6qomD9WdAWjAsWPsKF3YZ1 ...
Determining application type ...
Detected application type replicated.app

Please visit the following URL in your browser to continue the installation

        http://localhost:8800

```

From here, you'll work through the `lifecycle` we defined previously, until you get to the "You're all done" page:

![All Done](/images/guides/ship/all-done.png)

{{< linked_headline "Review Outputs" >}}

Once you reach the end of the workflow, the `ship init` CLI command  will exit, and you can review the files creeated:

```shell
$ find .
.
./.ship
./.ship/state.json
./installer
./installer/k8s
./installer/k8s/nginx-service.yaml
./installer/k8s/nginx-deployment.yaml
```

Our `inline` assets from above have been created under the `installer` directory. There's also a `.ship/state.json` which holds metadata about the installation. We'll use this state file later in the [Shipping an Update](../iterate) chapter of this guide.


{{< linked_headline "Installing to a cluster" >}}

Executing this installer script generated everything that's needed to deploy our application to a Kubernetes cluster. But we need to bring a Kubernetes cluster, and should already have `kubectl` set up and configured to continue with the next steps.

### Deploy resources

As instructed in the lifeycle, we can

```shell
kubectl apply -f installer/k8s
```

and we're off to the races. If you're on Docker for Desktop, the `LoadBalancer` service should get your nginx listening on port `80` on localhost. If you're on a cloud-provided cluster, you'll need to inspect `kubectl get svc` to find the load balancer IP.

### Next Steps

Now that we've shipped our first release, its time to work through [Shipping an Update](../iterate).
