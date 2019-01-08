---
date: "2016-07-03T04:02:20Z"
title: "Docker Registries"
description: "How to push and access private images in Replicated's hosted private registry."
weight: "2506"
categories: [ "Shipping With Kubernetes" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

When building your application, you have the option to use the Replicated private registry, or any supported external private or public registry.

{{< linked_headline "Replicated Registry" >}}

Every application created in Replicated has a private, [completely isolated](/docs/registry/security) private Docker registry available. You can push images to your private registry by finding the endpoint at (https://vendor.replicated.com/#/images) and using the Docker CLI to tag and push images. When using the Kubernetes Scheduler, Replicated will be able to automatically use the customer license file to authenticate and pull any images from the Replicated Registry.

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

Images stored in the Replicated private registry or an external private registry can be accessed by adding a static `imagePullSecrets` to any container definition that references the image. Replicated will automatically create a secret named `replicatedregistrykey` and deploy it into your application namespace. Note that if you specify namespaces in your Kubernetes spec, the resource will not be deployed to the application namespace and the secret required to pull private images will not be available.

Continuing the example above, if the application is using the image `registry.replicated.com/myapp/worker:1.0.1`, a minimal spec using an image in the Replicated registry might be:

```yaml
spec:
  containers:
  - name: worker
     image: registry.replicated.com/myapp/worker:1.0.1
  imagePullSecrets:
  - name: replicatedregistrykey
```

Referencing an external private image requires an extra step of specifying the image and its source in the `images` section of your Replicated yaml.
If you have a private image such as `quay.io/namespace/imagename:2.0.0` and you have configured your `quay.io/namespace` registry on the Vendor website as `mythirdpartyprivateregistry`, then you can specify the image in your Replicated yaml as:

```yaml
images:
- source: mythirdpartyprivateregistry
  name: namespace/imagename
  tag: 2.0.0
```

You can then use the image in your Kubernetes specs.

```yaml
spec:
  containers:
  - name: worker
    image: quay.io/namespace/imagename:2.0.0
  imagePullSecrets:
  - name: replicatedregistrykey
```

Note that the `imagePullSecrets` name will *always* be `replicatedregistrykey`, regardless of the repository used for `source` in the `images` section above.


When starting the applicaiton, Replicated will rewrite this spec to pull the image from `registry.replicated.com`, which will in turn proxy the image from `quay.io/namespace`. Credentials for `quay.io/namespace` are never sent to customer installations.
When configuring Docker Hub as your external private registry, always specify the endpoint as `index.docker.io`.
Always use the latest API version of a resource to ensure that the images will be correctly rewritten by Replicated.
Replicated will rewrite the images in an `apps/v1` Deployment, for example, but not an `apps/v1beta1` or `extensions/v1beta1` Deployment.
See the [guestbook](/docs/kubernetes/examples/guestbook/) app with examples of private, external, and public images.

{{< linked_headline "Bundling Airgap Images" >}}

All images included in your Kubernetes application must be specified in the `images` section of your YAML in order to be included in the airgap bundle your customer will download and install.

```yaml
images:
- source: mythirdpartyprivateregistry
  name: namespace/imagename
  tag: 2.0.0
- source: public
  name: redis
  tag: 3.2-alpine
- source: public
  name: postgres
  tag: 9.4
- source: replicated
  name: app
  tag: v1
```

Kubernetes will attempt to pull any images with a `latest` tag by default, even when available locally. To ensure successful airgap installs, either avoid using the `latest` tag or set the `imagePullPolicy` to `IfNotPresent`.
