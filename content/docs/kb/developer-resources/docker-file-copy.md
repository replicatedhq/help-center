---
date: "2016-10-01T00:00:00Z"
lastmod: "2016-10-01T00:00:00Z"
title: "Docker File Copy"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Docker"]
---

One of the challenges of running containerized application is limited access to host OS information and resources.  This article intends to demonstrate one way to access files on the host OS that are not available to an application running inside of a container.

This article shows how to read `/etc/hosts` file from the host OS.   This approach can be used to read entire directories.

## Method Summary

One way to read a file from inside a container is to start another container with the file mounted and then use the Docker `copy` function.  There are two versions

* `archive` - added in docker 1.8 (API v1.20)
* `copy` - removed in docker 1.12 (API v1.24)

This example will use the `archive` function.

## Container Requirements

### Communicating with Docker daemon

In order for application to be able to issue docker commands from inside a container, the container will need to have the docker socket file mounted. Custom configurations can run Docker listening on a TCP socket. In those rare cases this mount is not necessary. However the host IP address needs to be routable from inside the container.

This example will use the socket file.  So the basic run command that will launch the initial application container will look like this:

```bash
docker run \
  -v /var/run/docker.sock:/host/var/run/docker.sock \
  dockercp
```

### Starting the secondary container

`dockercp` is the image name that will be used in the example.  However, the secondary container started from the main application container can be based on any public or private image.

## Example Source Code

```go
package main

import (
	"archive/tar"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"github.com/fsouza/go-dockerclient"
)

func mountedPath(path string) string {
	return filepath.Join("/host", path)
}

func main() {
	dockerCli, err := docker.NewClient("unix:///host/var/run/docker.sock")
	if err != nil {
		panic(err)
	}

	fileToDownload := "/etc/hosts"
	tarStream := getTarStream(dockerCli, fileToDownload)
	defer tarStream.Close()

	fmt.Println("Downloading", fileToDownload, "as tar")

	tarReader := tar.NewReader(tarStream)
	for {
		header, err := tarReader.Next()
		if err == io.EOF {
			break
		}

		if err != nil {
			panic(err)
		}

		fileInfo := header.FileInfo()
		// Should also check if file is a link in real life
		if fileInfo.IsDir() {
			fmt.Println("Got dir", header.Name)
			continue
		}

		fmt.Println("Got file", header.Name, "with size", header.Size)
		fmt.Println("=========Contents=========")
		if _, err = io.CopyN(os.Stdout, tarReader, header.Size); err != nil {
			panic(err)
		}
		fmt.Println("==========================")
	}
	fmt.Println("Download complete")
}

func getTarStream(cli *docker.Client, filename string) io.ReadCloser {
	container := createContainer(cli, filename)
	fmt.Println("Created container", container.ID)
	defer removeContainer(cli, container)

	startContainer(cli, container)
	fmt.Println("Started container")

	preader, pwriter := io.Pipe()
	opts := docker.DownloadFromContainerOptions{
		Path:         mountedPath(filename),
		OutputStream: pwriter,
	}

	// Let docker asynchronously write into the pipe while we are reading it on the other end
	go func() {
		defer pwriter.Close()
		fmt.Println("Requesting file", opts.Path)
		if err := cli.DownloadFromContainer(container.ID, opts); err != nil {
			panic(err)
		}
	}()

	return preader
}

func createContainer(cli *docker.Client, filename string) *docker.Container {
	createOpts := docker.CreateContainerOptions{
		Config: &docker.Config{
			// any image that has the command specified below can be used
			Image: "dockercp",
			// "cat" with no arguments will simply block indefinitely ensuring that the container does not terminate.
			Cmd:        []string{"cat"},
			Entrypoint: []string{},
			OpenStdin:  true,
		},
		HostConfig: &docker.HostConfig{
			Binds: []string{fmt.Sprintf("%s:%s", filename, mountedPath(filename))},
		},
	}

	container, err := cli.CreateContainer(createOpts)
	if err != nil {
		panic(err)
	}
	return container
}

func startContainer(cli *docker.Client, container *docker.Container) {
	if err := cli.StartContainer(container.ID, nil); err != nil {
		panic(err)
	}
}

func removeContainer(cli *docker.Client, container *docker.Container) {
	removeOpts := docker.RemoveContainerOptions{
		ID:            container.ID,
		RemoveVolumes: true,
		Force:         true,
	}

	err := cli.RemoveContainer(removeOpts)
	if err != nil {
		if _, ok := err.(*docker.NoSuchContainer); ok {
			return
		}
		panic(err)
	}
}
```

Runnable project is available in [this public](https://github.com/replicatedcom/example-dockercp) repository.
