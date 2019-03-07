---
date: "2018-05-01T19:00:00Z"
title: "Packaging A Kubernetes Application"
description: "A walkthrough of taking an example Kubernetes application and packaging it in Replicated Ship"
weight: "30102"
categories: [ "Get Started with Ship" ]
index: "guides/ship"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
---

{{< linked_headline "Create an Application" >}}

To begin, log in (or create an account) on [vendor.replicated.com](https://vendor.replicated.com). If you already have an account on [console.replicated.com](https://console.replicated.com), you can use it here too. 

If this is your first time logging in, you'll be presented with a "Create your Application" page. If not, you'll need to click `Create new app` in the top-left application selector.

![shipvendor-create-app-1](/images/guides/ship/create-app-1.png)

You'll want to select `Replicated + Kubernetes`, and then select `Kubernetes + Replicated Ship`.

![shipvendor-create-app-2](/images/guides/ship/create-app-2.png)

{{< note title="Ship for Non-Kubernetes Applications" >}}
As noted in the [introduction](../introduction), Ship has deep Kubernetes integration, but it is not 
limited to Kubernetes. If you are distributing other assets like Terraform, Ansible, or Bash Scripts,
you should still choose the "Kubernetes + Replicated Ship" option.
{{< /note >}}

{{< linked_headline "Get Started With Release Channels" >}}

By default, three release channels are created - Stable, Beta and Nightly. We'll start with a release on the Nightly channel. Once we've done some testing, we'll promote it to Beta. You'll generally use the "Stable" channel for releasing new versions of your app to end customers' production environments. 

![Default Channels](/images/guides/ship/default-channels.png)

{{< linked_headline "Create a Release" >}}

Next, you'll want to navigate to "Releases" and create a new release.

![Create Release](/images/guides/ship/create-release-vw.png)


{{< linked_headline "Editing a Release" >}}

A Ship release is a yaml file describing the assets to include, the configuration options to present to the installer, and what text to display at runtime. We'll use the builtin editor on console to get started.

![Edit Yaml](/images/guides/ship/edit-release-vw.png)

There are three sections to the Ship yaml - assets, config, and lifecycle. We'll cover each YAML section separately, but the full YAML used here can also be found [in the ship repo](https://github.com/replicatedhq/ship/blob/nginx-example/fixtures/just-nginx/ship.yaml). 

{{< linked_headline "Assets" >}}

  The `assets` section describes the files that ship will create when run. There are [many types of assets](/api/ship-assets/assets) currently supported in Ship, though we'll only be using `inline` here. `inline` assets create templated files at the destination location, while `docker` assets do the same with exported Docker images. For the purposes of this demo, we'll be using public Docker images with no allowance for airgapped installations, but if we wanted to support airgapped installations, we would explicitly include all the Docker images within the Ship yaml.

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

  

{{< linked_headline "Config" >}}

The `config` section can be used to collect application-specific config from your end user at installation time. It is greatly expanded upon [here](/docs/config-screen/config-yaml/). There are a few exceptions to the core configuration DSL when using Ship, but these docs serve as a good starting point.

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


{{< linked_headline "Lifecycle" >}}

  The `lifecycle` section is the messaging that will be seen by the end user. Contents will be printed to the screen in order during execution, with `render: {}` being replaced with the configuration options. Message levels change the color of the rendered text, and can be `debug`, `info` (the default), `warn` or `error`.

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

{{< linked_headline "Promote Release" >}}

Once we've finished editing our yaml, we can promote a release from it. Head back to the Releases tab and click "Promote".

![Promote Release](/images/guides/ship/promote-release-1.png)

Next, give this release a version, and promote to the "Nightly" channel.

![Promote Release](/images/guides/ship/promote-release-2.png)

{{< linked_headline "Create a Customer" >}}

Before we can test our app, we need to create a customer and add them to the Nightly channel. 

![Create Customer](/images/guides/ship/create-customer-1.png)

Since Nightly releases shouldn't be going to production, we'll call our customer `A Test Customer` and set the license type to "Development". You can also set an expiration date if you'd like.

![Create Customer](/images/guides/ship/create-customer-2.png)


{{< linked_headline "Next Steps" >}}

Now that's we've created and shipped the first version of our application, continue to the [next section](../installing) to learn how an enterprise customer will install this release.
