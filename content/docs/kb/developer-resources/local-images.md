---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Speed Up Development By Using Local Images"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
kb-sections: ["Development Process"]
---

Shorten the development workflow of iterating on your container images. Here's how:

1. During development use a static tag for your image & YAML reference to the image (just don't use "latest" as we always pull latest).
1. Stop the application in Replicated and do a docker build of the image on the machine running the Replicated daemon.
1. For public images tag the image with the name as it appears in your app YAML (for instance "image_name: alpine" and "version: 3.4" should be tagged as alpine:3.4)
1. For third party private registry images tag the image with the full name including the registry path. For example: registry.replicated.com/example/counter:1.0.1 (you can find the name using `docker images`).
1. Use the Start button on the Replicated dashboard and your newly built images will be used without the need for you to push and pull.

To ensure reproducible installs once you are done with development increment the tag, push it to your repository and update the app YAML to use the new tag. Do not overwrite images used in prior releases.

Since Replicated is not installing the new images but using what is already available on the host it will not clean up the old images so you should occasionally delete older versions of your images.
