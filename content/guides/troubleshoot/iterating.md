---
date: "2018-01-30T04:02:20Z"
title: "Iterating"
description: "A guide to iterating on support bundle specs to retrieve more information in bundles"
weight: "803"
categories: [ "Support Bundle" ]
index: false
type: "chapter"
gradient: "orangeToOrange"
icon: "troubleshoot"
---

Once you've run your first support bundle, the next step is to get comfortable expanding
your spec and generating updated bundles based on your changes.

To start, we'll want to navigate to the "specs" tab of [console.replicated.com](https://console.replicated.com/troubleshoot/specs), and pull up our default spec.

![](/images/guides/support-bundle/sb-spec-list.png)


From here, we can click edit, and it will pull up the spec editor, which should be populated with some defaults based on the tiles we checked back in [Support Bundle Specs](/guides/troubleshoot/spec):

![](/images/guides/support-bundle/spec-edit.png)

For example, if you initially selected only the "Docker" checkbox, your spec may look something like this:

```yaml
specs:
- docker.info:
    output_dir: /docker/info
- docker.ps:
    output_dir: /docker/ps
```

Let's now extend this to also collect a file from the host using the `os.read-file` collector. In this case we'll imagine we're troubleshooting a DNS problem, so we'll add the contents of `/run/resolvconf/resolv.conf` to our spec:

```yaml
specs:
- docker.info:
    output_dir: /docker/info
- docker.ps:
    output_dir: /docker/ps
- os.read-file:
    filepath: "/run/resolvconf/resolv.conf"
    output_dir: "/dns/resolv"
```

That's it! Now we can save this spec, and collect another support bundle using the same command we ran in [Generate a Support Bundle](/guides/troubleshoot/generate). Our new bundle should now contain the additional files we requested:

```shell
$ docker run ... # etc
Starting support bundle collection...
Done! Do you want to upload the support bundle for analysis? [Y/n]: n
Skipping upload. Please send the support bundle at supportbundle.tar.gz to support.

$ tar xvf supportbundle.tar.gz
./
VERSION.json
default/
default/docker/
default/docker/docker_info.json
default/os-release/
default/os-release/os-release
dns/
dns/resolv/
dns/resolv/resolv.conf
docker/
docker/info/
docker/info/docker_info.json
docker/ps/
docker/ps/container_ls.json
error.json
index.json
meta.json
```

That's all it takes! Now we have our new files. We can repeat this process and add more files, then simply re-run the same `docker run` command to see our changes reflected.

This guide only scratches the surface of what's possible with the Troubleshoot's support bundle collectors, but at this point you should feel ready to iterate and experiment with using different files and commands to troubleshoot your application. 
