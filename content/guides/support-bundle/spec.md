---
date: "2018-01-30T04:02:20Z"
title: "Support Bundle Specs"
description: "A guide to creating your first support bundle specification for generating bundles"
weight: "801"
categories: [ "Support Bundle" ]
index: "guides"
type: "chapter"
gradient: "orangeToOrange"
icon: "troubleshoot"
---

The Support Bundle is a standalone tool that you can use to retrieve and upload troubleshooting data from servers that aren't running the full Replicated software, when Replicated will not start, or for servers that you don't have access to. In this guide, we will sign up for the Replicated Console, and create our first support bundle spec.

The [Replicated Console](https://console.repliated.com) is your primary portal for managing support bundle specifications, the support bundles generated from them, and your customers. Sign up and login to the console, then click the `Get started with Troubleshoot` button.

![](/images/guides/support-bundle/troubleshoot.png)

## Create a Customer

The first time you use the Replicated Console to troubleshoot, you will be asked to create you first customer. Enter a name and email for your customer, then click "Create Customer". These identifiers are used in the console to identify who has uploaded a bundle.

![](/images/guides/support-bundle/create-customer.png)

## Create Your First Spec

With your first customer created, you will now be prompted to create your first spec. Enter a name for your spec. This will be used for when you want multiple specs for different purposes. Now, select the "Docker" and "Operating system info", which are good defaults for a system just running Docker. After that, click "Set defaults" to the next page.

![](/images/guides/support-bundle/create-spec.png)

## Next Steps

Now that you've created your first support bundle spec, you will be brought to a page with a command and a place to upload a bundle.

![](/images/guides/support-bundle/upload-spec.png)

In the next sections, we will run this command, analyze our bundle, and begin iterating on our support bundle specification.
