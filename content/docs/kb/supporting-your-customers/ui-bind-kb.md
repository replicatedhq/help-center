---
date: "2017-08-08T00:09:10Z"
lastmod: "2017-09-22T00:09:10Z"
title: "Changing The Admin Console Port Number"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---

By default, the Replicated install script binds the Admin Console to port :8800.

You can add a flag in the Replicated install script to specify in which port you want the Admin Console to be bound to.

Example install script with bound port specified:

```shell
curl -sSL https://get.replicated.com/docker | sudo bash -s ui-bind-port=8000
```  

It is also possible to change the Admin Console port after an installation by re-running the Replicated install script with the desired bound port.

Additionally, you can edit the following files according to your Operating System:

```shell 
/etc/systemd/system/replicated-ui.service
``` 

or 

```shell 
etc/init/replicated-ui.conf
``` 

and restart the Admin Console using 

```shell 
sudo service replicated-ui restart
```




