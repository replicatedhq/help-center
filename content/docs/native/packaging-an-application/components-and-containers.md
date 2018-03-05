---
date: "2016-07-03T04:02:20Z"
title: "Components And Containers"
description: "The components section of the Replicated YAML defines how the containers will be created and started."
weight: "202"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
aliases: [/docs/packaging-an-application/components-and-containers/]
---

The `components` section of the YAML defines how the containers will be created and started. A component is
a group of one or more containers that are guaranteed to run on the same node.

An example of a component using the common options is below. We've also create an example of a [component and container that uses every possible option in our examples](/docs/native/examples/every_component_option/).

```yaml
components:
  - name: Worker
    containers:
      - source: replicated
        image_name: worker
        version: 1.0.1
        name: worker
        ports:
          - private_port: "8080"
            public_port: "80"
        volumes:
          - host_path: /opt/myapp/worker
            container_path: /state
        env_vars:
          - name: REDIS_URI
            value: 'redis://{{repl NodePrivateIPAddress "Redis" "redis"}}:{{repl ContainerExposedPort "Redis" "redis" "6379"}}
```

{{< linked_headline "component" >}}

All containers are defined under components. A component is a definition of one or more containers, colocated on the same host. When using clustering in the Replicated Native Scheduler, a component is placed on a node and a component is the object that can be scaled up and down as needed.

A component is required to have a name, but can include an optional values documented in the [clustering](/docs/native/packaging-an-application/clustering) section of these docs.

{{< linked_headline "containers" >}}

The `containers` key is an array of all Docker containers that belong to this component. There's no limit on the number of containers you can create in a component. For each container, there's some basic required information:

{{< linked_headline "source" >}}

The `source` field is a reference to the Docker registry where this container image can be pulled from.

If using the [Replicated Registry](/docs/native/getting-started/docker-registries/), set this to `source: replicated`. Nothing else is required; the Replicated Native Scheduler will find the image from the license file and have access to it.

If referencing a public image that doesn't require any authentication to pull, set this to `source: public`. Replicated will automatically pull this image when needed.

If referencing a private image that requires authentication and is stored on a non-Replicated registry (Docker Hub, Quay.io, etc), then this should be set to the "reference" name you used when adding the registry to the [vendor portal](https://vendor.replicated.com). For example, if I set up an external registry and named it `dockerhub`, then this should be set to `source: dockerhub`.

{{< linked_headline "image_name" >}}

The `image_name` key is the name of the image to be pulled. The format of this varies a little depending on the image `source` type:

- When `source: "replicated"`, this should be just the image name, without any hostname or namespace.

```yaml
- source: replicated
  image_name: worker
```

- When `source: "public"`, this should be set to the full URI of the image, including the hostname and namespace (if required).

```yaml
- source: public
  image_name: redis
```

```yaml
- source: public
  image_name: docker.elastic.co/elasticsearch/elasticsearch
```

- When `source: "<custom>"`, this should be set to the namespace and image name, but exclude the hostname.

```yaml
- source: dockerhub
  image_name: myorg/worker
```


{{< linked_headline "version" >}}

The `version` key is the tag of the docker image. If missing, it will follow the Docker convention of using `latest`.

