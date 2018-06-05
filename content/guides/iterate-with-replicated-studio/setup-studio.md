---
date: "2018-05-25T12:00:00Z"
title: "Install Replicated Studio and ngrok"
description: "Set Up Replicated Studio on your local machine"
weight: "9011"
categories: [ "Replicated Studio Guide" ]
index: "guides/studio"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/setup-studio]
---

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

