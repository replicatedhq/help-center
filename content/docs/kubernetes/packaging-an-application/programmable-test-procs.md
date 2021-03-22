---
date: "2018-10-26T08:00:00Z"
title: "Programmable Test Procedures"
description: "A guide to implementing Programmable Test Procedures to valiidate customer configuration."
weight: "2611"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

{{<kotsdocs>}}
To validate customer configuration in KOTS, check out [the kots.io Preflight CRD](https://kots.io/reference/v1beta1/preflight/) and the [troubleshoot.sh](https://troubleshoot.sh) project.
{{</kotsdocs>}}

Programmable Test Procedures enable you to run an arbitrary Pods to validate the same input from the configuration screen and show a friendly error message to the end-user. You can use runtime configuration as input to your container command and capture the result code and message and format it for display to the end-user.

{{< linked_headline "Example" >}}

The following example will check the validity of the password entered by the end-user. The `test_proc.custom_command` property of the YAML will instruct Replicated to run a service defined in a special YAML file defined with kind `test-proc-kubernetes`.
The `test_proc.results` property can be used to interpret output from the container and format any errors for display to the end-user.
Note the reference to the Service spec that has been added to the release yaml with kind `test-proc-kubernetes`.

```yaml
---
# kind: replicated
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
          kubernetes: # this section is scheduler specific
            pod_name: password-checker
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

---
# kind: test-proc-kubernetes
apiVersion: v1
kind: ConfigMap
metadata:
  name: password-checker-configmap
data:
  password-strength.sh: |
    #!/bin/sh
    if [ "${#1}" -lt 8 ]; then
      echo "Password must be at least 8 characters long"
      exit 123
    fi

---
# kind: test-proc-kubernetes
apiVersion: v1
kind: Pod
metadata:
  name: password-checker
spec:
  containers:
  - name: password-checker
    image: debian:stretch
    command: ['/password-strength.sh', '{{repl ConfigOption "password"}}']
    volumeMounts:
    - name: password-checker-volume
      mountPath: /
      subPath: password-strength.sh
  volumes:
  - name: password-checker-volume
    configMap:
      name: password-checker-configmap
```

{{< linked_headline "Password Fields" >}}

The server will never return the plain text value of fields of type password back to the frontend. In order to make password fields work with Programmable Test Procs the password field names must be included in the property `arg_fields` when using a Test Proc nested under a Config Group. This behavior is implicit when a Test Proc is nested under a Config Item like in the example above. See below for an example. Note the "password" item in the list `test_proc.arg_fields`.

```yaml
---
# kind: replicated
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
        kubernetes: # this section is scheduler specific
          pod_name: credentials-checker
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
| custom_command | [Command](/docs/kubernetes/packaging-an-application/commands-reference/#command) | yes | The command that will be run |
| results | array\[[Result](/docs/kubernetes/packaging-an-application/commands-reference/#result)\] | yes | An array of result objects that when evaluated will determine success or failure |
