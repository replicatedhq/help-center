---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated by Script"
description: "Instructions for installing Replicated via the easy install script."
keywords: "installing"
weight: "304"
categories: [ "Managing Customer Installation" ]
index: ["docs/native", "docs"]
aliases: [docs/distributing-an-application/installing-via-script,/docs/native/packaging-an-application/installing-via-script]
icon: "replicatedCircle"
---

{{<legacynotice name="native">}}

We provide an easy-to-use one-line installation process (via shell script) which will detect your OS, ask a few questions and install both docker-engine and the required Replicated components.

If you want to always release your application with a specific version of Replicated you can read how to [always install a specific version of Replicated](/docs/kb/supporting-your-customers/install-known-versions/).

{{< linked_headline "Basic Install" >}}

Save the install script to file and run.  We recommend reading and understanding the install script prior to running.

```shell
curl -sSL -o install.sh https://get.replicated.com/docker
sudo bash ./install.sh
```

Quick install

```shell
curl -sSL https://get.replicated.com/docker | sudo bash
```

{{< linked_headline "Release Channel Install Scripts" >}}

Every release channel for your application has a custom install link. Using the channel install link allows the Replicated installer will optimize the install process. Based on your app YAML the installer will choose the highest allowed version of Replicated using your configured [replicated_version](/docs/native/packaging-an-application/preflight-checks/) range.

To find the install link, login to your [vendor.replicated.com](https://vendor.replicated.com/) account, select your app and click "build history" for your channel and click "Copy install script url".

{{< linked_headline "Flags" >}}

The install script takes optional flags to configure Replicated for your environment.

|Flag|Usage|
|----|-----|
|http-proxy <PROXY_ADDRESS>|Sets the HTTP proxy for Docker and Replicated|
|no-proxy|Skip the proxy prompt|
|additional-no-proxy|Address that can be reached without the HTTP proxy|
|private-address <IP>|Set the nodes private IP address|
|public-address <IP>|Set the nodes public IP (service) address|
|no-auto|Prompts will wait indefinitely instead of 20 second timeouts|
|fast-timeouts|Prompts with timeouts will wait for 1 second instead of 20 seconds or longer|
|ui-bind-port <PORT_NUMBER>|Change the default UI port binding from port 8800|
|docker-version <VERSION>|Install with a specific version of Docker|
|no-docker|Skip the docker installation|
| hard-fail-on-loopback|If present, aborts the installation if devicemapper on loopback mode is detected|
|bypass-storagedriver-warnings|For automation bypasses the warning for devicemapper with loopback|
|log-level|Set the log level for Replicated. Can be `error`, `warn`, `info` or `debug`|
|no-ce-on-ee|Disable installation of Docker CE onto platforms it does not support - RHEL, SLES and Oracle Linux|
|disable-replicated-ui|Disable the Replicated Browser UI (Only the CLI will be available)|
|disable-replicated-host-networking|Disables exposing most Replicated ports on the host network (excludes Replicated UI port). Multi-node installations not supported.|

Example call with flags:

```shell
curl -sSL https://get.replicated.com/docker | sudo bash -s no-auto ui-bind-port=8000
```

{{< note title="Best practices with the easy-install script" >}}
When you're ready to start delivering to customers we recommend that you proxy this install script with a TLS cert matching your domain name.  The script should always be served with TLS.
{{< /note >}}

{{< linked_headline "Installing Behind A Proxy" >}}

The Replicated installation script supports environments where an HTTP proxy server is required to access the Internet. The installation script will prompt for the proxy address and will [set up Replicated and Docker to use the supplied value](/docs/native/customer-installations/proxies/).

An example of running the Replicated installation script with a proxy server is:
```shell
curl -x http://<proxy_address>:<proxy_port> https://get.replicated.com/docker | sudo bash
```

# Post-Installation Maintenance

{{< linked_headline "Upgrade to latest Replicated build" >}}

If you would like to upgrade Replicated to the latest release simply [rerun the installation script](/docs/native/packaging-an-application/installing-via-script/) and that will upgrade the Replicated components to the latest build.

{{< linked_headline "Restarting Replicated" >}}

If you installed Replicated using the easy installation script, the script will have created an init service you can use to control Replicated. In this case, restarting replicated varies depending on your host OS.

### Ubuntu/Debian
```shell
service replicated restart
service replicated-ui restart
service replicated-operator restart
```

### CentOS/RHEL/Fedora/Amazon Linux 2
```shell
sudo systemctl restart replicated replicated-ui replicated-operator
```

### Amazon Linux 2018.03
```shell
restart replicated
restart replicated-ui
restart replicated-operator
```

{{< linked_headline "Removing Replicated" >}}

To remove Replicated, run the following commands:

### Ubuntu/Debian
```shell
service replicated stop
service replicated-ui stop
service replicated-operator stop
docker stop replicated-premkit
docker stop replicated-statsd
docker rm -f replicated replicated-ui replicated-operator replicated-premkit replicated-statsd retraced-api retraced-processor retraced-cron retraced-nsqd retraced-postgres
docker images | grep "quay\.io/replicated" | awk '{print $3}' | xargs sudo docker rmi -f
docker images | grep "registry\.replicated\.com/library/retraced" | awk '{print $3}' | xargs sudo docker rmi -f
rm -rf /var/lib/replicated* /etc/replicated* /etc/init/replicated* /etc/init.d/replicated* /etc/default/replicated* /var/log/upstart/replicated* /etc/systemd/system/replicated*
```

### CentOS/RHEL/Fedora
```shell
systemctl stop replicated replicated-ui replicated-operator
service replicated stop
service replicated-ui stop
service replicated-operator stop
docker stop replicated-premkit
docker stop replicated-statsd
docker rm -f replicated replicated-ui replicated-operator replicated-premkit replicated-statsd retraced-api retraced-processor retraced-cron retraced-nsqd retraced-postgres
docker images | grep "quay\.io/replicated" | awk '{print $3}' | xargs sudo docker rmi -f
docker images | grep "registry\.replicated\.com/library/retraced" | awk '{print $3}' | xargs sudo docker rmi -f
rm -rf /var/lib/replicated* /etc/replicated* /etc/init/replicated* /etc/default/replicated* /etc/systemd/system/replicated* /etc/sysconfig/replicated* /etc/systemd/system/multi-user.target.wants/replicated* /run/replicated*
```
