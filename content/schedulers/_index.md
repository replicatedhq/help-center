---
layout: "schedulers"
title: "Replicated Scheduler Types"
uri: /schedulers/
schedulerTypes:
  - title: "Replicated + built-in scheduler"
    type: "replicated"
    description: "<p>The Replicated scheduler is a mature container orchestration runtime that supports Docker 1.7.1 and newer.</p><p>Used by over 500 enterprises in production systems today. This scheduler is a good choice if you want to maximize compatibility with enterprise systems and want to provide a simple, appliance-like experience.</p>"
    features:
      - title: "One-Line installation"
        description: "Built into the platform, other than Docker, there are no additional dependencies required."
        iconClass: "commandPromptRed"
      - title: "Supports Docker 1.7.1 and later"
        description: "Compatible with Docker 1.7.1 and above, the Replicated Scheduler is a good solution for customers using legacy operating systems such as CentOS 6 and RHEL 6."
        iconClass: "dockerRed"
      - title: "Easy to run and manage"
        description: "The Replicated scheduler manages Docker containers with no additional command line tools."
        iconClass: "containersRed"
  - title: "Kubernetes + Replicated"
    type: "kubernetes"
    description: "Kubernetes is a powerful and popular container orchestration and scheduler platform. Many organizations are investing in running their hosted product on Kubernetes, and want to leverage this investment for enterprise installations. Replicated minimizes the interactions between your customer and the Kubernetes cluster. The Admin Console provides functionality required to manage your application."
    features:
      - title: "Reuse your existing k8s specs"
        description: "Existing kubernetes yml files are compatible with Replicated."
        iconClass: "ymlBlueDark"
      - title: "Run at scale"
        description: "Kubernetes is a powerful scheduler that is capable of running extremely large clusters."
        iconClass: "powerBlue"
      - title: "Bring your own cluster"
        description: "Replicated works on existing Kubernetes clusters."
        iconClass: "replicatedIconBlue"
  - title: "Docker Swarm + Replicated"
    type: "dockerSwarm"
    description: "Docker Swarm is great if you have existing docker-compose files and want to target servers running Docker 1.13.1 or newer. Replicated supports deploying Swarm services to a swarm cluster. On operating systems supporting Docker 1.13.1 or later, you can provide an appliance-like enterprise experience using the Swarm scheduler, using your existing docker-compose.yml."
    features:
      - title: "One-line installation"
        description: "The only requirement to use Swarm is Docker 1.13.1 or later. Replicated will automatically provision the Swarm cluster."
        iconClass: "commandPromptBlue"
      - title: "Reuse your docker-compose.yml"
        description: "Existing docker-compose yml (v3 or later) is compatible with Replicated."
        iconClass: "ymlBlueLight"
      - title: "Rolling updates"
        description: "Docker Swarm services support high availability deployments and zero downtime rolling updates."
        iconClass: "refreshBlue"
featureTableItems:
  - one:
    name: "One-line installation"
    support: ["greenCheck", "grayFail", "greenCheck"]
  - two:
    name: "Zero downtime updates"
    support: ["grayFail", "greenCheck", "greenCheck"]
  - three:
    name: "Automatic node failover"
    support: ["grayFail", "greenCheck", "greenCheck"]
  - four:
    name: "Airgap support"
    support: ["greenCheck", "grayFail", "greenCheck"]
  - five:
    name: "Preflight Checks"
    support: ["greenCheck", "greenCheck", "greenCheck"]
  - six:
    name: "Support Bundle Generator"
    support: ["greenCheck", "greenCheck", "greenCheck"]
  - seven:
    name: "Brandable Admin Console"
    support: ["greenCheck", "greenCheck", "greenCheck"]
  - eight:
    name: "Automated App Updates"
    support: ["greenCheck", "greenCheck", "greenCheck"]
  - nine:
    name: "Differential Snapshot & Restore"
    support: ["greenCheck", "grayFail", "grayFail"]
  - ten:
    name: "LDAP/AD Integration"
    support: ["greenCheck", "greenCheck", "greenCheck"]
  - eleven:
    name: "Security Audit Logging Service"
    support: ["greenCheck", "grayFail", "grayFail"]
  - twelve:
    name: "Advanced Reporting Dashboard"
    support: ["greenCheck", "greenCheck", "greenCheck"]
---

###### Scheduler Intro Headline

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.