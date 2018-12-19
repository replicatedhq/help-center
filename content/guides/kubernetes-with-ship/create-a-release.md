---
date: "2018-05-01T19:00:00Z"
title: "Packaging A Kubernetes Application"
description: "A walkthrough of taking an example Kubernetes application and packaging it in Replicated Ship"
weight: "30002"
categories: [ "Ship Guide" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< linked_headline "Create a Customer" >}}

To begin, log in (or create an account) on [console.replicated.com](https://console.replicated.com). If you already have an account on [vendor.replicated.com](https://vendor.replicated.com), you can use it here too. After signing up and activating your account, you'll be presented with the opportunity to create a new customer. Here we'll be using 'ATestCustomer'.

![Create Customer](/images/guides/ship/created-customer.png)

{{< linked_headline "Navigate To Ship" >}}

The Ship product page can be found through the 'Products' dropdown.

![Products Dropdown](/images/guides/ship/products-dropdown.png)

If you haven't visited before, you'll see a prompt to get started with Release Channels.

![Release Channels](/images/guides/ship/release-channels.png)

{{< linked_headline "Get Started With Release Channels" >}}

By default, three release channels are created - Stable, Beta and Nightly. We'll start with a release on the Nightly channel. Once we've done some testing, we'll promote it to Beta.

![Create Release Channel](/images/guides/ship/stable-beta-nightly.png)

{{< linked_headline "Editing a Release" >}}

A Ship release is a yaml file describing the assets to include, the configuration options to present to the installer, and what text to display at runtime. We'll use the builtin editor on console to get started.

![Edit Yaml](/images/guides/ship/edit-release.png)

There are three sections to the Ship yaml - assets, config, and lifecycle. The yaml here can also be found [in the ship repo](https://github.com/replicatedhq/ship/blob/nginx-example/fixtures/just-nginx/ship.yaml)

{{< linked_headline "Assets" >}}


```yaml
assets:
  v1:
  - inline:
      contents: |
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: example-nginx
          labels:
            component: nginx
        spec:
          replicas: {{repl ConfigOption "nginx_replicas" }}
          selector:
            matchLabels:
              component: nginx
          template:
            metadata:
              labels:
                component: nginx
            spec:
              containers:
                - name: nginx
                  image: nginx
      dest: k8s/nginx-deployment.yaml
      mode: 0644
  - inline:
      contents: |
        apiVersion: v1
        kind: Service
        metadata:
          name: example-nginx
          labels:
            component: nginx
        spec:
          type: LoadBalancer
          ports:
          - port: 80
          selector:
            component: nginx
      dest: k8s/nginx-service.yaml
      mode: 0644
```

  The `assets` section describes the files that ship will create when run. There are [many types of assets](/api/ship-assets/assets) currently supported in Ship, though we'll only be using `inline` here. `inline` assets create templated files at the destination location, while `docker` assets do the same with exported Docker images. For the purposes of this demo, we'll be using public Docker images with no allowance for airgapped installations, but if we wanted to support airgapped installations, we would explicitly include all the Docker images within the Ship yaml.
  

{{< linked_headline "Config" >}}

```yaml
config:
  v1:
    - name: nginx
      title: Nginx Settings
      description: Nginx configuration
      items:
      - name: nginx_replicas
        title: Nginx Replicas
        help_text: How many replicas do you need to run?
        type: text
        default: 3
      - name: nginx_memory
        title: Nginx Memory
        type: text
        default: 100Mi
```

The `config` section can be used to collect application-specific config from your end user at installation time. It is greatly expanded upon [here](https://help.replicated.com/docs/config-screen/config-yaml/). There are a few exceptions to the core configuration DSL when using Ship, but these docs serve as a good starting point.

{{< linked_headline "Lifecycle" >}}

```yaml
lifecycle:
  v1:
    # custom markdown messaging 
    - message:
        contents: |
          # Nginx Installer

          This installer will walk you through setting up a scalable nginx pool 
          that will serve high-quality, relevant web content.
    - message:
        contents: |
          # Prerequisites

          This installer assumes you already have a Kubernetes cluster up and running,
          and that you have `kubectl` configured to access that cluster.

    # collect info according to the `config` section
    - config:
        invalidates: ["render"]
    # render assets
    - render:
        requires: ["config"]
    - message:
        id: outro
        contents: |
          ## You're all set!

          If you have `kubectl` configured locally, you can deploy nginx by running

              kubectl apply -f installer/k8s/
```

  The `lifecycle` section is the messaging that will be seen by the end user. Contents will be printed to the screen in order during execution, with `render: {}` being replaced with the configuration options. Message levels change the color of the rendered text, and can be `debug`, `info` (the default), `warn` or `error`.

Once we've finished editing our yaml, we can create a release from it.

![Create Release](/images/guides/ship/create-release.png)

{{< linked_headline "Add Customer To Channel" >}}

Before we can test our app, we need to add a customer to the channel. Since Nightly releases shouldn't be going to production, we'll add ATestCustomer.

![Add Customer To Channel](/images/guides/ship/channel-details-withcust.png)

{{< linked_headline "Next Steps" >}}

Now that's we've created and shipped the first version of our application, continue to the [next section](../installing) to learn how an enterprise customer will install this release.
