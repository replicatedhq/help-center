---
date: "2016-08-29T00:00:00Z"
lastmod: "2016-08-29T00:00:00Z"
title: "License Controlled Settings"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML", "Replicated Vendor"]
---

License fields can be used to control the settings page to show or hide advanced settings.  This technique does not need a new release and the settings page can be updated by a simple license sync.

To start add the custom license field on [Vendor Web](https://vendor.replicated.com/).  The field will be visible to the customer unless it is marked as hidden.  Set a default value to ensure existing licenses behave correctly as customers update their app version.

Update the application YAML with a hidden item that represents the license flag.  Hidden items are very useful to bind template functions and command output to your settings.  Here the item should be read only with a default field that uses the template LicenseFieldValue function that refers to the new license field.  See the advanced_opt item shown below.

Find the config item to be controlled by the license field.  The item may represent a single setting or a collection of settings.  Set the *when* option check the value for the hidden field and on the next application publish you can control the settings page with license flags.

```yaml
config:
- name: authentication
  title: Authentication
  description: Service credentials.
  items:
  - name: advanced_opt
    title: Allow Advanced UI Settings
    type: text
    default: '{{repl LicenseFieldValue "advanced" }}'
    readonly: true
    hidden: true
  - name: password
    title: Password
    type: text
    default: password
- name: advanced
  title: Advanced
  description: Advanced settings to control the authentication endpoint.
  when: advanced_opt=1
  items:
  - name: endpoint
    title: Override API Endpoint
    type: text
    default: api.services.io
```
