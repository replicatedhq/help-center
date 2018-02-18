---
date: "2016-07-03T04:02:20Z"
title: "Environment Variables"
description: "Defining container environment variables and setting values dynamically"
weight: "204"
categories: [ "Packaging a Native Application" ]
index: "docs/native"
---

{{< linked_headline "Container Environment Variables" >}}


The 12-factor app encourages the use of environment variables for configuration, and Replicated supports this design pattern. You can specify
environment variables, which will be injected into a container when it's created.

Environment variables can be created with static values or customer supplied values.

Environment variables support the Replicated template library.

There is also a flag provided to exclude anything secret from the support bundle.

```yaml
  env_vars:
    - name: AWS_ACCESS_KEY_ID
      value: '{{repl ConfigOption "logstash_input_sqs_aws_access_key" }}'
      is_excluded_from_support: true
    - name: AWS_SECRET_ACCESS_KEY
      value: '{{repl ConfigOption "logstash_input_sqs_aws_secret_key" }}'
      is_excluded_from_support: true
```