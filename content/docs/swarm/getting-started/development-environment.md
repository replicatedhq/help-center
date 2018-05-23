---
date: "2016-07-03T04:02:20Z"
title: "Development Environment"
description: "How to set up an environment to ship with Replicated and Docker Swarm"
weight: "502"
categories: [ "Shipping with Docker Swarm" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

Once your application is working in Docker, you'll want to set up a simple environment to iterate on your Replicated YAML. Our open source [Replicated Studio](https://github.com/replicatedhq/studio) is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

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

Finally, use our simple installation script (on a Linux server in your IaaS provider of choice, or in a local dev environment in Vagrant/VirtualBox) to install Replicated with Swarm. You'll be prompted for the `Replicated Studio URL` during setup, use the hostname that ngrok provided you (routing to port 8006 on your local machine).

```bash
curl -sSL https://get.replicated.com/studio/swarm | sudo bash
```

{{< linked_headline "Iterate on your application YAML" >}}

During Studio installation on your local development machine, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will locate the `replicated` directory, create the `/releases/` directory, download the recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio indexes the `/releases/` directory to find the highest numbered release (`n`) and will create a new release YAML using the next available sequence number (`n+1`). To start you'll probably want to copy and paste your most recent yaml as the downloading process often adds in default `null` values.

From there you can use your favorite editor locally (like Atom, Visual Studio Code, Vim, or Emacs) and saved changes will trigger new updates available to your development server.

**_Note: In the directory `~/replicated/releases/` you can view a copy of each release Replicated Studio has created along the way._**
If you supply an invalid yaml file that isn't recognized as a valid update in the on-prem UI, you can simply delete the invalid release iteration from the local directory `~/replicated/releases` save a new version of `current.yaml`. Additionally, because of the way that Studio works, you can manually rename sequences in the `/releases/` directory in order to catch up to or back out of [releases that are in the vendor portal](https://vendor.replicated.com/releases).

### Applying updates to the dev server

After you have saved your `current.yaml` changes, you can navigate to your on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to have your new release be detected and automatically applied.

{{< linked_headline "Iterate on your application images" >}}

As well as being able to iterate on your application YAML, you can also use Studio to iterate on your Docker images. This simplifies the development workflow when you need to make changes to your code base to support on-prem deployments.

To do this, rebuild your Docker images on your Studio server reusing the existing tags. Once you restart the application from the on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) or CLI, your updated images will be used by Replicated.

**_Note: When iterating on Docker images in Studio, referencing local Docker images using the `latest` tag is not supported. Replicated will re-pull any images with the `latest` tag, thus overwriting any changes you are making locally._**

{{< linked_headline "Additional features" >}}

The logs from Replicated Studio display any lint or syntax issues detected in your application yaml. You can also view all interactions the on-prem Replicated has with the Studio API.

You can follow these logs in real time using:

```bash
docker logs -f studio
```

By default updates are automatically applied when they're detected by your development server (regardless to what the license setting is.) If you would prefer to manually apply updates, you can simply set the environment variable `-e STUDIO_UPDATE_POLICY=manual` when starting studio on your local development machine.

{{< linked_headline "Some limitations" >}}

If your application YAML includes GitHub references for config files, these will not be functional. If you are using this feature, you will have to include the GitHub file inline for now.

The Studio service does respond to requests for custom branding, console logos, and some other metadata. All of these values are static and will not be served from the upstream API. This means that your local developer console will not show your application logo or branding, but this will still work when you promote your build using the primary API service.
