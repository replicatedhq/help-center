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

Once your application is working in Docker, you'll want to set up a simple environment to iterate on your Replicated YAML. Our Replicated Studio is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

{{< linked_headline "Easy Install (Recommended)" >}}

This script will install Kubernetes, Replicated, and Studio on your development machine (on a Linux server in your IaaS provider of choice, or in a local dev environment in Vagrant/VirtualBox).

```bash
curl -sSL https://get.replicated.com/studio-k8s | sudo bash
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
