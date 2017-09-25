---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Image Tagging Best Practices"
weight: "999999"
categories: [ "Developer Resources" ]
index: "docs"
tags: ["Application YAML"]
---

For your Replicated YAML, we highly encourage you to push images with a specific tag & avoid the 
"latest" tag. This rule can be ignored when you're in early development stages and constantly 
updating your images. However, once you're becoming more production ready, we suggest tagging 
images with some type of version (we generally just use the sha of the GitHub commit). This is 
valuable when you have multiple release channels & want to be able to maintain a constant version 
in the stable channel, but experiment with the unstable channel.

