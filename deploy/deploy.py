#!/bin/python
import boto
from boto.sqs.message import RawMessage
import json
import os

data = {
    "project": os.environ["CIRCLE_PROJECT_REPONAME"],
    "sha": os.environ["CIRCLE_SHA1"][:7]
}

sqs = boto.connect_sqs()
q = sqs.create_queue(os.environ["SQS_NAME"])

m = RawMessage()
m.set_body(json.dumps(data))
q.write(m)
