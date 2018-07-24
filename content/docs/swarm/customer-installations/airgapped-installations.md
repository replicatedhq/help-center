---
date: "2016-07-03T04:02:20Z"
title: "Airgapped Installations"
description: "The steps required of the end customer to install a Replicated application into an airgapped environment."
weight: "705"
categories: [ "Distributing a Swarm Application" ]
index: ["docs/swarm", "docs"]
gradient: "swarm"
icon: "replicatedDockerSwarm"
---

{{< linked_headline "Install Replicated" >}}

Replicated can be installed by downloading the latest release from https://s3.amazonaws.com/replicated-airgap-work/replicated.tar.gz and running the following commands:

```shell
tar xzvf replicated.tar.gz
cat ./swarm-init.sh | sudo bash -s airgap
```

{{< linked_headline "Download & Rename Airgap Package" >}}

On the license properties page in the vendor portal, enable Airgap installations for this license and copy the
download link. This URL is designed to be delivered to that customer. They will use this link to download
current airgap packages when you promote a release. When they download new airgap packages to their server,
it is important that your customer set the `--trust-server-names` and `--content-disposition` flags for `wget`
or rename the file to something ending with `.airgap`.

Your customer will need the `.airgap` package and the normal Replicated license (.rli) file. Be sure to download
the license file *after* enabling the airgap feature on the license. Airgap-enabled licenses have more metadata
embedded than non-airgap licenses. Airgap enabled licenses can be used to install in non-airgap mode, but
non-airgap licenses cannot be used to install in airgap mode.

{{< linked_headline "Install Airgap Package" >}}

Next, navigate to the management console at https://<server_ip>:8800. Accept the self signed certificate, pass
the preflight checks, and you will see the license upload screen. Upload the [airgap enabled license](/docs/swarm/getting-started/create-licenses/#airgap-download-enabled) and then select the airgapped install option.
You will have to provide a path to the .airgap file and upload the .rli file here.

Once this screen is completed, Replicated runs as normal. In the :8800/console/settings page, there is a section
to set the Airgap mode settings. You can install updates and sync the license by downloading new versions of these,
renaming them with the .airgap extension and placing them in the locations specified on the /console/settings
page.

{{< linked_headline "Adding Additional Nodes" >}}

In order to add additional nodes to your cluster, just navigate to the Cluster page of the Admin Console, click the "Add Node" button, and follow the instructions there. For more detailed instructions see the [add nodes](/docs/swarm/customer-installations/add-nodes/) page of the docs.
