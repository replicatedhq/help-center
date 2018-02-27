---
date: "2018-01-30T04:02:20Z"
title: "Installing Replicated"
description: "Introduction to installing Replicated and Docker Swarm for your customers"
weight: "80003"
categories: [ "Docker Swarm Guide" ]
index: "guides/swarm"
type: "chapter"
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Installing a Release" >}}

In this guide, we will take the application we created in our [last guide](../create-swarm-app) and install it onto a test customer server. If you do not currently have an application with a release promoted to the Unstable channel, go back to [Create and Ship a Release](../create-swarm-app) to setup a Replicated account and create this application.

Start by navigating to the Replicated [Vendor Portal](https://vendor.replicated.com)

{{< linked_headline "Prerequisites" >}}

To successfully complete the guide, you will need the following:

* An activated Replicated account, on the Vendor Portal
* A Replicated on Swarm application with a release on the Unstable channel
* SSH access to a new server running a standard distribution of Linux. For this guide, we recommend the latest version of Ubuntu, Debian, CentOS, or Red Hat Enterprise Linux.
* HTTP and HTTPS access to the server to access the Replicated Dashboard and application components

{{< linked_headline "Customers and Licenses" >}}

Replicated's licensing is based on Customers, which encapsulate all of the information and settings needed to successfully run software. In some cases, customers will only differ by name and license expiration date. In other cases, Replicated supports custom annotations on licenses to allow you to support multiple plan structures.

Licenses are issued on a per-customer basis, and in on-line installs are represented as a `.rli` file that is uploaded to the Replicated console. To download a license, we first need to create a customer. Navigate to the Customers dashboard from the left navigation. The first time you enter this section, it will be empty.

Click the "Create a Customer" button to begin creating a customer. For this simple application, we only need to name our customer. Typically, this will be an end company that you are delivering your software to, but you can use any naming scheme that makes sense for your organization. By default, this customer will be assigned to the Unstable channel, but more options are provided when multiple channels exist.

For now, enter a name and click "Create customer" to create your first customer. Now that our customer has been created, we can download our license. On the top right of our customer page, click the "Download License" link. This will download our `.rli` file for this customer. Note that licenses are customer specific and contain information such as expiration dates and other private annotations, and it is important to issue the right license to the right customer.

In the next section, we will use this license to install Replicated and start our application.

{{< linked_headline "Install Replicated on a Server" >}}

Installing Replicated in Swarm mode requires a Linux server that supports Docker 1.9.1 and above. As mentioned in the pre-requisites, having SSH access to a new server running the latest version of Debian, Ubuntu, CentOS, or Red Hat Enterprise Linux is enough to get started. The Replicated installer will manage the details of installing Docker, enabling Swarm mode, and installing Replicated.

Once your server is provisioned, SSH into it, and run the following command:

`curl https://get.replicated.com/swarm | sudo bash`

This command will perform the following actions:

* Check that the system's configuration can successfully run Replicated
* Verify network settings
* Install Docker
* Enable Docker Swarm
* Create the Replicated Docker Swarm Stacks

When this command finishes, you will get a prompt with a URL to continue the Replicated installation. Navigate to this URL via your server's public IP.

{{< linked_headline "Configure Replicated" >}}

Before installing a license, Replicated's dashboard will walk you through the steps of securing the dashboard with a TLS certificate. For now, click the Self-Signed Certificate option and click "Continue". In production environments, you will want to use your organization's PKI infrastructure to issue a certificate specific to Replicated. 

{{< linked_headline "Install License" >}}

With Replicated securely configured, the next step is to upload our license. Click the Choose License button and select the `.rli` file you generated in the previous section to continue.

{{< linked_headline "Securing the Dashboard" >}}

Next, you will be presented with the option to set a password for the Replicated dashboard. Replicated supports anonymous, password, and LDAP based authentication. Anonymous is useful for private testing instances, but since this is a public instance, we will want to set a password. Choose password authentication, set a password, and hit Continue.

{{< linked_headline "Preflight Checks" >}}

Preflight Checks are a Replicated feature used to ensure that your customers' servers meet the minimum requirements for both Replicated's core components and your applications. The defaults are the minimal set required to run Replicated itself, but you will want to build upon these to ensure that users' machines meet all of the necessary requirements for your application to successfully run in their environment.

The Replicated checks include some basics such as Docker version, network settings, and disk space. On top of this, you can add multiple built-in checks such as checking for open ports, or set minimum CPU and memory requirements. For now, click "Continue".

{{< linked_headline "Replicated Dashboard" >}}

When first installing a license, the first page you are taken to is the Application Configuration page. This gives users the opportunity to set any required configuration settings for our application to successfully start. Nothing is required here, but this will change on future updates to application.

Navigate to the Dashboard page from the link on the top. Because no settings were required, our application will automatically start, and should be running now. To see the components that are running, navigate to the "Cluster" page, which will show our running Redis container.

If you are still connected to the server over SSH, `docker ps` will show our running container. Because we are running on Docker Swarm, it will have a random name that reflects our Swarm service.
