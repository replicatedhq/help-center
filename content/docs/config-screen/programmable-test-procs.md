---
date: "2018-10-26T08:00:00Z"
title: "Programmable Test Procedures"
description: "The config section of the Replicated YAML creates a dynamic settings page that customers can use to configure their instance."
weight: "305"
categories: [ "Config Screen" ]
index: "other"
nextPage: "snapshots/overview.md"
---

The `test_proc` property in the configuration section of the YAML gives you the ability to easily test the validity of the unsaved configuration parameters entered by the end-user with minimal configuration. Today there are many pre-configured commands that can be run including [host resolution](/docs/config-screen/test-procs/#resolve-host), [github auth](/docs/config-screen/test-procs/#github-app-auth), [aws auth](/docs/config-screen/test-procs/#aws-auth) and [certificate verification](/docs/config-screen/test-procs/#certificate-verification), among many others.

The addition of Programmable Test Procedures enables you to run arbitrary containers to validate the same input from the configuration screen and show a friendly error message to the end-user. You can use runtime configuration as input to your container command and capture the result code and message and format it for display to the end-user.

{{< linked_headline "Example" >}}

The following example will check the validity of the password entered by the end-user. The `test_proc.custom_command` property of the yaml will instruct Replicated to run a container defined in the scheduler section of the YAML. The `test_proc.results` property can be utilized to interpret output from the container and format it for display to the end-user. For more detailed, scheduler specific examples refer to the [Native](/docs/native/packaging-an-application/programmable-test-procs/), [Kubernetes](/docs/kubernetes/packaging-an-application/programmable-test-procs/) and [Swarm](/docs/swarm/packaging-an-application/programmable-test-procs/) documentation for Programmable Test Procedures.

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

{{< linked_headline "Native" >}}

Please refer to the [scheduler specific documentation](/docs/native/packaging-an-application/programmable-test-procs/) for detailed information and examples.

{{< linked_headline "Kubernetes" >}}

Please refer to the [scheduler specific documentation](/docs/kubernetes/packaging-an-application/programmable-test-procs/) for detailed information and examples.

{{< linked_headline "Swarm" >}}

Please refer to the [scheduler specific documentation](/docs/swarm/packaging-an-application/programmable-test-procs/) for detailed information and examples.
