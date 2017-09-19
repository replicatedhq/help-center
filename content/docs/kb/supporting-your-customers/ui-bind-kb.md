---
date: "2017-08-08T00:09:10Z"
lastmod: "2017-08-T00:09:10Z"
title: "Changing ui-bind-port On A Running Container"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

By defualt, the Replicated install script binds the Replicated UI to port :8800.

You can add a flag in the Replicated install script to specify in which port you want the Replicated UI to be bound to.

Example install script with bound port specified:

```shell
curl -sSL https://get.replicated.com/docker | sudo bash -s ui-bind-port=8000
```  

It is also possible to change the ui-bind-port on a running application by editing the system service files manually.

Depending on your distro, you can use edit the following files:

```shell 
/etc/systemd/system/replicated-ui.service
``` 

or 

```shell 
etc/init/replicated-ui.conf
``` 

and restart replicated-ui using 

```shell 
sudo service replicated-ui restart
```

Additionally, you can run the same install script you used during the initial installation and specify the port

```shell 
curl -sSL https://get.replicated.com/docker | sudo bash -s ui-bind-port=XXXX
```

Replace the XXXX with the desired port.


