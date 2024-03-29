---
date: "2016-07-03T04:02:20Z"
title: "Config Screen YAML"
description: "The config section of the Replicated YAML creates a dynamic settings page that customers can use to configure their instance."
weight: "302"
categories: [ "Config Screen" ]
index: "other"
aliases: [/docs/packaging-an-application/config-screen/,/docs/config-screen/,/docs/native/packaging-an-application/config-screen/,/docs/swarm/packaging-an-application/config-screen/]
---

{{<legacynotice>}}

The admin console settings screen configuration is specified as an array configuration
groups and items.

{{< linked_headline "Groups" >}}

Groups map to links within the left sidebar navigation. Groups are comprised of a `name`,
`title`, `description` and an array of items.

```yaml
config:
- name: authentication
  title: Authentication
  description: Configure application authentication below.
```

{{< linked_headline "Items" >}}

Items map to input fields and belong to a single group. All items should have `name`, `title`
and `type` properties. Specific item types can including new types.

### Available Item Types
> `bool`
> `file`
> `heading`
> `label`
> `password`
> `text`
> `textarea`
> `select`
> `select_many`
> `select_one`

{{< linked_headline "Examples" >}}

### `bool`
The `bool` input type should use a "0" or "1" to set the value
```yaml
- name: toggles
  items:
  - name: http_enabled
    title: HTTP Enabled
    help_text: When enabled we will listen to http
    type: bool
    default: "0"
```

### `label`
The `label` type allows you to display an input label.
```yaml
- name: Email
  items:
  - name: email-address
    title: Email Address
    type: text
  - name: description
    type: label
    title: "Note: The system will send you an email every hour."
```

### `heading`
The `heading` type allows you to display a group heading as a subelement within a group. This is useful when you would like to group items all in one config group but would like to separate the items visually, for instance when using a config group test proc.
```yaml
- name: ldap_settings
  title: LDAP Server Settings
  test_proc:
    display_name: Test Credentials
    command: ldap_auth
    arg_fields:
    - ...
  items:
  ...
  - name: ldap_schema
    type: heading
    title: LDAP schema
  ...
```

### `select`
Types `select_one` and `select_many` are special cases. These types must have nested items
that act as options. These types will be displayed as radio buttons (`select_one`) or
checkboxes (`select_many`) in the admin console.

At this time these two control types do not support the `title` field.

```yaml
- name: inputs
  title: Inputs
  description: ""
  items:
  - name: logstash_input_enabled
    default: ""
    type: select_many
    items:
    - name: logstash_input_file_enabled
      title: File
      default: "0"
    - name: logstash_input_lumberjack_enabled
      title: Lumberjack
      default: "0"
- name: authentication
  title: Authentication
  description: ""
  items:
  - name: authentication_type
    default: authentication_type_anonymous
    type: select_one
    items:
    - name: authentication_type_anonymous
      title: Anonymous
    - name: authentication_type_password
      title: Password
```

### `textarea`
A `textarea` can specify a `props` that will map into the HTML element directly. Examples of available properties are `rows`, `cols` and `wrap`. See https://www.w3schools.com/tags/tag_textarea.asp for reference.

```yaml
- name: custom_key
  title: Set your secret key for your app
  description: Paste in your Custom Key
  items:
  - name: key
    title: Key
    type: textarea
    props:
      rows: 8
  - name: hostname
    title: Hostname
    type: text
```

### `file`
A `file` is a special type of form field that renders an [`<input type="file" />`](https://www.w3schools.com/tags/tag_input.asp) HTML element. It has both a value, which holds the file name, and data, the contents of the file. See the [`ConfigOptionData`](/docs/native/packaging-an-application/template-functions/#configoptiondata) template function for examples on how to use the file contents in your application.

```yaml
- name: certs
  title: TLS Configuration
  items:
  - name: tls_private_key_file
    title: Private Key
    when: use_tls=tls_custom
    value: Use self-signed certificate
    data_cmd:
      name: ssl_cert
      value_at: 0
    type: file
    affix: left
  - name: tls_certificate_file
    title: Certificate
    when: use_tls=tls_custom
    value: Use self-signed certificate
    data_cmd:
      name: ssl_cert
      value_at: 1
    type: file
    affix: right
```

{{< linked_headline "Properties" >}}

### `default` and `value`
A default value will be applied to the ConfigOption template function when no value is
specified. A default value provided via a command (default_cmd) is treated as ephemeral
data that will get overwritten each time commands are executed. It will appear as
placeholder text in the settings section of the On-Prem Console.

A value is data that will be overwritten by user input on non-readonly fields. A value
provided as the result of a command (value_cmd or data_cmd) will persist and will never
change after the first execution of the command. It will appear as the HTML input value
in the settings section of the On-Prem Console.

*Please note that setting ```readonly:true``` will render a value generated by a command to be ephemeral.  This feature has since been deprecated and may change in the future.*

```yaml
- name: custom_key
  title: Set your secret key for your app
  description: Paste in your Custom Key
  items:
  - name: key
    title: Key
    type: text
    value: ""
    default: change me
```

### `required`
A required field will prevent the application from starting until it has a value.
```yaml
    required: true
```

### `when`
The when value is used to denote conditional inputs that will only be visible (or required) when the condition evaluates to true. The `when` item can be used on groups, items and select_one or select_many options.

The settings UI will update right away when a field used in a when clause is updated (no need to save) and can be used to used to show optional config sections. The equality check should match exactly without quotes.

The when property can be configured in two different formats. The legacy format is in form `config_item_name=value` or `config_item_name!=value`. As of Replicated {{< version version="2.9.0" >}} [template functions](/docs/packaging-an-application/template-functions) that evaluate to a parsable boolean can be used as a value to the when property.

```yaml
- name: database_settings_group
  items:
  - name: db_type
    type: select_one
    default: embedded
    items:
    - name: external
      title: External
    - name: embedded
      title: Embedded DB
  - name: database_host
    title: Database Hostname
    type: text
    when: db_type=external
  - name: database_password
    title: Database Password
    type: password
    when: '{{repl or (ConfigOptionEquals "db_type" "external") (ConfigOptionEquals "db_type" "embedded")}}'
```

### `recommended`
An item can be recommended. This item will bear the tag "recommended" in the admin console.
```yaml
    recommended: true
```

### `hidden`
Items can be hidden. They will not be visible if hidden.
```yaml
    hidden: true
```

### `readonly`
Items can be readonly.
```yaml
    readonly: true
```

### `write_once`
Items with the write_once property set to true will be locked the first time they are set.
Locked items will appear readonly in the UI and will be ignored if set with `replicatedctl` or imported from a file.

Any operation that sets an item is considered a write and will cause the item to be locked. This includes setting the item value in the UI, importing the value from a file specified in `/etc/replicated.conf` with the `ImportSettingsFrom` key, setting the value with `replicatedctl`, or setting the value with `value_cmd`.

If the item has a `default` it will be locked the first time the user saves settings in the admin console.
It is recommended to avoid using `default` with `write_once` items.

```yaml
    write_once: true
```

### `affix`
Items can be affixed left or right. These items will appear in the admin console on the same line.
```yaml
    affix: left
```

{{< linked_headline "Using CMD (commands) as input to options" >}}

Commands can be used as defaults, values, or data with `default_cmd`, `value_cmd` and
`data_cmd` respectively. Data is a special property of the file type. The value corresponds
to the file name while the data corresponds to its contents.

```yaml
    value_cmd:
      name: hash_key
      value_at: 0
```
