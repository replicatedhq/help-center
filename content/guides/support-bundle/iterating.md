---
date: "2018-01-30T04:02:20Z"
title: "Iterating"
description: "A guide to iterating on support bundle specs to retrieve more information in bundles"
weight: "803"
categories: [ "Support Bundle" ]
index: "guides"
type: "chapter"
gradient: "orangeToOrange"
icon: "troubleshoot"
---

In the previous guide, we generated and uploaded a support bundle based on the specification and customer we created in our first guide. As our systems evolve, we will want to collect new information in later support bundles. This guide walks through the process of iterating on support bundles by collecting a new file from the host.

## Edit the Support Bundle Spec

Start by going to the `Specs` tab under the `Troubleshoot` menu item. This will list out all of our support bundle specs. Click the spec we created in earlier guides to open the editor for the spec.

The support bundle spec lists out all of the files, commands, and information that should be collected from a spec. For now, we're going to collect the `/etc/hosts` file from the host and add it to our support bundle. Add the following to the bottom of your spec YAML:

```yaml
- os.read-file:
    filepath: /etc/hosts
    output_dir: /os/etc/hosts
```

This will add the file in our downloaded bundle to `/os/etc/hosts`. Click save bundle spec, and re-run the Docker command from the [Generate](/guides/support-bundle/generate) section. If you don't have this command, we can get it again for this customer.

## Getting the Generate Support Bundle Command

To get a new support bundle command, start by clicking the `Customers` navigation item. 

![](/images/guides/support-bundle/list-customers.png)

This will take us to our customer list. Find the customer you want to get the command for, and click on their title to go to the Customer detail page.

![](/images/guides/support-bundle/customer-detail.png)

Click the `Generate a support bundle` link, and your docker run command will appear. Use the command from the server you used in the [Generate](/guides/support-bundle/generate) guide to create your new support bundle. Refresh the customer page and it will appear in the list. Download the bundle by pressing "Download bundle". 

## Support Bundle Structure

Unzip the support bundle and open the "os/etc/hosts" folder to see the `contents` file. Open this file to see the contents of that file on the host!

![](/images/guides/support-bundle/hosts-file.png)

## Next Steps

Now that you have a working support bundle, it's time to customize it for your needs even more. Head over to our [API Documentation](/api/support-bundle-yaml/) to get started.
