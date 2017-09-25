---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Using cmd To Populate Values & Defaults"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["CLI Commands", "Application YAML"]
---

[Commands](/docs/packaging-an-application/commands/) are an important part of the
Replicated ecosystem for bootstrapping a configuration screen to help streamline the
installation of your application on-premise.

Important concepts to understand when using `cmds`:

- `cmds` ONLY RUNS AT YAML IMPORT TIME (during app installation & during app updates).
- `cmds` are computed, meaning they can not be templated with the `{{repl }}` template functions.
- `cmds` need to be “defined” in your yaml to be used by configuration options.
- `cmds` are called in a configuration option in one of 3 ways:
  - `value_cmd`
  - `default_cmd`
  - `data_cmd`
- If called via `value_cmd` or `data_cmd` the initial value/data will persist through updates, restarts etc (just as it would be if the customer input that value into the settings screen themselves).
- If called from `default_cmd` this value will be recalculated everytime the app is updated or installed.

# Example App:

- I want a user to be able to specify a hostname but would like it to default to its public ip address.
- I want to generate a default random admin password for my application.

## Step 1: Define my `cmds`.

```yaml
cmds:
- name: host_ip
  cmd: get_my_public_ip_address
  args: []
- name: generate_random_password_32_char
  cmd: random
  args:
  - "32"
```

## Step 2: Call my cmds from config section.

```yaml
config:
- name: App
  title: App Configuration
  description: Set default values for my App to Use
  items:
  - name: hostname
    title: Hostname
    type: text
    value_cmd:
      name: get_my_public_ip_address
      value_at: 0
    required: true
  - name: admin_pw
    title: Admin User Password
    type: text
    value_cmd:
      name: generate_random_password_32_char
      value_at: 0
    required: true
```

[Download Full Replicated YAML Example](https://github.com/replicatedhq/repl-yaml-samples/blob/master/apps/example_commands_app.yml).
