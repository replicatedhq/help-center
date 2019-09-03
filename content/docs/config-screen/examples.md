---
date: "2016-07-03T04:02:20Z"
title: "Examples"
description: "Configuration Screen examples"
weight: "303"
categories: [ "Config Screen" ]
index: "docs/config"
aliases: []
---


This page includes a number of examples for integrating with common external tools like GitHub, SMTP, and various datastores.

{{< linked_headline "GitHub and GitHub Enterprise" >}}


```yaml
- name: github
  title: GitHub Integration
  description: Provide the location of your GitHub account
  test_proc:
    display_name: Test Auth
    command: github_app_auth
    arg_fields:
    - github_type
    - github_enterprise_host
    - github_enterprise_protocol
    - github_client_id
    - github_client_secret
  items:
  - name: github_type
    default: github_type_public
    type: select_one
    items:
    - name: github_type_public
      title: GitHub.com
    - name: github_type_enterprise
      title: GitHub Enterprise
  - name: github_enterprise_host
    title: GitHub Enterprise Host
    when: github_type=github_type_enterprise
    type: text
    required: true
  - name: github_enterprise_protocol
    title: GitHub Enterprise Host
    default: github_enterprise_protocol_https
    when: github_type=github_type_enterprise
    type: select_one
    required: true
    items:
    - name: github_enterprise_protocol_http
      title: Insecure (http)
    - name: github_enterprise_protocol_https
      title: Secure (https)
      recommended: true
  - name: github_client_id
    title: Client ID
    type: text
    required: true
  - name: github_client_secret
    title: Client Secret
    type: text
    required: true
```

