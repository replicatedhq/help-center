---
date: "2018-01-30T04:02:20Z"
title: "Spec"
description: "A support bundle spec defines what data to collect and store in a support bundle."
weight: "801"
categories: [ "Support Bundle" ]
index: "guides"
tags: ["Support Bundle"]
type: "guide"
gradient: "orangeToOrange"
---

You can define what to include in your support bundle by creating and editing a support bundle spec. This is simply a YAML document that defines 

- What files and command outputs to include in the bundle
- How data is stored and organized inside the bundle
- Lifecycle, messages and prompts that will be displayed to your customer when generating a support bundle

The support bundle spec is a single YAML document with two top level keys, `specs` and `lifecycle`.

### `specs`
The `specs` top level YAML key contains as many items as you'd like, each defining an item to include in the bundle. We've shipped and included many built-in commands that can be very simple to add.

For example, you can include `uptime` in the support bundle to determine how long it's been since the server was last rebooted:

```yaml
specs:
  - os.uptime:
      output_dir: /os/uptime
```

Some specs require additional options to be included. For example, to run a command and include the output in the support bundle:
```yaml
specs:
  - os.run-command:
      output_dir: /commands/ping-google/
      name: ping
      args:
        - "www.google.com"
```

There are also some specs that support optional arguments that are often passed directly through to the command that is being run. For example, to collect the output of `docker ps`, you could include

```yaml
-specs:
  - docker.container-inspect:
      output_dir: /docker/my-container
```

The `docker ps` command only includes running containers, by default. If you want to include all, containers, you could change this spec to be the example below. Note the capitalized `All` because that's how Docker's seriaization library receives this. Replicated doesn't translate these options; we pass them directly through to the command.

```yaml
-specs:
  - docker.container-inspect:
      output_dir: /docker/my-container
      container_list_options:
        All: true
```


### `lifecycle`


The `lifecycle` message allows you to confiugre messages and prompts, and optionally securely upload the support bundle to the analysis tools at `https://console.replicated.com`. By default, if no lifecycle is specified, the support bundle spec will prompt the user, asking if they want to upload the generated bundle. This default is the equivilent of the following `lifecycle` spec:


```yaml
- lifecycle:
  - mesage:
    contents: "Starting support bundle collection..."
  - generate: {}
  - upload:
    - prompt:
        message: "Done! Do you want to upload the support bundle for analysis?"
        accept: "Upload complete!"
        decline: "Skipping upload. Please send the support bundle at {{.BundlePath}} to support."
        defualt: true
```

The `lifecycle` key can include as many messages before and after the `generate` step as you'd like. Normally there should be exactly one `generate` step. As in the example above, there are some template functions available in the messaging. These are defined in the support bundle template functions reference documentation.
