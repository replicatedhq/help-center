---
date: "2016-07-03T04:02:20Z"
title: "Application Properties"
description: "The Replicated YAML section `properties` allows several high level items to be defined. "
weight: "203"
categories: [ "Packaging" ]
---

The properties section of the YAML allows you to configure properties of the admin console.

Below is an example of the properties section of an application config YAML.

```yaml
properties:
  app_url: http://{{repl ConfigOption "hostname" }}
  logo_url: http://replicated.com/logo.png
  console_title: My Enterprise Application
  shell_alias: mycli
```

## Available Properties
### app_url
The URL of your application. A link to this URL will de displayed to the user on the dashboard of the admin console. This
field supports [template functions](/packaging-an-application/template-functions/) and often uses one to determine the
hostname or IP address to link to.

### logo_url
The admin console header logo.  This image will be proxied by the Replicated license server during installation time. The
on-prem admin console will not load this image from the Internet; it becomes a local resource. This image will automatically
be included on airgapped installations without external access.

### console_title
The admin console header title (in the navbar) and HTML page title.

### shell_alias
Shell alias that can be used to run admin commands. See [Admin Commands](/packaging-an-application/admin-commands/)
for more information.

### console_support_markdown
Additional markdown content that will be displayed on the Support page of the admin console.
