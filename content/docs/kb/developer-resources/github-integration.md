---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Integrating GitHub"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["GitHub", "Application YAML"]
---

If your application leverages the GitHub API, each customer instance of your application will require a unique Client Id and Client Secret during setup . Additionally, most enterprises will prefer to hook this into their instance of GitHub Enterprise (you’ll need to allow for the GH endpoint to be determined by the customer as well… sometimes GH:E instances are setup over HTTP instead of HTTPS so you’ll need to know that as well). Below is an example of the on-prem settings screen that a customer would see when configuring their GitHub Integration info (as well as the YAML that drives it & a ‘test’ button).

![Config GitHub](/images/post-screens/config-github.png)

```yaml
- name: github
  title: GitHub Integration
  description: Provide the location of your GitHub account
  test_proc:
    display_name: Verify GitHub Auth
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
      type: text
    - name: github_type_enterprise
      title: GitHub Enterprise
      type: text
  - name: github_enterprise_host
    title: GitHub Enterprise Host
    description: The hostname of your GitHub Enterprise server
    when: github_type=github_type_enterprise
    type: text
    required: true
  - name: github_enterprise_protocol
    title: GitHub Enterprise Host
    description: The hostname of your GitHub Enterprise server
    default: github_enterprise_protocol_https
    when: github_type=github_type_enterprise
    type: select_one
    required: true
    items:
    - name: github_enterprise_protocol_http
      title: Insecure (http)
      type: text
    - name: github_enterprise_protocol_https
      title: Secure (https)
      recommended: true
      type: text
  - name: github_client_id
    title: Client ID
    description: Your GitHub Application Client ID
    type: text
    required: true
  - name: github_client_secret
    title: Client Secret
    description: Your GitHub Application Client Secret
    type: text
    required: true
```