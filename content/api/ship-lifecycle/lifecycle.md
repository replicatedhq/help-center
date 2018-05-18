---
categories:
- ship-lifecycle
date: 2018-01-17T23:51:55Z
description: Reference Documentation for defining your Ship application lifecycle 
index: docs
title: Lifecycle
weight: "1"
gradient: "purpleToPink"
---

[Assets](/api/ship-assets/assets) | [Config](/api/ship-config/config) | [Lifecycle](/api/ship-lifecycle/lifecycle) 

## Ship Lifecycle

This is the reference documenation for Ship lifecycle. To get started with Ship, head on over to [Ship Guides](/guides/ship/)

Lifeycle is where you can define and customize the end-user experience for customers installing your application. Lifecycle has two step types at the moment:

- `message` - print a message to the console
- `render` - collect configuration and generate assets

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

We're always interested to hear more about how you're deploying your application to your customers, if there's a lifecycle step you'd like to see, drop us a line at https://vendor.replicated.com/support or https://help.replicated.com/community.

