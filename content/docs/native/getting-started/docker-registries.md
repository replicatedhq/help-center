---
date: "2016-07-03T04:02:20Z"
title: "Docker Registries"
description: "How to push and access private images in Replicated's hosted private registry."
weight: "105"
categories: [ "Replicated Scheduler" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
aliases: [/docs/getting-started/replicated-private-registry/,/docs/kb/supporting-your-customers/registries/]
---

When building your application, you have the option to use the Replicated private registry, or any supported external private or public registry.

{{< linked_headline "Replicated Registry" >}}

Every application created in Replicated has a private, [completely isolated](/docs/registry/security) Docker registry available. You can push images to your private registry by finding the endpoint at (https://vendor.replicated.com/#/images) and using the Docker CLI to tag and push images. The Replicated Native Scheduler has built in support for the private registry, and will automatically authenticate with read-only access from a customer license file.

{{< linked_headline "Tagging Images" >}}

The first thing you will need to do is tag your image. Replicated accepts images in the standard Docker format: `registry.replicated.com/<application-slug>/<image-name>:<version>`. You can find your application slug on the Images page of the [Replicated Vendor Portal](https://vendor.replicated.com/#/images).

An example of tagging an existing image is:

```shell
$ sudo docker tag worker registry.replicated.com/myapp/worker:1.0.1
```

{{< linked_headline "Logging In" >}}

Next you will need to log into the Replicated private registry with your account credentials. When prompted, you will use your email address for your username.

```shell
$ sudo docker login registry.replicated.com
Username: my@mycompany.com
Password: <your password>
Login Succeeded
```

{{< linked_headline "Pushing Images" >}}

Finally you can push your image to the Replicated private registry.

```shell
$ sudo docker push registry.replicated.com/myapp/worker:1.0.1
The push refers to a repository [registry.replicated.com/myapp/worker] (len: 1)
Sending image list
Pushing repository registry.replicated.com/myapp/worker (1 tags)
07595b42e5d5: Image successfully pushed
f9910c2fd14a: Image successfully pushed
4f409c5d1046: Image successfully pushed
8e471642d573: Image successfully pushed
Pushing tag for rev [8e471642d573] on {https://registry.replicated.com/v1/repositories/myapp/worker/tags/1.0.1}
```

For additional information on building, tagging and pushing docker images, please refer to the
[Docker CLI Documentation](https://docs.docker.com/engine/reference/commandline/cli/).

{{< linked_headline "Supported External Registries" >}}

The Replicated Native Scheduler supports pulling public, unauthenticated images from any Docker registry that supports the standard [Docker Registry HTTP API](https://docs.docker.com/registry/spec/api/).

Additionally, the Replicated Native Scheduler supports private images hosted in other registries including Docker Hub, Quay.io and more.
