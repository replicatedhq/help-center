---
date: "2018-01-30T04:02:20Z"
title: "Generate a Support Bundle"
description: "How to get a support bundle from a customer"
weight: "802"
categories: [ "Support Bundle" ]
index: "guides"
type: "chapter"
gradient: "orangeToOrange"
icon: "troubleshoot"
---

Once you've [created a support bundle spec](/guides/support-bundle/spec), you can give a command to your customer to generate a support bundle based on the spec. As this spec changes over time, the command will remain consistent for that customer.

After creating our default support bundle spec, you will be on the `Generate bundle command` step of the install process.

![](/images/guides/support-bundle/upload-spec.png)

Now, you will need a machine running Docker that you can use to run the provided `docker run` command. After provisioning a machine on a cloud provider of your choosing, run the command and follow the prompts. At the end, it will show you that the support bundle has been uploaded.

![](/images/guides/support-bundle/docker-run.png)

## Analyzing a Bundle

Once uploaded, you will be taken to the bundle analyze page. This page contains information from the uploaded support bundle, to give a quick summary of the system's status. To download the full support bundle, including information such as logs, use the `Download bundle` at the top right of the page.

![](/images/guides/support-bundle/analysis.png)

## Next Steps

Now that we have generated and analyzed a support bundle, we can begin iterating on our bundle to get more information from the system, such as command outputs or gathering files.
