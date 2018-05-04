---
date: "2018-05-02T01:19:20Z"
title: "Quay Enterprise"
description: "Shipping Quay Enterprise on Replicated Ship"
weight: "46002"
categories: [ "Ship Examples" ]
index: ["docs/products", "docs"]
icon: "replicatedShip"
gradient: "console"
---

[Quay Enterprise](https://coreos.com/quay-enterprise/) is a proprietary, enterprise-ready container registry. Quay Enterprise is designed to run on Kubernetes, and has public installation instructions available on the [CoreOS documentation](https://coreos.com/quay-enterprise/docs/latest/tectonic/index.html). This is an example of converting these manual installation instructions into an easy-to-use, scriptable process.

## What we will do
Quay Enterprise has a requirement that it be deployed to an existing Kubernetes cluster. There are several Kubernetes spec files that make up the product, and some configuration variables. Some of the Kubernetes definitions are optional, and only used in certain conditions. This example will include all of the options, and create a CLI/UI for the end user who is installing Quay to select how it will be installed.

The end result is a Replicated Ship YAML file that is available in this [GitHub Gist](https://gist.github.com/marccampbell/bae0e6177865d55828b5afd35bf55314).

## Building the spec
At the time of the installation instructions, there are 6 Kubernetes YAML files that are needed. Let's start by adding these as `web` specs to our new YAML file. These are static YAML files; they don't change based on any environment or customer supplied data. We will let the end customer's installer automatically download these (they are public) and save these YAML files to a `./k8s/` directory on the installers workstation.

```yaml
assets:
  v1:
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-namespace.yml
        dest: ./installer/k8s/quay-enterprise-namespace.yml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-config-secret.yml
        dest: ./installer/k8s/quay-enterprise-config-secret.yml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-redis.yml
        dest: ./installer/k8s/quay-enterprise-redis.yml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-app-rc.yml
        dest: ./installer/k8s/quay-enterprise-app-rc.yml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-service-nodeport.yml
        dest: ./installer/k8s/quay-enterprise-service-nodeport.yml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-enterprise-service-loadbalancer.yml
        dest: ./installer/k8s/quay-enterprise-service-loadbalancer.yml

```

### Image Pull Secret

The installation instructions also require that you download a Pull Secret from your account and store this in a file named `config.json`. This value changes per install, and is user-supplied data. We can write this as a dynamic file in Replicated Ship, and create a prompt (CLI and UI) for the user to supply this value when installing:

```yaml
assets:
  v1:
    - inline:
        dest: ./installer/secrets/config.json
        contents: |
          {{repl ConfigOption "pull_secret"}}
config:
  v1:
    - name: license
      title: License
      items:
        - name: pull_secret
          title: Pull Secret
          required: true
          type: textarea
```

The above YAML will create a required input when installing to enter the `pull_secret` variable. The `inline` asset defined contains just the contents of the pull secret that was supplied.

### RBAC
CoreOS has defined 3 different RBAC policies, depending on which version of Tectonic you are running. In this example, we'll add each of these in, and let the install script automatically determine which version to include:

```yaml
assets:
  v1:
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role-k8s1-6.yaml
        dest: ./installer/k8s/1.6/quay-servicetoken-role-k8s1-6.yaml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role-binding-k8s1-6.yaml
        dest: ./installer/k8s/1.6/quay-servicetoken-role-binding-k8s1-6.yaml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role.yaml
        dest: ./installer/k8s/1.5/quay-servicetoken-role.yaml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role-binding.yaml
        dest: ./installer/k8s/1.5/quay-servicetoken-role-binding.yaml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role.yaml
        dest: ./installer/k8s/1.4/quay-servicetoken-role.yaml
    - web:
        url: https://coreos.com/quay-enterprise/docs/latest/tectonic/files/quay-servicetoken-role-binding-k8s1-4.yaml
        dest: ./installer/k8s/1.4/quay-servicetoken-role-binding-k8s1-4.yaml
```

### Ingress
Quay has two ingress options available: a load balancer or a nodeport. Selecting the right option depends on if the installer is targeting a cloud provider or not:

```yaml
config:
  v1:
    - name: ingress
      title: Ingress
      items:
        - name: ingress_type
          title: Ingress Type
          type: select_one
          default: node_port
          items:
            - name: node_port
              title: Node Port
            - name: load_balancer
              title: Load Balancer
```


## Install Script
Now that all of the YAML is included, we can create a simple bash script to run the installation:

```yaml
assets:
  v1:
    - inline:
        contents: |
          #!/bin/bash
          kubectl create -f ./installer/k8s/quay-enterprise-namespace.yml
          kubectl create secret generic coreos-pull-secret --from-file=".dockerconfigjson=installer/secrets/config.json" --type='kubernetes.io/dockerconfigjson' --namespace=quay-enterprise

          server_version_major = $(kubectl version) ## todo
          server_version_minor = $(kubectl version) ## todo

          if [ $server_version_major == '1' ]; then
            if [ $server_version_minor == '6' ]; then
              kubectl create -f ./installer/k8s/1.6/quay-servicetoken-role-k8s1-6.yaml
              kubectl create -f ./installer/k8s/1.6quay-servicetoken-role-binding-k8s1-6.yaml
            fi

            if [ $server_version_minor == '5' ]; then
              kubectl create -f ./installer/k8s/1.5/quay-servicetoken-role.yaml
              kubectl create -f ./installer/k8s/1.5/quay-servicetoken-role-binding.yaml
            fi

            if [ $server_version_minor == '4' ]; then
              kubectl create -f ./installer/k8s/1.4/quay-servicetoken-role.yaml
              kubectl create -f ./installer/k8s/1.4/quay-servicetoken-role-binding-k8s1-4.yaml
            fi

          fi

          kubectl create -f quay-enterprise-config-secret.yml -f quay-enterprise-redis.yml -f quay-enterprise-app-rc.yml}

          {{repl if ConfigOptionEquals "ingress_type" "load_balancer"}}
          kubectl create -f ./installer/k8s/quay-enterprise-service-loadbalancer.yml
          kubectl describe services quay-enterprise --namespace=quay-enterprise
          {{repl end}}

          {{repl if ConfigOptionEquals "ingress_type" "node_port"}}
          kubectl create -f ./installer/k8s/quay-enterprise-service-nodeport.yml
          {{repl end}}
```

## Lifecycle and Messages
Finally, let's create some instructions and lifecycle messages for the user:

```yaml
lifecycle:
  v1:
  - message:
      contents: |
        This program will prepare a script and kubernetes manifests that can be used to deploy
        Quay.io enterprise to your existing Kubernetes cluster.
  - render: {}
  - message:
     contents: |
        Quay.io Enterprise is ready to deploy to your kubernetes cluster.

        If you have kubectl configured locally, you can
        run the following command to deploy Quay.io to
        your kubernetes cluster:

            bash ./scripts/install.sh
  - message:
     level: warn
     contents: |
       A state file has been written to {{repl context "state_file_path" }} -- please store it
       somewhere safe, you'll need it if you want to update or recover this installation of Quay.io Enterprise.
```

# Installing
Once this [complete yaml](https://gist.github.com/marccampbell/bae0e6177865d55828b5afd35bf55314) is saved in [Replicated Console](https://console.replicated.com), create a a customer, and generate an installation script. The installation process can be completed on the CLI or by using the Web-based Setup Console.

## CLI
Generating an install script for this will look like:
```bash
docker run ...
```

Once this is run on a workstation (not the server that will run Quay), it will walk through the defined lifecycle:

```shell
This program will prepare a script and kubernetes manifests that can be used to deploy
Quay.io enterprise to your existing Kubernetes cluster.

Enter a value for option "pull_secret" []: <snip>
Enter a value for option "ingress_type" [node_port]:

This command will generate the following resources:

	./installer/secrets/config.json
	./installer/scripts/install.sh
	./installer/k8s/quay-enterprise-namespace.yml
	./installer/k8s/quay-enterprise-config-secret.yml
	./installer/k8s/quay-enterprise-redis.yml
	./installer/k8s/quay-enterprise-app-rc.yml
	./installer/k8s/quay-enterprise-service-nodeport.yml
	./installer/k8s/quay-enterprise-service-loadbalancer.yml
	./installer/k8s/1.6/quay-servicetoken-role.yaml
	./installer/k8s/1.6/quay-servicetoken-role-binding.yaml
	./installer/k8s/1.5/quay-servicetoken-role.yaml
	./installer/k8s/1.5/quay-servicetoken-role-binding.yaml
	./installer/k8s/1.4/quay-servicetoken-role.yaml
	./installer/k8s/1.4/quay-servicetoken-role-binding-k8s1-4.yaml


Is this ok? [Y/n]: y

Quay.io Enterprise is ready to deploy to your kubernetes cluster.

If you have kubectl configured locally, you can
run the following command to deploy Quay.io to
your kubernetes cluster:

		bash ./scripts/install.sh


A state file has been written to .ship/state.json -- please store it
somewhere safe, you'll need it if you want to update or recover this installation of Quay.io Enterprise.
```

## Setup Console
Generating a UI-based install script for this will look like:
```shell
docker-compose up -f https://console.replicated.com/...
```