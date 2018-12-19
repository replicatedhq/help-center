---
title: "Replicated Embedded Kubernetes"
description: "Understanding the Replicated Embedded Kubernetes Cluster"
headerGradient: "blueToBlue"
wrapperCSSClass: "scheduler-types-section"
---

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class="u-marginTop--more u-textAlign--left u-lineHeight--normal u-paddingBottom--20">
                <h6>What is Embedded Kubernetes?</h6>
                <p>Some applications require Kubernetes - either because of architecture decisions or for access to Kubernetes services like CoreDNS or RBAC. Other applications work best on Kubernetes because the hosted, multi-tenant
                version of the application is running on Kubernetes, and therefore it's the tested, validated and supportable platform.</p>
                <p>Replicated's Embedded Kubernetes platform is a portable, predictable and supportable installation of Kubernetes that is crafted from commonly used upstream component. It's designed to be embedded right into an application
                distribution. An entire Embedded Kubernetes installation can be included in a Replicated airgap package to be run offline, and includes the same types of services expected when launching a managed Kubernetes
                cluster on a cloud provider.</p>
            </div>
        </div>
    </div>
</div>

<div class="scheduler-type main-section u-borderBottom--gray">
    <div class="container">
        <div class="paddingContainer">
            <div class='u-flexTabletReflow flexDirection--rowReverse'>
                <div class='flex1 flex-column flex-verticalCenter u-lineHeight--normal right-content'>
                    <span class="logo kubernetesLogo-combo"></span>
                    <h5>Kubernetes from Kubeadm</h5>
                    <p>To start, the Embedded Kubernetes cluster is bootstrapped and managed using <a href="https://kubernetes.io/docs/reference/setup-tools/kubeadm/implementation-details/">Kubeadm</a>. </p>
                    <div class="u-marginTop--small">
                        <a href="/guides/ship-with-kubernetes" class="Button secondary">Get Started</a>
                    </div>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter left-content'>
                    <ul class="pros-list">
                        <li class="u-commandPromptBlueDark">
                            <h6>One-line Installation</h6>
                            <p>No knowledge of how to bootstrap and provision Kubernetes is required. Kubeadm manages setting up the master and all nodes, incorporating best practices into the setup.</p>
                        </li>
                        <li class="u-ymlBlueDark">
                            <h6>Preflight checks enabled</h6>
                            <p>An extensive list of built-in preflight checks will be run to ensure the target system will successfully be able to run Kubernetes.</p>
                        </li>
                        <li class="u-cloudGrayBlue">
                            <h6>Cloud Agnostic (and even bare metal)</h6>
                            <p>Kubeadm can provision a cluster on any cloud provider, virtualized infrastructure, or even bare metal servers.</p>
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
                    <span class="logo rookCephLogos-combo"></span>
                    <h5>Rook and Ceph Storage</h5>
                    <p>The Replicated Embedded Kubernetes cluster is installed with Rook and Ceph, and the installer manages the state of the system. </p>
                    <div class="u-marginTop--small">
                        <a href="/guides/native-scheduler" class="Button secondary">Get Started</a>
                    </div>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter right-content'>
                    <ul class="pros-list">
                        <li class="u-storageRed">
                            <h6>Highly available storage</h6>
                            <p>Rook provisions and operates Ceph, a battle tested, mature system for distributed fault-tolerant storage.</p>
                        </li>
                        <li class="u-volumesRed">
                            <h6>Relocatable Volumes</h6>
                            <p>Automatic support for persistent volumes, which enables Kubernetes to reschedule Pods anywhere in the cluster while ensuring data moves with your workloads.</p>
                        </li>
                        <li class="u-containersRed">
                            <h6>Block and Blob Store</h6>
                            <p>Rook provides both block store as a drop-in replacement for standard HostPath volumes, and blob store to implement the S3 protocol on any cluster.</p>
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
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter left-content'>
                    <ul class="pros-list">
                        <li class="u-coreDNSDarkBlue">
                            <h6>CoreDNS Support</h6>
                            <p>By default, Kubernetes will register service and pods with CoreDNS, allowing for container to container communication on the overlay network.</p>
                        </li>
                        <li class="u-firewallDarkBlue">
                            <h6>Easier On Firewalls</h6>
                            <p>Internal communication can stay inside the cluster, no need to document and require cluster operators to open firewall ports.</p>
                        </li>
                    </ul>
                </div>
                <div class='flex1 flex-column flex-verticalCenter u-lineHeight--normal right-content'>
                    <span class="logo weaveworks-logo"></span>
                    <h5>Weave Networking</h5>
                    <p>Every Replicated Embedded Kubernetes cluster comes with secure-by-default Weave overlay networking for inter-container communication</p>
                    <div class="u-marginTop--small">
                        <a href="/guides/ship-with-docker-swarm/" class="Button secondary">Get Started</a>
                    </div>
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
                    <span class="logo heptioContour-logo"></span>
                    <h5>Contour Ingress</h5>
                    <p>Contour is a portable ingress controller from Heptio.</p>
                    <div class="u-marginTop--small">
                        <a href="/guides/ship-with-docker-swarm/" class="Button secondary">Get Started</a>
                    </div>
                </div>
                <div class='flex1 flex-column u-paddingLeft--most flex-verticalCenter right-content'>
                    <ul class="pros-list">
                        <li class="u-envoyLogoBlue">
                            <h6>Built On Envoy</h6>
                            <p>Built on the mature, battle-tested Envoy proxy that powers dynamic infrastructure at massive scale.</p>
                        </li>
                        <li class="u-cloudNativeBlue">
                            <h6>Cloud native, on prem</h6>
                            <p>Instant reconfiguration, dynamic ingress routes, and native WebSocket support</p>
                        </li>
                        <li class="u-ingressBlue">
                            <h6>Next Generation Ingress</h6>
                            <p>Leverage next-generation Ingress features like route inheritance and upstream health checking.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
