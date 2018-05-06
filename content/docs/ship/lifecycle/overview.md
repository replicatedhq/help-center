---
date: "2018-05-02T01:19:20Z"
title: "Lifecycle Overview"
description: "Introduction to the Ship lifecycle definition"
weight: "42002"
categories: [ "Ship Lifecycle" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

{{< linked_headline "Ship Lifecycle" >}}

The lifecycle key is where you can define and customize the end-user experience for customers installing your application. A lifecycle has two step types:

- `"message"` - print a message to the console. This can be used multiple times.
- `"render"` - collect configuration and generate assets. This commonly is used once in an application.

In ship, a short assets section to pull and run a private docker container might look like

```yaml
lifecycle:
  v1:
    - message:
        contents: |
          This installer will prepare assets so you can run CoolTool Enterprise.
    - render: {}
    - message:
        contents: |
          Asset rendering complete! Copy the following files to your production server

             ./scripts/install.sh
             ./images/myimage.tar

          And then, on that server, run

             bash ./scripts/install.sh

          To start the app. Thanks for using CoolTool!
```