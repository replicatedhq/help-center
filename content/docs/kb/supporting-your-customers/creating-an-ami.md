---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Creating An AMI"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

At times, it can be desirable to ship an Amazon Machine Image (AMI) to allow customers a familiar installation path. 
Replicated does not provide an official machine image, but it's simple to prepare one and publish it in the AMI 
marketplace. These instructions will set up and prepare a Replicated 2.0 installation on an Ubuntu 14.04 AMI. You 
could extend these to support any other operating system by using the concepts outlined here.

## Launch an EC2 Instance

To get started, launch a base image of Ubuntu 14.04 with an EBS root device.

## Prepare and create the AMI

### Step 1: Install Replicated

Install Replicated using our [installation script](/docs/distributing-an-application/installing/).

```shell
curl -sSL https://get.replicated.com/docker | sudo bash
```

You don't need to set up a proxy server and can choose the default settings. We will be erasing all settings before 
shipping this image.

After installing Replicated, all of the containers should be running. You can verify this by running `docker ps` and 
there will be several Replicated containers.

### Step 2: Wait for Replicated to initialize

In the browser, navigate to Replicated dashboard on `https://<serverip>:8800`.  Once the Upload SSL Certs screen is loaded, all images have been pulled.

![Setup Console Certs](/images/post-screens/secure-the-console.png)

### Step 3: Stop and remove the Replicated containers

We want to clean the auto-generated and auto-detected data from this server. This way, when a customer turns on a new
instance of this server, it will be calculated again.

```shell
sudo service replicated stop
sudo service replicated-ui stop
sudo service replicated-operator stop
sudo docker stop replicated-premkit
sudo docker rm -f replicated replicated-ui replicated-operator replicated-premkit
```

### Step 4: Remove config files

Replicated stores configuration in several locations. Removing all of this will force Replicated to rebuild it the next 
time it starts.

```shell
sudo rm -rf /etc/replicated*.conf
sudo rm -rf /etc/default/replicated*
sudo rm -rf /etc/sysconfig/replicated*
sudo rm -rf /var/log/upstart/replicated*
sudo rm -rf /var/lib/replicated
```

### Step 5

We've just deleted a lot of the work the initial installation script did. We need to create a little helper script that will do 
the following tasks:

- Use the [Amazon Metadata API](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html) to detect the 
private/public addresses of the instances
- Generate a new, random daemon secret token
- Create a custom `/etc/replicated.conf` file and write it to the server
- Create a custom `/etc/replicated-operator.conf` file and write it to the server
To help with this, we've created a shell script and hosted it on get.replicated.com. You can download this and make it an init script. This 
will cause the script to run when your customer boots the instance. We've also added a command at the end to delete the script to ensure 
it only runs once.

The files used in the next script are:

* [bootstrap script to start replicated and install](https://get.replicated.com/utils/aws/ubuntu1404/replicated-init)
* [init file to launch bootstrap on startup](https://get.replicated.com/utils/aws/ubuntu1404/replicated-init.conf)

```shell
sudo mkdir /etc/replicated-bootstrap
sudo mv /etc/init/replicated* /etc/replicated-bootstrap
sudo curl -o /etc/replicated-bootstrap/init-defaults.sh https://get.replicated.com/utils/aws/ubuntu1404/replicated-init
sudo chmod a+rx /etc/replicated-bootstrap/init-defaults.sh
sudo curl -o /etc/init/replicated-init.conf https://get.replicated.com/utils/aws/ubuntu1404/replicated-init.conf
```

To learn more about using the `/etc/replicated.conf` file to provide the license for an automated install, and
how you can set your settings during an automated install process, please read 
[Automate Install for Testing](/docs/kb/developer-resources/automate-install/).

### Step 6

Do whatever other cleanup you want. Maybe you want to delete the bash history. Or add any other services to this machine. This is your AMI.

### Step 7

Ship the AMI. Using [Amazon's instructions](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html), you can now create an distribute 
your own AMI with Replicated installed. When a customer turns it on, port 8800 will be listening and ready to accept a Replicated license file.
