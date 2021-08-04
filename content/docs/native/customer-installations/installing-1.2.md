---
date: "2016-07-03T04:02:20Z"
title: "Installing Replicated 1.2"
description: "How to install the legacy version of Replicated 1.2 via Deb and Yum packages."
hideFromList: true
categories: [ "Managing Customer Installation" ]
index: ["docs/native", "docs"]
aliases: [docs/distributing-an-application/installing-1.2]
icon: "replicatedCircle"
---

{{< warning title="Old Version Warning" >}}
The content in this document is for a previous version of Replicated. If you are looking
for the current version, it is available at
<a href="{{< baseurl >}}docs/distributing-an-application/installing/">{{< baseurl >}}distributing-an-application/installing/</a>
{{< /warning >}}

## Host Setup
Before installing your app, you need to install Replicated on a compatible machine.

## Supported Operating Systems
We support the server versions of the following OS's

- Debian 7.7 - 10
- Ubuntu 14.04 / 15.10
- Fedora 21 / 22
- Red Hat Enterprise Linux 7.1
- CentOS 7.4 - 7.7
- Amazon AMI 2014.03 / 2014.09 / 2015.03 / 2015.09

*Please note your machine must support **docker-engine {{< docker_version_minimum >}} - {{< docker_version_default >}} (with{{< docker_version_default >}} being the
recommended version). This also requires a 64-bit distribution with a kernel minimum of
3.10**. For detailed requirements and installation guides see the docker installation docs.*

## Current Replicated Versions
| Daemon	| Stable Version |
|-------|----------------|
| replicated | 1.2.134 <br /> 1 November, 2016 |
| replicated-ui | 1.2.80 <br /> 1 November, 2016 |
| replicated-agent | 1.2.51 <br /> 1 November, 2016 |

