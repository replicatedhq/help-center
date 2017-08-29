+++
date = "2017-08-29T00:00:00Z"
lastmod = "2017-08-29T00:00:00Z"
title = "Replicated Data API"
weight = "999999"
categories = [ "Knowledgebase", "Supporting Your Customers" ]
+++

### Data API

Replicated provides a method for sending data back to the customer via the combination of the integration API endpoint and a webhook configurable via Replicated admin. The webhook URL must be configured by a support engineer. The field can be found in the App Properties tab of the App section in admin web.

### POST $REPLICATED_INTEGRATIONAPI/license/v1/sync_with_data

Dynamically sets license field values. Takes form encoded data in the form of `field1=value&field2=value.`

A special key `_custom_data_field` has been provided that when sent will be forwarded to a webhook url provided by the vendor. The webhook url will receive a post request with payload `{"received": "<time.RFC3339>", "payload": "<data string>"}.`

Example:

```shell
curl -k $REPLICATED_INTEGRATIONAPI/license/v1/sync_with_data -X POST -d "field=value&__custom_data_field=mydata"
```