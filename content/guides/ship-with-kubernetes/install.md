---
date: "2018-01-30T04:02:20Z"
title: "Installing and Testing a Kubernetes Release"
description: "A guide to installing and testing a Kubernetes appliance and release in Replicated"
weight: "11002"
categories: [ "Kubernetes Guide" ]
index: "guides/kubernetes"
type: "chapter"
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

# Installing and Testing a Kubernetes Release

This guide will give you first-hand experience installing a Replicated Kubernetes appliance and the Guestbook application. If you haven't yet created the Guestbook application, head back to the [Create and Ship as Release](../create-release) guide and complete that first.

Now that we've created a release and promoted it to the the Unstable channel, the next step is to create a customer license and use this this license to install the application on a test server.

{{< linked_headline "Create License" >}}

A customer license (`.rli` file) is required to install any Replicated application. To create a customer license, log in to the [Vendor Portal](https://vendor.replicated.com) and select the Customers link on the left. You will see a screen that says you haven't created any customers. Click the "Create a customer" button to continue.

![Customers](/images/guides/native/customers.png)

On the Create a new customer page, fill in your name for the Customer name field, and click Create customer. The defaults in all other fields will be fine -- the license will be assigned to the Unstable channel because that's the only channel with a release in it.

![Create Customer](/images/guides/native/create-customer.png)

After creating the customer, click the "Download license" link in the upper right corner. This will download file file with your customer name and a `.rli` extension. This is the license file you would deliver to your customer, if this was a real customer.

{{< linked_headline "Create Test Server and Install Replicated" >}}

To test this installation, we need a server. I'm going to create a test EC2 instance in AWS to try this out, but you can use any cloud provider or Vagrant box you'd like. For this guide, let's create a server with

- Ubuntu 16.04
- at least 4 GB of RAM
- 2 CPU cores
- at least 50GB of disk space

Next, ssh into the server we just created, and run the install script:

```shell
$ curl -sSL https://get.replicated.com/kubernetes-init | sudo bash
```

You should be able to select the defaults for any prompts that are presented.

Once the installation script is completed, it will show the URL you can connect to in order to continue the installation. This install script will install Docker, Kubernetes and prepare the server for your application (the Guestbook in this case).

Once the installer is completed, you'll see:

```shell
		Installation Complete ✔

To access the cluster with kubectl, reload your shell:

    bash -l

To continue the installation, visit the following URL in your browser:

    https://35.226.70.55:8800


ubuntu@server1:~$
```

Following the instructions on the screen, you can reload the shell and `kubectl` will now work:

```bash
$ bash -l
$ kubectl get pods
NAME                                                    READY     STATUS    RESTARTS   AGE
replicated-5d9d6b9bd7-smhwv                             2/2       Running   0          13m
replicated-hostpath-provisioner-5d86c6dd7d-kk9v2        1/1       Running   0          13m
replicated-premkit-7b9f7bcd84-8fj2t                     2/2       Running   0          12m
replicated-sidecar-controller-default-fdccc454f-ssslq   1/1       Running   0          12m
retraced-api-5b78bdbf99-jwpct                           1/1       Running   0          12m
retraced-cron-6664b675b6-5lc29                          1/1       Running   0          12m
retraced-nsqd-6b5bb788d6-vfn67                          1/1       Running   0          12m
retraced-postgres-f5bf6cd5-s8hhc                        1/1       Running   0          12m
retraced-processor-b86668d48-m6lgr                      1/1       Running   0          12m
```

{{< linked_headline "Install License" >}}

At this point, Replicated and Kubernetes are running, but the Guestbook app isn't yet. To complete the installation, visit the URL that the installation script displayed when completed. Replicated automatically provisions a self-signed certificate on every installation, so you'll have to accept this cert to continue. We recommend that every installation change this to a trusted cert, and that can be completed in the browser, at the next step.

On the next screen, you have the option of uploading a trusted cert and key. For this demo, let's continue with the Replicated-generated self-signed cert. Click the orange button to continue, and then Proceed Anyway in the popup.

![Console TLS](/images/guides/native/admin-console-tls.png)

Now we are on the screen that expected a license file. Until this point, this server is the same as any Replicated server. Once we put a license file on it, the server will become our test application (redis). Click the Choose License button and select your `.rli` file to continue.

![Upload License](/images/guides/native/upload-license.png)

Because this server is on the public Internet, we should put a password on the admin console. This will prevent unauthorized changes from being applied to our test application. Go ahead and enter any password you'd like, confirm it and click Continue.

![Secure The Console](/images/guides/native/secure-console.png)

Preflight checks are designed to ensure this server has the minimum requirements and environment to run the application. We didn't choose any additional requirements when shipping the Guestbook, so this is the default Replicated requirements. Everything should pass, so click Continue to proceed.

![Preflight Checks](/images/guides/kubernetes/preflight.png)

Finally, the settings page is here with default configuration items. These can all be changed when we ship updates, but nothing is required.

![Settings Page](/images/guides/kubernetes/settings.png)

Click the Dashboard link on the top to see the default, most basic Replicated installation with Kubernetes possible running. If you are still connected to this server over ssh, `kubectl get pods --all-namespaces` will show a few pods, including the Guestbook services we just deployed.

![Dashboard](/images/guides/kubernetes/dashboard.png)

On the top nav, there's a link to the /cluster page. Clicking that will show you the Kubernetes services that we just deployed.

![Cluster](/images/guides/kubernetes/cluster.png)

In the [next guide](../iterate), we'll walk through creating and shipping an update to the application we just installed.
