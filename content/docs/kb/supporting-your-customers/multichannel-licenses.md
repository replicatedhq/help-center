---
date: "2017-06-12T00:00:00Z"
lastmod: "2017-06-12T00:00:00Z"
title: "Multi-channel Licenses"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
tags: ["Replicated UI"]
---

## Installing Multi-Channel License
When multiple release channels are assigned to a license, the customer will be able to select the channel during installation time.

![License Channels](/images/post-screens/license-upload-channels.png)

* Channel drop-down will show all channels assigned to the license.
* Channel description, located under the drop-down, can be edited on the Channels screen in the Replicated Vendor Portal.
* Current version tag and release notes can be modified on the Channel History screen in the Replicated Vendor Portal.

### Airgapped Installations
For airgapped installations, the license channel has to be selected at the time when the airgap bundle is downloaded.

## Changing Channel
Channel can be changed on the License page in Replicated management console.  Once channel is changed, Replicated will sync license and check for release updates.  If newer releases are available, the customer will be able to upgrade the application.

{{< note title="There are no downgrades" >}}
Switching to a channel with an older application release than the one currently installed will not result in a downgrade of the application.
{{< /note >}}

### Airgapped Installations
Switching channels in airgapped installations is not supported.
