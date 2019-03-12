---
date: "2018-03-03T04:02:20Z"
title: "Docker Registries"
description: "How to push and access private images in Replicated's hosted private registry."
weight: "40004"
categories: [ "Ship" ]
index: ["docs/ship", "docs"]
gradient: "console"
icon: "replicatedShip"
---

When building your application, you have the option to use the Replicated private registry, or any supported external private or public registry.

{{< linked_headline "Replicated Registry" >}}

Every application created in Replicated has a private, [completely isolated](/docs/registry/security) private Docker registry available. You can push images to your private registry by finding the endpoint at (https://vendor.replicated.com/#/images) and using the Docker CLI to tag and push images. Replicated will automatically use the customer license file to authenticate and pull any images from the Replicated Registry.

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
Username: me@mycompany.com
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


{{< linked_headline "Using External Registries" >}}

Replicated supports pulling public, unauthenticated images from any Docker registry that supports the standard [Docker Registry HTTP API](https://docs.docker.com/registry/spec/api/).

Additionally, Replicated supports private images hosted in other registries including Docker Hub, Quay.io and more.

To use private images from an external registry, you need to add the registry via the Vendor website. The guide for [integrating a third party registry](https://help.replicated.com/community/t/using-third-party-registries/45/2) explains this in further detail.

{{< linked_headline "Referencing Images from the Replicated Registry and Private Registries" >}}

Images stored in the Replicated private registry or an external private registry can be accessed by [adding and configuring a static `imagePullSecrets`](/guides/kubernetes-with-ship/private-image/#create-image-pull-secret)  to any container definition that [references the image](/guides/kubernetes-with-ship/private-image/#pull-private-images).



{{< linked_headline "Working with existing Docker Registries for Airgap Scenarios" >}}

Ship applications can be configured to work with a customer's existing registry, in order to install into an airgap cluster.  See [this playbook](/docs/ship/playbooks/airgap-kubernetes) for details.
