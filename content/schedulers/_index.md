---
layout: "schedulers"
title: "Replicated Scheduler Types"
schedulerTypes: 
  - title: "Replicated scheduler"
    type: "replicated"
    description: "The Replicated scheduler is a mature container orchestration runtime that supports Docker 1.7.1 and newer. The Replicated scheduler is being used by over (number) enterprises in production systems today. This scheduler is a good choice if you want to maximize compatibility with enterprise systems and want to provide a simple, appliance-like experience."
    features: 
      - title: "One-Line installation"
        description: "The Replicated scheduler is a built into the platform. Other than Docker, there are no additional dependencies required."
      - title: "Supports Docker 1.7.1 and later"
        description: "The Replicated scheduler remains compatible with Docker 1.7.1, making it a good candidate for legacy operating systems such as CentOS 6 and RHEL 6."
      - title: "Easy to run and manage"
        description: "The Replicated scheduler manages Docker containers with no additional command line tools."
  - title: "Kubernetes"
    type: "kubernetes"
    description: "Kubernetes is a powerful and popular container orchestration and scheduler platform. Many organizations are investing in running their hosted product on Kubernetes, and want to leverage this investment for enterprise installations. Replicated minimizes the interactions between your customer and the Kubernetes cluster. The Admin Console provides functionality required to manage your application."
    features: 
      - title: "Reuse your existing k8s specs"
        description: "Existing kubernetes yml files are compatible with Replicated."
      - title: "Run at scale"
        description: "Kubernetes is a powerful scheduler that is capable of running extremely large clusters."
      - title: "Bring your own cluster"
        description: "Replicated works on existing Kubernetes clusters."
  - title: "Docker Swarm"
    type: "dockerSwarm"
    description: "Docker Swarm is great if you have existing docker-compose files and want to target servers running Docker 1.13.1 or newer. Replicated supports deploying Swarm services to a swarm cluster. On operating systems supporting Docker 1.13.1 or later, you can provide an appliance-like enterprise experience using the Swarm scheduler, using your existing docker-compose.yml."
    features: 
      - title: "One-line installation"
        description: "The only requirement to use Swarm is Docker 1.13.1 or later. Replicated will automatically provision the Swarm cluster."
      - title: "Reuse your docker-compose.yml"
        description: "Exiting docker-compose yml (v3 or later) is compatible with Replicated."
      - title: "Rolling updates"
        description: "Docker Swarm services support high availaibility deployments and zero downtime rolling updates."
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
---
