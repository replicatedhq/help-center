---
date: "2017-09-05T00:00:00Z"
lastmod: "2017-09-05T00:00:00Z"
title: "SELinux"
weight: "999999"
categories: [ "Supporting Your Customers" ]
index: "docs"
---
Some customers may wish to install Replicated on a server with SELinux enabled.
The Replicated native and Kubernetes schedulers are compatible with SELinux as of v2.12.0.

## Docker & SELinux
SELinux labels processes with domain types that can be given permission to manage system resources such as ports and files.
When used together, SELinux provides an additional layer of security around the isolation features offered by containers.

Docker starts containers in the `unconfined_t` domain by default, which effectively bypasses the SELinux kernel.
Pass the `--selinux-enabled` flag to docker to begin enforcement on containerized processes.
SELinux must also be enabled and enforcing on your system for this to take effect.
Run `sestatus` or view the contents of `/etc/selinux/config` to check the status of SELinux.

When started with the `--selinux-enabled` flag, Docker starts containers in the `svirt_lxc_net_t` domain.
The `svirt_lxc_net_t` domain provides full networking capabilities, read/execute access to /usr,and full access to files labeled `svirt_sandbox_file_t`.
This type is suitable for most containerized components, such as Redis, MySQL, or Nginx.

## The spc_t domain
Some applications like Replicated are required to monitor hosts and launch other containers.
These cannot be run under in the unmodified `svirt_sandbox_file_t` domain.
Fortunately the `spc_t` domain [was designed for this use case](https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept/).
Run a container in the `spc_t` domain with the `--security-opt` flag:
```
docker run --security-opt label=type:spc_t replicated
```
The install scripts configure Replicated to run in this domain.

## Preparing Your Application for SELinux
The first step to packaging an application for SELinux is to identify volumes that must be accessed by containers.
The `z` and `Z` volume options tell Docker to relabel files in a directory before mounting them in a container.
In your Yaml config use the "z" option for volumes that must be shared between multiple containers and the "Z" option for volumes that only need to be accessible to a single container.
```yaml
volumes:
- host_path: /dbdata
  container_path: /var/lib/mysql
  options: ["Z"]
```
Be careful not to relabel directories containing files required by other processes. Mounting `/etc` or `/var` with the "z" option would break most systems.

The second step is to identify components that cannot run within the `svirt_lxc_net_t` domain and apply a different label to them.
```yaml
  security_options:
  - label=type:my_app_t
```
If using a custom type as in this example, the relevant policy must be installed before starting the application.
Reusing an existing type such as `spc_t` for these containers will obviate the need to write and distribute policy.

### Debugging an Application
Let's look at a simple example of packaging an application to run under SELinux.
If you create a release containing the following Redis component and attempt to install it on a server with SELinux enabled, you'll notice the Redis container is crashing.
```yaml
components:
- name: DB
  containers:
  - source: public
    image_name: redis
    version: latest
    cmd: "[\"redis-server\", \"--appendonly\", \"yes\"]"
    volumes:
    - host_path: /data
      container_path: /data
```

Since the app works without SELinux enabled, the first place to investigate is the SELinux audit log.
```
tail -f /var/log/audit/audit.log | grep avc
```

This will show permission denied errors similar to the following:

```
type=AVC msg=audit(1504739956.487:4194): avc:  denied  { setattr } for  pid=6210 comm="chown" name="data" dev="sda1" ino=612444061 scontext=system_u:system_r:svirt_lxc_net_t:s0:c652,c951 tcontext=system_u:object_r:root_t:s0 tclass=dir
```

That record is reporting a denial of a container process (svirt_lxc_net_t) attempting to manage a directory named "data". Find the exact target directory by searching for the reported inode.

```
find / -inum 612444061

# /data
```

Returning to the yaml config, notice the Redis container attempts to mount the hosts "/data" directory. On your server, check the SELinux label applied to this directory.

```
ls -Zd /data

# dr-xr-xr-x. root root system_u:object_r:root_t:s0 /data
```

The directory has the root_t label, which the container process cannot access. Update the yaml config for the volume with an option that will cause Docker to relabel the host directory with a context accessible to the container.

```
volumes:
- host_path: /data
  container_path: /data
  options: ["Z"]
```

This single redis container is the sole user of the /data directory, so we can use the "Z" options, which will label it with a context unique to this container.

After creating a new release with the updated config and upgrading the installed app, the Redis component works as expected.

## Best Practices
* Add the `"z"` or `"Z"` option to all volumes mounted in containers unless their content needs to be accessible to non-containerized processes.
* Test applications with SELinux enabled while using the audit log to identify components with incorrect permissions.
* Consider the `spc_t` for containers designed to manage host systems.
