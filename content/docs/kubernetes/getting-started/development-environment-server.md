---
date: "2016-07-03T04:02:20Z"
title: "Development Environment"
description: "How to set up an environment to ship with Replicated and Kubernetes"
weight: "2503"
categories:  [ "Shipping With Kubernetes" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
draft: "true"
---

Once your application is working in Docker, you'll want to set up a simple environment to iterate on your Replicated YAML. Our Replicated Studio is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

{{< linked_headline "Easy Install (Recommended)" >}}

This script will install Kubernetes, Replicated, and Studio on your development machine (on a Linux server in your IaaS provider of choice). [Custom install instructions](http://localhost:1313/docs/kubernetes/getting-started/development-environment/#replicated-studio-manual-install-advanced) available below.

```bash
curl -sSL https://get.replicated.com/studio-k8s | sudo bash
```

{{< linked_headline "Iterate on your application YAML" >}}

During installation, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will setup the most recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio will create a new release using the next available sequence number.

You can also use your favorite editor locally (like Atom, Visual Studio Code, Vim, or Emacs) and upload your changes once you're ready. For example, to copy your YAML using `scp`:

```bash
scp current.yaml [myuser]@[my.development.host]:/home/[myuser]/replicated
```

After you have uploaded your `current.yaml` changes, you can navigate to your on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to see your new release.

**_Note: In the directory `~/replicated/releases` you can view a copy of each release Replicated Studio has created along the way._**

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



{{< linked_headline "Replicated Studio Manual Install (Advanced)" >}}

If you need to customize your configuration, follow these three steps and adapt as needed rather than using the easy install script above.

1. Install [Replicated with Kubernetes](https://help.replicated.com/docs/kubernetes/customer-installations/installing/).

2. Run [Studio](https://github.com/replicatedhq/studio) in a Docker container.
```bash
    mkdir $HOME/replicated

    docker run --name studio -d \
         --restart always \
         -v $HOME/replicated:/replicated \
         -p 8006:8006 \
         replicated/studio:latest
```
3. Update the Replicated deployment in Kubernetes to point to the studio container.

```bash
    cat > /tmp/patch.yml <<EOF
spec:
  template:
    spec:
      containers:
      - name: replicated
        env:
        - name: MARKET_BASE_URL
          value: http://127.0.0.1:8006
EOF
    kubectl patch deployment/replicated --patch "$(cat /tmp/patch.yml)"
```
