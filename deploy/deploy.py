#!/bin/python
import boto
from boto.sqs.message import RawMessage
import json
import os
import sys

data = {
    "project": os.environ["CIRCLE_PROJECT_REPONAME"],
    "sha": os.environ["CIRCLE_SHA1"][:7]
}

branch = os.environ["CIRCLE_BRANCH"]
if branch == "release":
    queue_name = os.environ["SQS_NAME_PROD"]
elif branch == "master":
    queue_name = os.environ["SQS_NAME_STAGING"]
else:
    sys.exit(0)

sqs = boto.connect_sqs()
q = sqs.create_queue(queue_name)
m = RawMessage()
m.set_body(json.dumps(data))
q.write(m)
