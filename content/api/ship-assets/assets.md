---
categories:
- ship-assets
date: 2018-01-17T23:51:55Z
description: Reference Documentation for defining your Ship application assets 
index: docs
title: Assets
weight: "1"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## Ship Assets

This is the reference documenation for Ship assets. To get started with Ship, head on over to [Ship Guides](/guides/ship/)

Assets are the core object that enables you to describe applications managed by Ship. They allow you to define scripts, manifests, and application artifacts needed to deploy your application to your end customer's internal infrastructure. The goal of Ship assets is to give your customers controlled, transparent access to the same resources you use to deploy your SaaS application to your own private cloud. Assets can include things like:

- Scripts for installing and upgrading your application to a cloud server
- Private Docker images or `tar.gz` archives
- Container orchestration manifests for Kubernetes or Docker Compose
- Modules for infrastructure automation tools like Chef, Ansible, Salt, or Puppet

Documented here are a number of methods Ship provides to facilitating distributing assets to your on-prem customers.

- Inline in your application spec
- Proxied from to private docker registries
- (coming soon) Proxied from to private github repos
- (coming soon) Mirrored from public github repos

In ship, a short assets section to pull and run a private docker container might look like

```yaml
assets:
  v1:
    - docker:
        dest: images/myimage.tar
        image: registry.replicated.com/myapp/myimage:1.0
        source: replicated
    - inline:
        dest: scripts/install.sh
        mode: 755
        contents: | 
          #!/bin/bash
          
          echo "starting the application..."
          docker load < images/myimage.tar
          docker run -d registry.replicated.com/myapp/myimage:1.0
          
          echo "started!"
          exit 0
        
```

We're always interested to hear more about how you're deploying your application to your customers, if there's an asset delivery method you'd like to see, drop us a line at https://vendor.replicated.com/support or https://help.replicated.com/community.

