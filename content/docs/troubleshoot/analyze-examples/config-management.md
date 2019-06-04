---
date: "2019-06-04T12:00:00Z"
title: "Config Management"
description: "Config Management custom Troubleshoot Analyzer example"
weight: "2153"
categories: [ "Replicated Troubleshoot" ]
index: ["docs/troubleshoot", "docs"]
icon: "replicatedTroubleshoot"
gradient: "orangeToOrange"
---

# Config Management Software

Popular configuration management tools such as Chef, Puppet and Ansible are used to help management large numbers of servers using automation.

When setting up a server, especially an appliance, it is important to have the server running with known-compatible software and dependencies. When an appliance is provisioned in an environment, occasionally these configuration management tools will run and attempt to bring all of the software to known versions to match other servers in the environment. This can sometimes cause changes made locally to be reverted later.

The support bundle analyzers will detect if Chef or Puppet agents are installed and configured, and surface this as informational. It's important to know this when troubleshooting a server because manual changes may not be possible.

```yaml
analyze:
  v1:
    - name: processes.configmanagement.puppet
      labels:
        iconKey: puppet_logo
        desiredPosition: "10"
      insight:
        primary: Managed By Puppet
        detail: This server is running a Puppet agent
        severity: info
      registerVariables:
        - name: ps
          fileMatch:
            pathRegexps:
              - default/commands/ps/stdout
            regexpCapture:
              regexp: '.+puppet agent .*'
              index: 0
      evaluateConditions:
        - condition:
            regexpMatch:
              regexp: 'puppet agent '
            variableRef: ps
          insightOnFalse:
            primary: No Puppet
            detail: This server is not running a puppet agent
            severity: debug
            labels:
              iconKey: gray_checkmark
    - name: processes.configmanagement.chef
      labels:
        iconKey: chef_logo
        desiredPosition: "10"
      insight:
        primary: Managed By Chef
        detail: This server is running a Chef client
        severity: info
      registerVariables:
        - name: ps
          fileMatch:
            pathRegexps:
              - default/commands/ps/stdout
            regexpCapture:
              regexp: '.+chef-client.*'
              index: 0
      evaluateConditions:
        - condition:
            regexpMatch:
              regexp: 'chef-client'
            variableRef: ps
          insightOnFalse:
            primary: No Chef
            detail: This server is not running a Chef client
            severity: debug
            labels:
              iconKey: gray_checkmark
```
