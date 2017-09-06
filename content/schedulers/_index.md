---
title: "Choosing the right scheduler"
uri: /schedulers/
description: "Compare the differences between the orchestration layers Replicated allows you to use."
headerGradient: "blueToBlue"
wrapperCSSClass: "scheduler-types-section"
---

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class="u-marginTop--more u-textAlign--left u-lineHeight--normal">
                <h6>Which scheduler should I use?</h6>
                <p>Replicated can work with several container scheduler platforms to deliver the enterprise version of your application. You can use Kubernetes, Docker Swarm, or Replicated's built-in scheduler. Choosing a scheduler to use for your entperise installations is an important first step, and this page will help you understand how Replicated works with each.</p>
            </div>
        </div>
    </div>
</div>

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class='u-flexTabletReflow'>
                <div class='flex1 flex-column flex-verticalCenter u-lineHeight--normal left-content'>
                    <span class="logo replicatedLogo"></span>
                    <h5>Replicated + built-in scheduler</h5>
                    <p>The Replicated scheduler is a mature container orchestration runtime that supports Docker 1.7.1 and newer.</p>
                    <p>Used by over 500 enterprises in production systems today. This scheduler is a good choice if you want to maximize compatibility with enterprise systems and want to provide a simple, appliance-like experience.</p>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter right-content'>
                    <ul class="pros-list">
                        <li class="u-commandPromptRed">
                            <h6>One-Line installation</h6>
                            <p>Built into the platform, other than Docker, there are no additional dependencies required.</p>
                        </li>
                        <li class="u-dockerRed">
                            <h6>Supports Docker 1.7.1 and later</h6>
                            <p>Compatible with Docker 1.7.1 and above, the Replicated Scheduler is a good solution for customers using legacy operating systems such as CentOS 6 and RHEL 6.</p>
                        </li>
                        <li class="u-containersRed">
                            <h6>Easy to run and manage</h6>
                            <p>The Replicated scheduler manages Docker containers with no additional command line tools.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class='u-flexTabletReflow flexDirection--rowReverse'>
                <div class='flex1 flex-column flex-verticalCenter u-lineHeight--normal right-content'>
                    <span class="logo kubernetesLogo"></span>
                    <h5>Kubernetes + Replicated</h5>
                    <p>Kubernetes is a powerful and popular container orchestration and scheduler platform. Many organizations are investing in running their hosted product on Kubernetes, and want to leverage this investment for enterprise installations.</p><p>Replicated helps minimize the interactions between your customer and the Kubernetes cluster, with the builtin Admin Console providing the functionality required to manage your application.</p>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter left-content'>
                    <ul class="pros-list">
                        <li class="u-ymlBlueDark">
                            <h6>Reuse your existing k8s specs</h6>
                            <p>Existing kubernetes yml files are compatible with Replicated.</p>
                        </li>
                        <li class="u-powerBlue">
                            <h6>Run at scale</h6>
                            <p>Kubernetes is a powerful scheduler that is capable of running extremely large clusters.</p>
                        </li>
                        <li class="u-replicatedIconBlue">
                            <h6>Bring your own cluster</h6>
                            <p>Replicated works on existing Kubernetes clusters.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class='u-flexTabletReflow'>
                <div class='flex1 flex-column flex-verticalCenter u-lineHeight--normal left-content'>
                    <span class="logo dockerSwarmLogo"></span>
                    <h5>Docker Swarm + Replicated</h5>
                    <p>Docker Swarm is great if you have existing docker-compose files and want to target servers running Docker 1.13.1 or newer.</p><p>Replicated supports deploying Swarm services to a swarm cluster. On operating systems supporting Docker 1.13.1 or later, you can provide an appliance-like enterprise experience using the Swarm scheduler, using your existing docker-compose.yml.</p>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter right-content'>
                    <ul class="pros-list">
                        <li class="u-commandPromptBlue">
                            <h6>One-Line installation</h6>
                            <p>The only requirement to use Swarm is Docker 1.13.1 or later. Replicated will automatically provision the Swarm cluster.</p>
                        </li>
                        <li class="u-ymlBlueLight">
                            <h6>Reuse your docker-compose.yml</h6>
                            <p>Existing docker-compose yml (v3 or later) is compatible with Replicated.</p>
                        </li>
                        <li class="u-refreshBlue">
                            <h6>Rolling updates</h6>
                            <p>Docker Swarm services support high availability deployments and zero downtime rolling updates.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="compare-section-wrapper">
    <div class="compare-section main-section">
        <div class="container">
            <div class="paddingContainer">
                <div class="header-wrapper u-textAlign--center">
                    <p class="u-color--tuna u-fontWeight--bold u-fontSize--header u-marginBottom--normal">So, which one is right for you?</p>
                    <p class="u-fontSize--large u-fontWeight--medium u-color--dustyGray u-lineHeight--normal">Compare all the features side-by-side to help you make your decision.</p>
                </div>
                <div class="table-section-wrapper u-marginTop--most">
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th><span class="replicatedLogo"></span></th>
                                    <th><span class="kubernetesLogo"></span></th>
                                    <th><span class="dockerSwarmLogo"></span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>One-line installation</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-grayFailCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Zero downtime updates</td>
                                    <td class="icon-cell"><span class="icon u-grayFailCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Automatic node failover</td>
                                    <td class="icon-cell"><span class="icon u-grayFailCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Airgap support</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-grayFailCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Preflight Checks</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Support Bundle Generator</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Brandable Admin Console</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Automated App Updates</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Differential Snapshot &amp; Restore</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>LDAP/AD Integration</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Security Audit Logging Service</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                                <tr>
                                    <td>Advanced Reporting Dashboard</td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                    <td class="icon-cell"><span class="icon u-greenCheckCircle"></span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>






