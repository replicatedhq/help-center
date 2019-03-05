---
date: "2017-11-17T00:00:00Z"
title: "Support Bundle (Older Instances)"
description: "Installed instances can generate a support bundle with relevant logs and instance information."
categories: [ "Packaging a Kubernetes Application" ]
index: ["docs/kubernetes", "docs"]
hideFromList: true
icon: "replicatedKubernetes"
gradient: "kubernetes"
---

{{< note title="Support Bundle v1" >}}
This is the documentation for the pre-2.0 version of the Support Bundle. If you signed up for Replicated during or after February 2018, you will have the 2.0 version by default. If you signed up before that date, you'll have the option to opt-in to the 2.0 support bundle on a per-customer basis. If you'd like to move all your customers to [version 2](../support-bundle), please contact support@replicated.com.
{{< /note >}}

{{< linked_headline "Custom Files and Commands" >}}

In addition to the [default support files](/docs/kubernetes/packaging-an-application/support-bundle/#default-support-files) included in the support bundle, addtional files can be added via the `support` section of your yaml. Files from within the application’s containers can be included, as well as output of commands executed in the container. For more complex support commands it is possible to create a script in a Config Map and execute that script from a support command. 

```yaml
support:
  files:
    - filename: /var/log/nginx/access.log
      kubernetes:
        selector: # pod label selector
          app: my-app
  commands:
    - filename: access_last_1000.log
      command: [tail, -n1000, /var/log/nginx/access.log]
      kubernetes:
        selector: # pod label selector
          app: my-app
```

{{< linked_headline "Excluding Logs From Support Bundles" >}}

If a pod's logs may contain sensitive information or are simply large and not useful for your debugging processes, you can exclude that pod's logs from support bundles. To do this, add the label `com.replicated.excludelogs=true` to the pod in question.

