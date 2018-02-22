---
date: "2018-01-30T04:02:20Z"
title: "Installing Replicated"
description: "Introduction to installing Replicated and Docker Swarm for your customers"
weight: "8003"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "guide"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---


{{< linked_headline "Installing and Testing A Release" >}}

This guide will walk you through installing the "Learning Replicated" application create and promoted in the previous guide. If you haven't yet created this release, head back to the [Create And Ship A Release](../create-release) guide and complete that first.

Now that we've created a release and promoted it to the Unstable channel, the next step is to create a customer license, and use this license to install the application on a test server.

{{< linked_headline "Create License" >}}

A customer license (`.rli` file) is required to install any Replicated application. To create a customer license, log in to the [Vendor Portal](https://vendor.replicated.com) and select the Customers link on the left. You will see a screen that says you haven't created any customers. Click the "Create a customer" button to continue.

![Customers](/images/guides/native/customers.png)

On the Create a new customer page, fill in your name for the Customer name field, and click Create customer. The defaults in all other fields will be fine -- the license will be assigned to the Unstable channel because that's the only channel with a release in it.

![Create Customer](/images/guides/native/create-customer.png)

After creating the customer, click the "Download license" link in the upper right corner. This will download file file with your customer name and a `.rli` extension. This is the license file you would deliver to your customer, if this was a real customer.

{{< linked_headline "Create Test Server and Install Replicated" >}}

To test this installation, we need a server. Using [Vagrant](https://www.vagrantup.com) and [VirtualBox](https://www.virtualbox.org/), creating a server is easy. Once installed, create a directory for your Vagrant file, and initialize an Ubuntu server:

```shell
$ mkdir ~/dev/learning-replicated
$ vagrant init ubuntu/trusty64
```

Add a private network to your Vagrantfile. For an example Vagrantfile, see [this gist](https://gist.github.com/gerred/624a7a0e56537580e06ac23fe299766f).

Once our VM is configured, it's time to start it up:

```shell
$ vagrant up
```

Next, ssh into the server we just created, and run the install script:

```shell
$ vagrant ssh
$ curl -sSL https://get.replicated.com/swarm | sudo bash
```

{{ <callout> }}

Installing in Swarm mode will install a single-node Swarm cluster and deploy Replicated as Swarm Stacks onto it. These stacks are load balanced across all nodes in a cluster.

{{ </callout> }}

You should be able to select the defaults for any prompts that are presented.

Once the installation script is completed, it will show the URL you can connect to in order to continue the installation.

```shell

Operator installation successful

To continue the installation, visit the following URL in your browser:

  https://192.168.100.102:8800
```

You can exit the ssh session at this point, the rest of the setup will be completed in the browser.

{{< linked_headline "Install License" >}}

To complete the installation, visit the URL that the installation script displayed when completed. Replicated automatically provisions a self-signed certificate on every installation, so you'll have to accept this cert to continue. We recommend that every installation change this to a trusted cert, and that can be completed in the browser, at the next step.

{{< linked_headline "Install the License" >}}

On the next screen, you have the option of uploading a trusted cert and key. For this demo, let's continue with the Replicated-generated self-signed cert. Click the orange button to continue, and then Proceed Anyway in the popup.

![Console TLS](/images/guides/native/admin-console-tls.png)

Now we are on the screen that expected a license file. Until this point, this server is the same as any Replicated server. Once we put a license file on it, the server will become our test application (redis). Click the Choose License button and select your `.rli` file to continue.

![Upload License](/images/guides/native/upload-license.png)

Because this server is on the public Internet, we should put a password on the admin console. This will prevent unauthorized changes from being applied to our test application. Go ahead and enter any password you'd like, confirm it and click Continue.

![Secure The Console](/images/guides/native/secure-console.png)

Preflight checks are designed to ensure this server has the minimum requirements and environment to run the application. We didn't choose any additional requirements when shipping Redis, so this is the default Replicated requirements. Everything should pass, so click Continue to proceed.

![Preflight Checks](/images/guides/native/preflight.png)

Finally, the settings page is here with default configuration items. These can all be changed when we ship updates, but nothing is required.

![Settings Page](/images/guides/native/settings.png)

Click the Dashboard link on the top to see the default, most basic Replicated installation possible running. If you are still connected to this server over ssh, `docker ps` will show a few containers, one of them is the redis container we just deployed. To see the services that were installed, use `docker service ls`

![Dashboard](/images/guides/native/dashboard.png)

In the [next guide](../iterate), we'll walk through creating and shipping an update to the application we just installed.
