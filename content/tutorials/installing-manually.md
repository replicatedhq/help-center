---
date: "2016-07-03T04:02:20Z"
title: "Manually Installing Replicated"
description: "Instructions for manually installing Replicated 2"
hideFromList: true
keywords: "installing, removing"
categories: [ "Distributing an Application" ]
tags: ["Installing Replicated"]
---

If you choose not to run the [installation script](/docs/distributing-an-application/installing-via-script) use this guide; note that the install script also installs Docker, detects network configuration and allows proxy settings and provides support to auto-upgrade Replicated during your application release cycle.

To manually install start by checking you are running on a support operating system and follow the 4 steps.

### 1. Install Docker
We recommend Docker version {{< docker_version_default >}}.  Refer to the Docker Installation Guide for [Debian](https://docs.docker.com/engine/installation/linux/debian/), [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntulinux/), [CentOS](https://docs.docker.com/engine/installation/linux/centos/), [Fedora](https://docs.docker.com/engine/installation/linux/fedora/), or [RHEL](https://docs.docker.com/engine/installation/linux/rhel/).

### 2. Run Replicated & UI Containers
```shell
export DOCKER_HOST_IP=172.17.0.1  # Set this appropriately to docker0 address
export LOCAL_ADDRESS=10.240.0.2  # Set this to the internal address of the server (usually eth0, but not 127.0.0.1)
export DAEMON_TOKEN="$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)" # Create value for $DAEMON_TOKEN

echo 'alias replicated="sudo docker exec -it replicated replicated"' > /etc/replicated.alias

docker run -d --name=replicated \
        -p 9874-9879:9874-9879/tcp \
        -v /etc/replicated.alias:/etc/replicated.alias \
        -v /var/lib/replicated:/var/lib/replicated \
        -v /var/run/replicated:/var/run/replicated \
        -v /etc/docker/certs.d:/host/etc/docker/certs.d \
        -v /var/run/docker.sock:/host/var/run/docker.sock \
        -v /proc:/host/proc:ro \
        -v /etc:/host/etc:ro \
        -e DOCKER_HOST_IP=$DOCKER_HOST_IP \
        -e LOCAL_ADDRESS=$LOCAL_ADDRESS \
        -e DAEMON_TOKEN=$DAEMON_TOKEN \ 
        quay.io/replicated/replicated:latest

docker run -d --name=replicated-ui \
        -p 8800:8800/tcp \
        -v /var/run/replicated:/var/run/replicated \
        quay.io/replicated/replicated-ui:latest
```

### 3. Upload the License
1. Navigate to http://&lt;your server address&gt;:8800.
1. Follow the prompts to configure certificates, upload license, and run the preflight checks.

### 4. Run Operator Container
1. Click on the Cluster tab (:8800/cluster)  
![Cluster](/images/post-screens/manual-install-2.x/click-cluster.png)
1. Click the Add Node button  
1. Select Docker Run option  
1. Copy the command from the text area below  
1. Paste and run the command in the terminal window  

At this point, the new node should show up on the Cluster page.

### 4. Start the Application
1. Click on the Dashboard tab (:8800/dashboard)  
1. Click the Start Now button  
![Start Now](/images/post-screens/manual-install-2.x/start-now.png)

When first launching there may be no "Start Now" button.  This is because Replicated is still pulling application images. If this is the case, then just wait for the pull to finish.

Since a new node running Replicated Operator has joined the cluster, Replicated will want to run preflight checks on it before starting the application. If that's the case, the Start Now button will be replaced with the Run Checks button.