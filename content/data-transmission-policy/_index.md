---
title: "Data Transmission Policy"
headerGradient: "blueToBlue"
wrapperCSSClass: "scheduler-types-section"
---
<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class="u-marginTop--more u-textAlign--left u-lineHeight--normal">
<p>A Replicated installation connects to a Replicated-hosted endpoint periodically to perform various tasks including checking for updates and syncing the installed license properties. During this time, some data is transmitted from an installed instance to the Replicated API. This data is limited to:
</p>
<ul>
<li>The IP address of the primary Replicated instance.</li>
<li>The ID of the installation.</li>
<li>The state of the installation (running, stopped, etc).</li>
<li>The current version of the installation.</li>
<li>The current version of the Replicated components.</li>
</ul>
<p>
This data is required to provide the expected update and license services. No additional data is collected and transmitted by default from the instance to external servers.</p>
</div></div></div></div>