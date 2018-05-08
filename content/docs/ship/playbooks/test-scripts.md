---
date: "2018-05-02T01:19:20Z"
title: "Test Scripts"
description: "Delivering test scripts with a Ship application"
weight: "44005"
categories: [ "Ship Playbooks" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Test Scripts" >}}

One of the features of using Replicated Ship to deploy the enterprise-installable version of an application is the automation that it enables for the end customer. Ship creates the possibility to enable a full CI/CD process to install updates to enterprise applications in any environment, including airgapped networks.

An important asset to deliver to fully enable a continuous delivery update process is test scripts. Anything that can be tested, should be tested in the enterprise environment before deploying to their production system.

{{< linked_headline "Delivering a test/test.sh script" >}}

A good practice is to include end-to-end testing with your application. This can be accomplished with a simple asset, but needs to be changed to the method used to start validation tests in the deployed application.

```yaml
assets:
  v1:
    - inline:
        dest: ./scripts/test.sh
        contents: |
          #!/bin/bash

          curl http://{{repl ConfigOption "hostname"}}/e2e
```