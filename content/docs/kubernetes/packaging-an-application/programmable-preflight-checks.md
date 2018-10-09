---
date: "2016-07-03T04:02:20Z"
title: "Programmable Preflight Checks"
description: "A guide to implementing Programmable Preflight Checks to analyze customer systems to determine if the environment meets the minimum requirements for installation or update."
weight: "2610"
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
aliases: [/docs/packaging-an-application/preflight-checks-k8s/,/docs/kubernetes/packaging-an-application/preflight-checks]
---

It is possible to run an arbitrary command in a Pod as a preflight check.
The Pods can be scheduled to run on all nodes with the `global` mode or on a limited set of Nodes using selectors.
All images used by raw command Pods must be defined in the [images](/docs/kubernetes/getting-started/docker-registries/#bundling-airgap-images) section of your Replicated yaml.

To begin using custom raw preflight commands, add a Pod spec to your release yaml with kind `preflight-kubernetes`, then configure a `raw` command to use it in the `custom_requirements` section of your Replicated yaml.

{{< linked_headline "Example" >}}

```yaml
custom_requirements:
- id: license-file-exists
  message: License file exists
  details: The vendor license file must exist on the host at /etc/vendor-license
  results:
  - status: success
    message: File /etc/vendor-license exists.
    condition:
      status_code: 0
  - status: error
    message: File /etc/vendor-license does not exists.
    condition:
      status_code: 1
  command:
    id: raw
    timeout: 15
    data:
      kubernetes:
        pod_name: "license-checker" # matches the Pod name below
        global: true

---
# kind: preflight-kubernetes
apiVersion: v1
kind: Pod
metadata:
  name: license-checker
spec:
  containers:
  - name: tester
    image: busybox
    command: ["test", "-e", "/host/etc/vendor-license"]
    ports:
    - containerPort: 80
    volumeMounts:¬
    - name: etc
      mountPath: /host/etc
  volumes:
  - name: etc
    hostPath:
      path: /etc
```

{{< linked_headline "Schema" >}}

Add items to the `custom_requirements` section of your Replicated yaml using the following schema:

{{< linked_headline "Requirement" >}}

The custom requirement resource is the primary resource for custom preflight checks. A requirement
represents a single check that is to be performed during the installation and upgrade steps of the
application lifecycle.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | A unique identifier for the requirement |
| message | string or Message | yes | A short description of the requirement |
| details | string or Message | no | A more detailed description of the requirement |
| when | string | no | Will determine if this requirement should be run (evaluated to a boolean value) |
| command | Command | yes | The command that will be run |
| results | array[Result] | yes | An array of result objects that when evaluated will determine success or failure |

{{< linked_headline "Command" >}}

The command resource represents the command that is to be run. The command will return messages, a
status code and possibly an error.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | yes | Always the literal string "raw" |
| timeout | int | no | Timeout in seconds, default 15 seconds, -1 denotes no timeout |
| data | Data | no | The command data |

{{< linked_headline "Data" >}}

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| kubernetes | Kubernetes | yes | Configuration object for the command pods |

{{< linked_headline "Kubernetes" >}}

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| global | boolean | no | Run on all nodes in the cluster ||
| pod_name | string | yes | Gets the Pod spec from a `preflight-kubernetes` yaml doc |
| node_selector | map[string]string | no | Run the Pod on nodes matching any label in this map |

Either the `global` flag or the `node_selector` map should be set, but not both.

{{< linked_headline "Result" >}}

The result resource represents the different possible outcomes of the command. A result contains
a status, message and condition. Results are evaluated in order and the first matching result will
determine the requirement status. If no condition properties are specified that result will always
evaluate to true. If no results match the requirement will receive status `error`.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| status | string | yes | One of success, warn or error |
| message | string or Message | yes | A description of the result |
| condition | Condition | no | The condition that must be met |

{{< linked_headline "Condition" >}}

All properties of a condition must be met to determine that condition to be true. The `bool_expr`
property is intended to be evaluated using Replicated templates. This template will receive
the following variables from the result of the command: `.Results` (array of messages), `.Result`
(the first message), `.StatusCode`, `.Error`.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| error | boolean | no | Did the command result in an error? |
| status_code | int | no | The command status code |
| bool_expr | string | no | An expression that can be evaluated and parsed as a boolean |

{{< linked_headline "Message" >}}

Messages have arguments that can be substituted into the text via templates.

| **Name** | **Type** | **Required** | **Description** |
|----------|----------|--------------|-----------------|
| id | string | no | The message identifier. Can be used to localize the message. |
| default_message | string | yes | The default message |
| args | map[string]string | no | Arguments to the message |
