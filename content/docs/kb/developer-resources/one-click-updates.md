---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "One-Click Updates"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Replicated Vendor", "Replicated UI"]
---

## Overview
Replicated makes the process of providing your on-prem customers with your regular 
application updates as simple as possible. Whenever a release is promoted to a channel 
where existing customers are licensed, your customers will be able to update their 
instance with 1-click.

For example, if you promote a release to the Stable channel (from the vendor portal) 
you'll be prompted to input release notes (supports markdown), a version number and 
specify if the release is required or not (required releases are useful if there are 
migration scripts that need to be run sequentially).

![Promote Release With Notes](/images/post-screens/promote-release-with-notes.png)

If your customers do not have automatic updates enabled in their Replicated license, 
they'll be able to apply the update manually. To do so, your customers will need to 
check their on-prem admin console (https://server:8800/dashboard) to see the 
available update.

![Dashboard With Update](/images/post-screens/dashboard-with-update.png)

By clicking to view the update button they'll be taken the release history page 
(https://server:8800/releases) where they'll see the most recent release notes 
displayed prominently.

![Release History](/images/post-screens/release-history.png)

By clicking the “Install Update” button, they'll see some quick feedback on the progress 
of the installation & then the “Status” of the release in the release history table 
will change from “New” to “Current”. If there are multiple updates available, 
Replicated will step through the installation of all “required” releases sequentially 
(to ensure that required migrations are carried out). Any release marked as optional 
(other than the most recent) will not be applied.

![Release History No Updates](/images/post-screens/release-history-empty.png)

From this page they'll also be able to view their previous release history & click 
"read more" to read the release notes in full markdown. Release notes under 100 
characters is just displayed in-line, in plain text).

![Release Notes](/images/post-screens/release-notes.png)

If there is no update currently detected, the dashboard provides a button to "Check for 
Updates" as well as a link to this release history page.

![Dashboard](/images/post-screens/dashboard-no-updates.png)

## Scheduling Update Checks

Your customers have the ability to change the frequency that Replicated will check for
application updates with either prechosen time increments or a crontab format enabled
custom field setting.

![Update Scheduler](/images/post-screens/update-scheduler.png)
