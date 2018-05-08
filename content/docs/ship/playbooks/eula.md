---
date: "2018-05-02T01:19:20Z"
title: "Requiring a EULA"
description: "Delivering a EULA with Replicated Ship"
weight: "44007"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Requiring a EULA" >}}

Many applications require that the installer accept an end user license agreement (EULA) before downloading any assets or images, and before starting the configuration process.

Replicated Ship can require that the customer agree to a license agreement before any images are downloaded by using a custom `lifecycle` step in the YAML. This step should be the first step in the `lifecycle` section:

```yaml
lifecycle:
  v1:
    - message:
        contents: |
          **End User License Agreement**

          1. We grant you one license to install and use this software on a single computer. You may create backups to the software but do not circulate/distribute them in public. If you do not agree to the following terms of this license, please uninstall and remove all copies and return the product to the place that you purchased it from within 30 days of your purchase for a proportionate refund.

          ...

    - render: {}
```