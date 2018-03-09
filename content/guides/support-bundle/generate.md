---
date: "2018-01-30T04:02:20Z"
title: "Generate a Support Bundle"
description: "How to get a support bundle from a customer"
weight: "802"
categories: [ "Support Bundle" ]
index: "guides"
type: "chapter"
gradient: "orangeToOrange"
icon: "troubleshoot"
---

Once you've [created a support bundle spec](/guides/support-bundle/spec), you can give a command to your customer to generate a support bundle based on the spec. If you change the spec to include additional collected files, the command your customer will run doesn't change.

To collect a support bundle, find the customer on [https://console.replicated.com/customers](https://console.replicated.com/customers) and go to the Customers list. Select the customer and click the "Generate a support bundle" link. There will be a single `docker run` command that's customized for this one customer. Give this command to your customer, and when they run it, it will always download the latest support bundle spec from Replicated before generating.

```shell
$ sudo docker run --interactive --tty --rm --name support-bundle --volume $PWD:/out --volume /var/run/docker.sock:/var/run/docker.sock --workdir /out replicated/support-bundle:alpha generate --customer-id "<ID>"

Starting support bundle collection...
Done! Do you want to upload the support bundle for analysis? [Y/n]: Y
Upload complete!
```

If your customer chooses to upload the support bundle for analysis, visit [https://console.replicated.com/support/bundles](https://console.replicated.com/support/bundles) to view and download the bundle.
