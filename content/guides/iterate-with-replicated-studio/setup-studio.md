---
date: "2018-05-25T12:00:00Z"
title: "Install Replicated Studio and ngrok"
description: "Setup Replicated Studio on your local machine"
weight: "9011"
categories: [ "Replicated Studio Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/setup-studio]
---

In order to get your application working with Replicated, you'll want to set up a simple environment to iterate on your Replicated YAML and images. Our Replicated Studio is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

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

{{< linked_headline "Install Replicated Studio (without ngrok)" >}}

It is also possible to use Replicated Studio without ngrok. This requires Replicated Studio to run on the same server as the Replicated instance you're debugging with. Instructions can be found at these links for [Native](https://help.replicated.com/community/t/iterating-on-yaml-with-studio-without-ngrok/150/2), [Swarm](https://help.replicated.com/community/t/using-studio-without-ngrok-docker-swarm/149/2) and [Kubernetes](https://help.replicated.com/community/t/using-studio-without-ngrok-kubernetes/148/2).

You'll use `http://127.0.0.1:8006` instead of an ngrok hostname when installing Replicated.
