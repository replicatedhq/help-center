---
date: "2016-06-01T00:00:00Z"
lastmod: "2016-06-01T00:00:00Z"
title: "Adding SMTP Support On-Premises"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated UI", "Application YAML"]
---

Many SaaS applications rely on external email services such as SendGrid or Amazon SES to deliver
emails. This isn't always portable to enterprise installations because these services might not
be reachable. It's preferable to provide configuration options to let your customer configure
their own SMTP gateway, and use that to deliver emails for on-prem installations.

There are many settings that are needed to completely configure an SMTP connection. To help,
we've created a config snippet you can copy and paste into your YAML. This YAML snippet is at
the bottom of this page. We also have created and included in the snippet an
[SMTP Auth test command](/docs/packaging-an-application/test-procs/#smtp-auth).
This will create a test button next to the settings so that the customer can validate they've
entered valid information.

Following this example, you'll have a settings section that looks like this:

![SMTP Configuration](/images/post-screens/smtp.png)

The YAML to create this is:

```yaml
- name: smtp_on
  title: Email Server Settings
  description: Configure your outgoing email server settings
  items:
  - name: smtp_enabled
    default: smtp_enabled_no
    type: select_one
    items:
    - name: smtp_enabled_yes
      title: Enable SMTP
      recommended: true
      type: text
    - name: smtp_enabled_no
      title: Disable SMTP
      type: text
- name: smtp
  when: smtp_enabled=smtp_emabled_yes
  test_proc:
    display_name: Test SMTP Authentication
    command: smtp_auth
    arg_fields:
    - smtp_host_address
    - smtp_starttls
    - smtp_auth_type
    - smtp_username
    - smtp_password
  items:
  - name: smtp_host_address
    title: SMTP Server Address
    default: smtp.gmail.com:587
    help_text: "*please note you must include the port like so: `smtp.gmail.com:587`*"
    type: text
    required: true
  - name: smtp_username
    title: SMTP Username
    help_text: A valid user account to log in to your SMTP server
    type: text
    affix: left
  - name: smtp_password
    title: SMTP Password
    help_text: The password for the user
    type: password
    affix: right
  - name: smtp_from_address
    title: From Address
    help_text: The from address that will be used in outgoing emails
    type: text
  - name: smtp_starttls
    title: Encryption Type
    default: 1
    type: select_one
    items:
    - name: 1
      title: Enable STARTTLS
      recommended: true
      type: text
    - name: 0
      title: Disable STARTTLS
      type: text
  - name: smtp_auth_type
    default: Login
    title: SMTP Authentication Type
    type: select_one
    items:
    - name: Login
      title: Login
      type: text
    - name: CRAM-MD5
      title: CRAM-MD5
      type: text
    - name: Plain
      title: Plain
      type: text
```

[Download Full Replicated YAML Example](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/smtp_w_test_proc.yml).
