---
date: "2016-07-03T04:02:20Z"
title: "Airgapped Installations"
description: "The steps required of the end customer to install a Replicated application into an airgapped environment."
weight: "2704"
categories: [ "Manage Customer Installations" ]
index: ["docs/kubernetes", "docs"]
gradient: "kubernetes"
icon: "replicatedKubernetes"
---

An "airgapped" environment is a network that has no path to inbound or outbound internet traffic at all. Some enterprise customers require that you deliver a package they can install in their airgapped environment.

Replicated supports this type of installation, using the following steps:

{{< linked_headline "Prepare the environment" >}}

The customer will be responsible for delivering a server that is capable of running Replicated, Kubernetes and Docker. Refer to the [supporting operating systems](../supported-operating-systems) list for a list of officially supported systems.

The Replicated airgap installation script for Kubernetes will install docker-engine, Kubernetes and all necessary dependencies.

{{< linked_headline "Install Replicated" >}}

Replicated can be installed by downloading the latest release from https://s3.amazonaws.com/replicated-airgap-work/replicated__docker__kubernetes.tar.gz and running the following commands:

```shell
tar xzvf replicated__docker__kubernetes.tar.gz
cat ./kubernetes-init.sh | sudo bash -s airgap
```

Previous versions can be downloaded from URLs following the pattern `https://s3.amazonaws.com/replicated-airgap-work/stable/replicated-<version>%2B<version>%2B<version>__docker__kubernetes.tar.gz`, for example https://s3.amazonaws.com/replicated-airgap-work/stable/replicated-2.28.0%2B2.28.0%2B2.28.0__docker__kubernetes.tar.gz for Replicated 2.28.0.

{{< linked_headline "Download the Application Airgap Bundle" >}}

On the license properties page in the vendor portal, enable Airgap installations for this license and copy the download link. This URL is designed to be delivered to that customer. They will use this link to download
current airgap packages when you promote a release. When they download new airgap packages to their server, it is important that your customer set the `--trust-server-names` and `--content-disposition` flags for `wget` or rename the file to something ending with `.airgap`.

Your customer will need the `.airgap` package and the normal Replicated license (.rli) file. Be sure to download the license file *after* enabling the airgap feature on the license. Airgap-enabled licenses have more metadata embedded than non-airgap licenses. Airgap enabled licenses can be used to install in non-airgap mode, but non-airgap licenses cannot be used to install in airgap mode.

{{< linked_headline "Install Application" >}}

Next, navigate to the management console at https://\<server_ip\>:8800. Accept the self-signed certificate, pass the preflight checks, and you will see the license upload screen. Upload the [airgap enabled license](/docs/kubernetes/getting-started/create-licenses/#airgap-download-enabled) and then select the airgapped install option. You can choose to provide a path to the .airgap file or upload it directly.

Once this screen is completed, Replicated runs as normal.

{{< linked_headline "Updating License and Application" >}}

In the Console Settings page of the Admin Console (/console/settings), there is a section entitled "Airgapped Settings". Updates to your application can be installed by downloading the new version and placing it on the server in the directory specified under "Update Path" or by uploading the bundle directly via the releases page in the Admin Console (/releases). The extension of the file must be `.airgap`. Your license can be synced by placing a new license `.rli` file in place of the existing one at the path specified under "License Path".

![Airgapped Settings](/images/post-screens/console-settings-airgapped.png)
