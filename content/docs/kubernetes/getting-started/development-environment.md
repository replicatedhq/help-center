---
date: "2016-07-03T04:02:20Z"
title: "Development Environment"
description: "How to set up an environment to ship with Replicated and Kubernetes"
weight: "2503"
categories:  [ "Shipping With Kubernetes" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

Once your application is working in Kubernetes, you'll want to set up a simple environment to iterate on your Replicated YAML. Our Replicated Studio is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

{{< linked_headline "Install Replicated Studio (with ngrok)" >}}

### 1. Run Replicated Studio on your local dev machine
You'll need [Docker installed](https://www.docker.com/community-edition) on your local development machine.

```bash
mkdir -p $HOME/replicated

docker run --name studio -d \
    --restart always \
    -v $HOME/replicated:/replicated \
    -p 8006:8006 \
    replicated/studio:latest
```

### 2. Install ngrok

Since we're developing locally, we'll need to expose our local development environment to the internet, so that changes you make to `current.yaml` in your `replicated` directory can be served to your development server.

Download and install [ngrok from the official site](https://ngrok.com/download) (you'll need to create an account as well.)

When you're done with that, you can expose your localhost by running `./ngrok http 8006` on the command line. You should see a line that looks something like this:

`Forwarding    https://a23glmnop.ngrok.io -> 127.0.0.1:8006`
Copy that *.ngrok.io* URL, you'll need it when you install Replicated on the development server.

### 3. Install Replicated with Studio configuration on the dev server

Finally, use our simple installation script (on a Linux server in your IaaS provider of choice, or in a local dev environment in Vagrant/VirtualBox) to install Replicated with Kubernetes. You'll be prompted for the `Replicated Studio URL` during setup, use the hostname that ngrok provided you (routing to port 8006 on your local machine).

```bash
curl -sSL https://get.replicated.com/studio/k8s | sudo bash
```

#### Alternative: Use an existing cluster

If you already have [Replicated installed on an existing cluster](https://help.replicated.com/docs/kubernetes/customer-installations/existing-cluster/), instead of running the `https://get.replicated.com/studio/k8s` script, you can edit the `replicated` deployment and add an environment variable.
The name of the environment variable should be `MARKET_BASE_URL` and the value should be your ngrok URL from step 2.


{{< linked_headline "Iterate on your application YAML" >}}

During Studio installation on your local development machine, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will set up the most recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio will create a new release using the next available sequence number. To start you'll probably want to copy and paste your most recent yaml as the downloading process often adds in default `null` values.

From there you can use your favorite editor locally (like Atom, Visual Studio Code, Vim, or Emacs) and saved changes will trigger new updates available to your development server.

**_Note: In the directory `~/replicated/releases/` you can view a copy of each release Replicated Studio has created along the way._**
If you supply an invalid yaml file that isn't recognized as a valid update in the on-prem UI, you can simply delete the invalid release iteration from the local directory `~/replicated/releases` and save a new version of `current.yaml`.

### Applying updates to the dev server

After you have saved your `current.yaml` changes, you can navigate to your on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to see your new release.

{{< linked_headline "Iterate on your Application Images" >}}

As well as being able to iterate on your application YAML, you can also use Studio to iterate on your Docker images. This simplifies the development workflow when you need to make changes to your code base to support on-prem deployments.

To do this, rebuild your Docker images on your Studio server reusing the existing tags. Once you restart the application from the on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) or CLI, your updated images will be used by Replicated.

**_Note: When iterating on Docker images in Studio, referencing local Docker images using the `latest` tag is not supported. Replicated will re-pull any images with the `latest` tag, thus overwriting any changes you are making locally._**

**_Note: Pulling third-party private images is not supported with Replicated studio. If your app uses an external private registry, you'll need to pull the images down to the server where the on-prem Admin Console is running, and ensure your `imagePullPolicy` is set to `ifNotPresent` _**

{{< linked_headline "Additional features" >}}

The logs from Replicated Studio display any lint or syntax issues detected in your application yaml. You can also view all interactions the on-prem Replicated has with the Studio API.

You can follow these logs in real time using:

```bash
docker logs -f studio
```
