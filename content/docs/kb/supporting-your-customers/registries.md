---
date: "2016-07-22T00:00:00Z"
lastmod: "2016-07-22T00:00:00Z"
title: "Registries"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: [""]
kb-sections: ["Development Process"]
---

When your customer is installing or updating your application, Replicated is responsible for pulling all required Docker images into the environment. These images can come from a variety of sources and each customer environment is a little different. Replicated makes use of various methods to securely deliver the Docker images to all of your customer's nodes, and understanding how this works can be useful with troubleshooting.

## Replicated Images
To use the private Docker Registry that Replicated hosts for each application please see the [Replicated registry integration guide](/docs/getting-started/replicated-private-registry/).

When you use the Replicated private registry, Replicated will always use the Docker client to pull your images. The Replicated registry is a secure, private-only registry that is closely integrated with our licensing feature. Your developers and API tokens can push and pull images to and from this registry. A customer's license is used for authentication during installation and update on-prem. The customer's license credentials is only granted pull permissions to your images.

## Public Images
When your application makes use of public images, Replicated uses the Docker Remote API to pull the image. Nothing special is needed to support this, and Replicated supports this automatically.

## Private Images
To use images in a private (non-Replicated) registry, see the guide for [integrating a third party registry](/docs/kb/developer-resources/third-party-registries/).

Our servers provide a proxy to securely deliver these external images only to licenses that you create and authorize (without sharing the registry credentials you provided). When the on-prem component attempts to pull a private image, Replicated will open an HTTPS connection to a service we host. Once the connection is authenticated and verified, the Replicated proxy will stream the Docker layers and manifest to the on-prem server. The on-prem server then uses the Docker Remote API to `docker load` this image into Docker.

We currently support the Docker registry protocol version 2 and version 2.2. In current versions of Replicated, we've removed support for importing private images that only support the Docker registry protocol version 1.
