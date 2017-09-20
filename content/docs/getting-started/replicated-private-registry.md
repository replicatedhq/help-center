---
date: "2016-07-03T04:02:20Z"
title: "Replicated Private Registry"
description: "How to push and access private images in Replicated's hosted private registry."
weight: "105"
categories: [ "Getting Started" ]
tags: [ "Replicated Vendor" ]
index: "docs"
---

When building your application, you have the option of hosting your private images on the Replicated private registry or [using external private and public registries](/docs/kb/supporting-your-customers/registries/).

{{< linked_headline "Tagging Images" >}}

The first thing you will need to do is tag your image. Replicated accepts images in the standard Docker format: `registry.replicated.com/<application-slug>/<image-name>:<version>`. You can find your application slug on the Images tab of the [Replicated Vendor Portal](https://vendor.replicated.com/#/images).

An example of tagging an existing image is:

```shell
$ sudo docker tag myapp/worker registry.replicated.com/mycounterapp/worker:1.0.1
```

{{< linked_headline "Logging In" >}}

Next you will need to log into the Replicated private registry with your Vendor account credentials. When prompted, you will use your email address for your username.

```shell
$ sudo docker login registry.replicated.com
Username: john@replicated.com
Password: <your password>
Login Succeeded
```

{{< linked_headline "Pushing Images" >}}

Finally you can push your image to the Replicated private registry.

```shell
$ sudo docker push registry.replicated.com/mycounterapp/worker:1.0.1
The push refers to a repository [registry.replicated.com/mycounterapp/worker] (len: 1)
Sending image list
Pushing repository registry.replicated.com/mycounterapp/worker (1 tags)
07595b42e5d5: Image successfully pushed
f9910c2fd14a: Image successfully pushed
4f409c5d1046: Image successfully pushed
8e471642d573: Image successfully pushed
Pushing tag for rev [8e471642d573] on {https://registry.replicated.com/v1/repositories/mycounterapp/worker/tags/1.0.1}
```

For additional information on building, tagging and pushing docker images, please refer to the
[Docker CLI Documentation](https://docs.docker.com/engine/reference/commandline/cli/).

{{< linked_headline "Deploying to Kubernetes" >}}

When deploying an application to a [Kubernetes](/docs/packaging-an-application/kubernetes) cluster, Replicated will automatically deploy a secret named `replicatedregistrykey`. This secret can be used as an `imagePullSecret` to gain read-only access to the images from the on-prem environment.

For example:

```yaml
     spec:
       containers:
       - name: frontend
         image: registry.replicated.com/guestbook/gb-frontend:v4
         ...
       imagePullSecrets:
       - name: replicatedregistrykey
```

{{< linked_headline "Deploying to Swarm" >}}

When deploying an application to a [swarm](/docs/packaging-an-application/docker-swarm) cluster, just reference the image in the Replicated registry. Replicated will automatically authenticate with the registry using the customer's license.

For example:

```
version: '3.1'

services:
  megaladon:
    image: registry.replicated.com/guestbook/gb-frontend:v4
    deploy:
      replicas: 1
```