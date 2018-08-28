---
date: "2018-05-25T12:00:00Z"
title: "Iterate and Test Updates"
description: "A guide to walk you through iterating and updating a release in Replicated"
weight: "9013"
categories: [ "Replicated Studio Guide" ]
index: "guides/studio"
type: "chapter"
gradient: "redToRed"
icon: "replicatedCircle"
aliases: [/guides/iterate-studio]
---

{{< linked_headline "Iterate on your application YAML" >}}

During Studio installation on your local development machine, a new directory named `replicated` is created in your home directory. Once your license is activated, Replicated Studio will set up the most recent release and save it to `~/replicated/current.yaml`. Any time this file is updated and saved, Replicated Studio will create a new release using the next available sequence number. To start you'll probably want to copy and paste your most recent yaml as the downloading process often adds in default `null` values.

From there you can use your favorite editor locally (like Atom, Visual Studio Code, Vim, or Emacs) and saved changes will trigger new updates available to your development server.

**_Note: In the directory `~/replicated/releases/` you can view a copy of each release Replicated Studio has created along the way._**
If you supply an invalid yaml file that isn't recognized as a valid update in the on-prem UI, you can simply delete the invalid release iteration from the local directory `~/replicated/releases` save a new version of `current.yaml`.

### Applying updates to the dev server

After you have saved your `current.yaml` changes, you can navigate to your on-prem Admin Console (`https://<YOUR SERVER ADDRESS>:8800`) and click the `Check for updates` button to see your new release.

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
