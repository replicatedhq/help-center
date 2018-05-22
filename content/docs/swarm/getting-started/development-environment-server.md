---
date: "2016-07-03T04:02:20Z"
title: "Development Environment"
description: "How to set up an environment to ship with Replicated and Docker Swarm"
weight: "502"
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
draft: "true"

---

Once your application is working in Docker, you'll want to set up a simple environment to iterate on your Replicated YAML. Our Replicated Studio is designed to let shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

{{< linked_headline "Install Replicated Studio" >}}

First, use our simple installation script (on a Linux server in your IaaS provider of choice, or in a local dev environment in Vagrant/VirtualBox) to install Replicated with Swarm.

```bash
curl -sSL https://get.replicated.com/swarm-init | sudo bash
```

### Update the Replicated Configuration

Find the private IP of the host:

```bash
sudo docker info --format "{{.Swarm.NodeAddr}}"
```

Update the `replicated_replicated` Swarm service and change the environment variable `MARKET_BASE_URL` to `http://[private-ip-address]:8006`. For example if your the ip you obtained from the previous command was `10.138.0.4` you will run the following:

```bash
sudo docker service update replicated_replicated \
    --env-add MARKET_BASE_URL=http://10.138.0.4:8006
```

### Run Replicated Studio

```bash
mkdir -p $HOME/replicated

sudo docker run --name studio -d \
    --restart always \
    -v $HOME/replicated:/replicated \
    -p 8006:8006 \
    replicated/studio:latest
```


{{< linked_headline "Iterate on your application YAML" >}}

During installation, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will setup the most recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio will create a new release using the next available sequence number.

You can also use your favorite editor locally (like Atom, Visual Studio Code, Vim, or Emacs) and upload your changes once you're ready. For example, to copy your YAML using `scp`:

```bash
scp current.yaml [myuser]@[my.development.host]:/home/[myuser]/replicated
```

After you have uploaded your `current.yaml` changes, you can navigate to your on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to see your new release.

**_Note: In the directory `~/replicated/releases` you can view a copy of each release Replicated Studio has created along the way._**
If you supply an invalid yaml file that isn't recognized as a valid update in the on-prem UI, you can simply `rm` the invalid release iteration from the Studio server directory `~/replicated/releases` and `scp` a fixed version to `current.yaml`.

{{< linked_headline "Iterate on your Application Images" >}}

As well as being able to iterate on your application YAML, you can also use Studio to iterate on your Docker images. This simplifies the development workflow when you need to make changes to your code base to support on-prem deployments.

To do this, rebuild your Docker images on your Studio server reusing the existing tags. Once you restart the application from the on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) or CLI, your updated images will be used by Replicated.

**_Note: When iterating on Docker images in Studio, referencing local Docker images using the `latest` tag is not supported. Replicated will re-pull any images with the `latest` tag, thus overwriting any changes you are making locally._**

{{< linked_headline "Additional features" >}}

The logs from Replicated Studio display any lint or syntax issues detected in your application yaml. You can also view all interactions the on-prem Replicated has with the Studio API.

You can follow these logs in real time using:

```bash
docker logs -f studio
```
