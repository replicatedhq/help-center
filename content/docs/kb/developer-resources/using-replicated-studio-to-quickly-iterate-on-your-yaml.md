---
date: "2017-10-23T00:00:00Z"
title: "Using Replicated Developer Studio"
description: "A guide on how the Replicated Developer Studio can be integrated into your Replicated development workflow."
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Development", "Studio"]
---

![Replicated Studio](/images/post-screens/replicated-studio-header.jpg)

The [Replicated Developer Studio](https://github.com/replicatedhq/studio) has been designed with developers in mind by allowing for [application YAML](https://help.replicated.com/docs/packaging-an-application/yaml-overview/) and Docker image changes to reflect immediately in the on-premises Admin console.

This provides a quick way to iterate and test new versions of your application, without uploading every change to Replicated. 

Additionally, Studio gives you and your team individual isolated build environments, so any changes made during your application development won’t affect others until it is time to share them with the team.

With your application development isolated, changes can be tested quicker, and you no longer need to update your shared Replicated account with each change.


## Getting Started

### 1. Install

With our simple installation script (on a Linux server in your IaaS of choice, or in a local dev environment in Vagrant/VirtualBox):

    ```bash
    curl -sSL https://get.replicated.com/studio | sudo bash
    ```

You'll have everything you need to get started, including a full Replicated installation (using the native scheduler), all Replicated dependencies, and the Studio development services.


### 2. Activate

Once Replicated and Replicated Studio are installed, you now need to upload and activate your [development Customer license](https://help.replicated.com/docs/distributing-an-application/create-licenses/#license-type-required) by navigating to the on-premises admin console at `https://<YOUR SERVER ADDRESS>:8800` in your browser of choice and finishing the setup.


### 3a. Iterate (on your application YAML)

During installation, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will setup the most recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio will create a new release using the next available sequence number.

You can also use your favourite editor locally (like Atom, Visual Stuido Code, Vim, or Emacs) and upload your changes once you're ready. Eg. Using SCP:

    ```bash
    scp current.yaml ubuntu@[my.development.host]:/home/[user]/replicated
    ```

After you have uploaded your `current.yaml` changes, you can navigate to your on-premises Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to see your new Release.

***Note: In the directory `~/replicated/releases` you can view a copy of each Release Replicated Studio has created along the way.***



### 3b. Iterate (on your Docker images)

As well as being able to iterate on your application YAML, you can also use Studio to iterate on your Docker images. This simplifies the development workflow when you need to make any changes to your code base to support on-premises deployments.

To do this, rebuild your Docker images on your Studio server reusing the existing tags. Once you restart the application from the on-premises Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) or CLI, your updated images will be used by Replicated.

***Note: When iterating on Docker images in Studio, referencing local Docker images using the `latest` tag is not supported. Replicated will re-pull any images with the `latest` tag, thus overwriting any changes you are making locally.***



## Additonal features

The logs from Replicated Studio display any Lint or syntax issues detected in your application yaml. You can also view all interactions the on-premises Replicated has with the Studio API.

You can follow these logs in real time using:

    ```bash
    sudo docker logs -f studio
    ```
