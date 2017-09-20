---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Third Party Registries"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML", "Replicated Vendor"]
---

Replicated can integrate with your third party private registry (ie Docker Trusted Registry, Quay.io etc). To connect to these external registries
you'll need to connect your vendor account to these accounts on the [app settings page](https://vendor.replicated.com/#/settings).

You'll need to provide us with a reference name, endpoint, username, password and email address (we recommend creating a specific account for
Replicated with read-only access to use).

Your credentials will never be shared or used by the customer to pull your images, instead your images will be proxied by us for each
installation.

To access these images in your YAML you'll need to use the reference name as the source & then the image name will need to provide the image
name location, along with the version tag.

```yaml
components:
- name: App
  containers:
  - source: mythirdpartyprivateregistry
    image_name: namespace/imagename
    version: 2.0.0
```
