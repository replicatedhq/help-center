---
date: "2016-07-03T04:02:20Z"
title: "Packaging an Application"
description: "An overview of the Replicated YAML."
weight: "201"
type: "docs"
layout: "special"
categories: [ "Packaging" ]
docsList:
  - title: Admin Commands
    uri: /docs/packaging-an-application/admin-commands
    description: Implementation guide for application vendors to provide customers with aliased CLI commands that can be performed in the containers across a cluster.
  - title: Application Properties
    uri: /docs/packaging-an-application/application-properties
    description: The Replicated YAML section `properties` allows several high level items to be defined.
  - title: Clustering
    uri: /docs/packaging-an-application/clustering
    description: An implementation guide for using the Replicated built in clustering functionality.
  - title: Commands
    uri: /docs/packaging-an-application/commands
    description: The `cmds` section of the Replicated YAML allows you to leverage the power of external commands within your application configuration.
  - title: Components And Containers
    uri: /docs/packaging-an-application/components-and-containers
    description: The `components` section of the Replicated YAML defines how the containers will be created and started.
  - title: Config Screen
    uri: /docs/packaging-an-application/config-screen
    description: The `config` section of the Replicated YAML creates a dynamic settings page that customers can use to configure their instance.
  - title: Custom Metrics
    uri: /docs/packaging-an-application/custom-metrics
    - title: Custom Preflight Checks
    uri: /docs/packaging-an-application/custom-preflight-checks
    description: A guide to implementing the Custom Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update.
  - title: Docker Swarm
    uri: /docs/packaging-an-application/docker-swarm
    description: Packaging a Docker Swarm application in Replicated
  - title: Events and Orchestration
    uri: /docs/packaging-an-application/events-and-orchestration
    description: The `events` section of the Replicated YAML allows application vendors to sequence and orchestrate containers based on events from other containers.
  - title: Packaging an Application
    uri: /docs/packaging-an-application/index
    description: An overview of the Replicated YAML.
  - title: Kubernetes
    uri: /docs/packaging-an-application/kubernetes
    description: Packaging a Kubernetes application in Replicated
  - title: LDAP and Identity Integration
    uri: /docs/packaging-an-application/ldap-integration
    description: Enabling LDAP and AD user auth and sync in an application through Replicated.
  - title: Kubernetes Preflight Checks
    uri: /docs/packaging-an-application/preflight-checks-k8s
    description: A guide to implementing the Kubernetes Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update.
  - title: Preflight Checks
    uri: /docs/packaging-an-application/preflight-checks
    description: A guide to implementing the Preflight Checks feature to analyze customer systems to determine if the environment meets the minimum requirements for installation or update.
  - title: Snapshots
    uri: /docs/packaging-an-application/snapshots
    description: Guide to enabling application snapshots for backup and restore functionality.
  - title: Support Bundle
    uri: /docs/packaging-an-application/support-bundle
    description: Installed instances can generate a support bundle with relevant logs and instance information.
  - title: Template Functions
    uri: /docs/packaging-an-application/template-functions
    description: The dynamic configuration management functionality available throughout the Replicated YAML.
  - title: Test Procs
    uri: /docs/packaging-an-application/test-procs
    description: Test Procs enable customers to easily test the validity of the unsaved configuration parameters they're entering during/ installation.
  - title: YAML Overview
    uri: /docs/packaging-an-application/yaml-overview
    description: An overview of the various sections of the Replicated YAML.
hideSection: true
---

The first step to shipping your application in Replicated is to create a YAML file that defines
the properties, containers, optional configuration and more.  This section of docs explains how
to write this YAML file.
