---
date: "2018-05-25T12:00:00Z"
title: "Why Should I Use Replicated Studio"
description: "What Replicated Studio is, what it does, and why you should use it"
weight: "9010"
categories: [ "Replicated Studio Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/why-studio]
---

In order to get your application working with Replicated, you'll want to set up a simple environment to iterate on your Replicated YAML and images. Our Replicated Studio is designed to shorten the cycle between writing and testing YAML and will recommend best practices to help you solve problems quickly.

Replicated Studio is designed to allow you to make changes to a local file and have those changes immediately available to a Replicated instance running on a remote server. This is done by running a replacement for the Replicated APIs on your device that proxies most requests to the actual Replicated API while serving requests for the application yaml from the files stored locally on your computer. This allows you to create releases that are visible to your test installation without having to go through vendor.replicated.com or the [Replicated Vendor API](https://help.replicated.com/api/vendor-api/). To do this, Replicated Studio watches a file `~/replicated/current.yaml` and publishes a new release every time the file is modified. Studio is exposed to the remote Replicated installation with [ngrok](https://ngrok.com/).
