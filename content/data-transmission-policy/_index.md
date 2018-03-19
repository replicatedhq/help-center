---
title: "Data Transmission Policy"
headerGradient: "redToRed"
wrapperCSSClass: "scheduler-types-section"
---

A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and syncing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:

- The IP address of the primary Replicated instance.</li>
- The ID of the installation.</li>
- The state of the installation (running, stopped, etc).</li>
- The current version of the installation.</li>
- The current version of the Replicated components.</li>

This data is required to provide the expected update and license services. No additional data is collected and transmitted by default from the instance to external servers.