## Easy Installation
We provide an easy-to-use one-line installation process (via shell script) which will
detect your OS, ask a few questions and install the Replicated components for you
including docker-engine. More details on the [installation script](http://blog.replicated.com/enhanced-installation-script/):

### With Timeout Prompts
```shell
curl -sSL https://get.replicated.com | sudo bash
```

### Wait Indefinitely
```shell
curl -sSL https://get.replicated.com | sudo bash -s no-auto
```

When you're ready to start shipping to customers, you can either proxy this install
script or provide TLS certs for us to CNAME it for you. An example of customer facing
installation guide can be found at our unpublished demo app: GetElk

## Accessing the On-prem UI
Now you're ready to start deploying your app! The Replicated On-Prem UI is web-based,
and can be accessed via port 8800 over HTTPS of the server you've installed Replicated
on (make sure that port 8800 is accessible from your local computer).

You'll need to create & download a license file for yourself on the vendor portal & then
just follow the instructions from there.

## Advanced Installation Options
## Manual Installation
If you'd rather install the components manually, you can! Just use the following steps.
If you're using an apt-based OS, such as Debian or Ubuntu, you'll want to use the "apt"
tab when using the scripts shown below. If you're using a yum-based OS, such as RHEL or
CentOS, go for the "yum" tab.

## Install Docker
Currently the Replicated installation script installs Docker version {{< docker_version_default >}}
Refer to the Docker Installation Guide for [Debian](https://docs.docker.com/engine/installation/linux/debian/),
[Ubuntu](https://docs.docker.com/installation/ubuntulinux/), [CentOS](https://docs.docker.com/engine/installation/linux/centos/),
[Fedora](https://docs.docker.com/engine/installation/linux/fedora/), or [RHEL](https://docs.docker.com/engine/installation/linux/rhel/).

## Add the Replicated repository to package manager

### Ubuntu/Debian
```shell
echo "deb https://get.replicated.com/apt all stable" | sudo tee /etc/apt/sources.list.d/replicated.list
```

### CentOS/RHEL/Fedora
```shell
echo -e "[replicated]\nname = Replicated Repository\nbaseurl = https://get.replicated.com/yum/stable\n" | sudo tee /etc/yum.repos.d/replicated.repo
```

## Download the Replicated GPG key

### Ubuntu/Debian
```shell
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 68386EDB2C8B75CA615A8C985D4781862AFFAC40
```

### CentOS/RHEL/Fedora
```shell
gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 822819BB
gpg --export -a 822819BB > /tmp/replicated_pub.asc
sudo rpm --import /tmp/replicated_pub.asc
```

## Install Replicated via package manager

### Ubuntu/Debian
```shell
apt-get update
apt-get install replicated replicated-ui replicated-updater
```

### CentOS/RHEL/Fedora
```shell
yum clean all
yum install replicated replicated-ui replicated-updater
```

## Installing Behind A Proxy
Replicated introduced an enhanced installer that should simplify the proxy installation
experience. However, previous methods of identifying proxied installs are still supported.

## Post-Installation Maintenance
## Restarting Replicated
Restarting replicated varies depending on your host OS, please see below for the correct
instructions to restarting replicated.

### Ubuntu/Debian
```shell
restart replicated-ui
restart replicated
restart replicated-agent
```

### CentOS/RHEL/Fedora
```shell
systemctl restart replicated replicated-updater replicated-ui replicated-agent
```

If you need to reset your console password please refer to the reseting your password
in the On-Prem CLI section.

## List Installed Replicated Version
Note: You can also use the CLI to determine the version of the daemon

### Ubuntu/Debian
```shell
dpkg --list | grep replicated
```

### CentOS/RHEL/Fedora
```shell
yum list installed | grep replicated
```

## Update Replicated via package manager
You may need to add the Replicated repository and GPG key to the package manager before
running commands, see Manual Installation for more details.

### Ubuntu/Debian
```shell
apt-get update
apt-get install replicated replicated-ui replicated-agent
```

### CentOS/RHEL/Fedora
```shell
yum makecache
yum update replicated replicated-ui replicated-agent
```

If you have additional hosts you will independently need to run the following on each of them.

```bash
curl -sSL https://get.replicated.com/agent | sudo sh
```

## Log Rotation
By default, the Replicated installer script will set up log rotation for you. This section
describes how to get it up and running manually just in case.

Replicated components write log files to `/var/log/replicated`. These logs contain useful
diagnostic information, and can grow somewhat large. We recommend setting up a log rotation
policy for these files. The easiest way to accomplish this is via the logrotate facility
present on most Linux-based systems. Below is an example policy file that you can create
in `/etc/logrotate.d/replicated` to be picked up by logrotate. It will rotate the
Replicated log files whenever they become larger than 500 KB, keeping at most 4 rotated
log files around on the filesystem.

```text
/var/log/replicated/*.log {
  size 500k
  rotate 4
  nocreate
  compress
  notifempty
  missingok
}
```

## Removing Replicated
To remove Replicated from a given host you can run the following command.

### Ubuntu/Debian
```shell
dpkg --purge replicated replicated-ui replicated-agent replicated-updater
rm -rf /var/lib/replicated /etc/replicated-agent.conf /etc/replicated.conf /etc/replicated-agent
```

### CentOS/RHEL/Fedora
```shell
yum remove -y replicated replicated-ui replicated-agent replicated-updater
rm -rf /var/lib/replicated /etc/replicated-agent.conf /etc/replicated.conf /etc/replicated-agent
```

## Troubleshooting Agent Installation
When provisioning a remote agent machine via SSH, you may receive an error like
`Unable to use 'sudo' on agent host.`

To fix this, you'll need to disable the `requiretty` setting in your sudo configuration.
On most Linux-based systems, you can simply run `sudo visudo` from a shell, which will open
an editor for your sudo configuration. Add an exclamation point to any occurrences of
`requiretty`, e.g. `!requiretty`, then save the file.

After you have made this change, you can try provisioning the machine again from the
Replicated UI.

Please note that this may have security implications, so make sure you check the
documentation for your OS and consider the effects carefully.


## Migrating to Replicated v2
Replicated provides a one line migration script to upgrade your v1 installation to v2. The script will first stop your app and backup all Replicated data in case there is a need for a restore. To invoke the migration script all you have to do is run the script below and follow the prompts.

```shell
curl -sSL https://get.replicated.com/migrate-v2 | sudo bash
```

{{< warning title="Warning" >}}
To prevent loss of data, backing up your server is highly recommended before performing a migration.
{{< /warning >}}
