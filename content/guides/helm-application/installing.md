---
date: "2018-05-01T19:00:00Z"
title: "Testing The Customer Installation"
description: "A step-by-step guide of what the experience will be like installing the application"
weight: "30003"
categories: [ "Ship Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< linked_headline "Installing the Release" >}}

Now we can produce an installation script for our test customer.

![Install A Release](/images/guides/ship/install-script.png)

Copy the command from this screen, and take it to a workstation that has Docker installed, and run it. This is how you can distribute software that's packaged in Ship.

```shell
$ curl -sSL -o docker-compose.yml \           
  "https://get.replicated.com/compose/ship.yml?customer_id=1751bb0c1d374338ff5f6d9184af5b0d&installation_id=VGKaaabSQek8lYgZzZU5AzQiw4tkZhMq" && \
  docker-compose pull && \
  docker-compose up --abort-on-container-exit

Creating network "marc_default" with the default driver
Creating marc_ship_1    ... done
Creating marc_console_1 ... done
Attaching to marc_ship_1, marc_console_1
```