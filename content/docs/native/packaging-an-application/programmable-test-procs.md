---
date: "2018-10-26T08:00:00Z"
title: "Programmable Test Procedures"
description: "A guide to implementing Programmable Test Procedures to valiidate customer configuration."
weight: "215"
categories: [ "Packaging a Native Application" ]
index: ["docs/native", "docs"]
icon: "replicatedCircle"
---

{{<legacynotice name="native">}}

Programmable Test Procedures enable you to run an arbitrary containers to validate the same input from the configuration screen and show a friendly error message to the end-user. You can use runtime configuration as input to your container command and capture the result code and message and format it for display to the end-user.

{{< linked_headline "Example" >}}

The following example will check the validity of the password entered by the end-user. The `test_proc.custom_command` property of the YAML will instruct Replicated to run a container defined in the components section of the YAML.
The `test_proc.results` property can be used to interpret output from the container and format any errors for display to the end-user.

```yaml
config:
- name: credentials
  title: Credentials
  items:
  - name: password
    title: Password
    type: password
    test_proc:
      display_name: Check Password Strength
      run_on_save: true
      custom_command:
        id: scheduler
        timeout: 15
        data:
          replicated: # this section is scheduler specific
            component: password-checker
            container: debian
      results:
      - status: success
        message: Success!
        condition:
          status_code: 0
          error: false
      - status: error
        message:
          default_message: '{{.result}}'
          args:
            result: '{{repl .Result }}'
        condition:
          status_code: 123 # custom exit code from the container command
      - status: error # this is a catch-all case
        message:
          default_message: '{{if .error}}{{.error}}{{else}}{{.result}}{{end}}'
          args:
            error: '{{repl .Error }}'
            result: '{{repl .Result }}'
components:
- name: password-checker
  containers:
  - source: public
    image_name: debian
    version: stretch
    when: false # indicate to Replicated that it should not run this container as part of your startup sequence
    cmd: '["/password-strength.sh", "{{repl ConfigOption \"password\"}}"]'
    config_files:
    - filename: /password-strength.sh
      file_mode: "0777"
      contents: |
        #!/bin/sh
        if [ "${#1}" -lt 8 ]; then
          echo "Password must be at least 8 characters long"
          exit 123
        fi
```

{{< linked_headline "Password Fields" >}}

The server will never return the plain text value of fields of type password back to the frontend. In order to make password fields work with Programmable Test Procs the password field names must be included in the property `arg_fields` when using a Test Proc nested under a Config Group. This behavior is implicit when a Test Proc is nested under a Config Item like in the example above. See below for an example. Note the "password" item in the list `test_proc.arg_fields`.

```yaml
config:
- name: credentials
  title: Credentials
  test_proc:
    display_name: Check Credentials
    run_on_save: true
    arg_fields:
    - password
    custom_command:
      id: scheduler
      timeout: 15
      data:
        replicated: # this section is scheduler specific
          component: credentials-checker
          container: debian
    results:
    - status: success
      message: Success!
      condition:
        status_code: 0
        error: false
    - status: error
      message:
        default_message: '{{.result}}'
        args:
          result: '{{repl .Result }}'
      condition:
        status_code: 123 # custom exit code from the container command
    - status: error # this is a catch-all case
      message:
        default_message: '{{if .error}}{{.error}}{{else}}{{.result}}{{end}}'
        args:
          error: '{{repl .Error }}'
          result: '{{repl .Result }}'
  items:
  - name: username
    title: Username
    type: text
  - name: password
    title: Password
    type: password
```

{{< linked_headline "Resource Specification" >}}

Programmable Test Procedures are represented with the following properties.

### TestProc

The test_proc resource is a sub-resource of a config group or item. When specified, a button will be present inline with the form. The custom validation will be run when clicking the button and optionally on save.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| display_name | string | yes | The text to show in the button in the ui. |
| run_on_save | string or boolean | no | When true this test will run on saving the configuration. |
| timeout | int | no | Timeout in seconds, default 15 seconds, -1 denotes no timeout |
| when | string | no | Will determine if the test procedure is runnable (evaluated to a boolean value) |
| arg_fields | []string | no | A list of config item names for which to pass values to the test procedure. This is required for password fields. |
| custom_command | [Command](/docs/native/packaging-an-application/commands-reference/#command) | yes | The command that will be run |
| results | array of \[[Result](/docs/native/packaging-an-application/commands-reference/#result)\] | yes | An array of result objects that when evaluated will determine success or failure |
