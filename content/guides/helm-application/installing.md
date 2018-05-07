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
$ curl -sSL https://raw.githubusercontent.com/replicatedhq/replicated-installer/master/install_scripts/templates/ship-install-static.yml |       CUSTOMER_ID="d83865968533497c49d57192ce49f7cc"  docker-compose -f -  up
WARNING: The CUSTOMER_ENDPOINT variable is not set. Defaulting to a blank string.
WARNING: The LOG_LEVEL variable is not set. Defaulting to a blank string.
Creating network "marc_default" with the default driver
Creating marc_ship_1    ... done
Creating marc_console_1 ... done
Attaching to marc_ship_1, marc_console_1
```