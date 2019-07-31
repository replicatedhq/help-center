---
date: "2019-07-31T12:00:00Z"
title: "Rerieving Values at Runtime"
description: "A walkthrough of retrieving entitlement values at runtime from the Titled service."
weight: "30305"
categories: [ "Ship and Entitlements" ]
index: "guides/ship-and-entitlements"
type: "chapter"
gradient: "console"
icon: "replicatedShip"
nextPage: "fake-fake-fake"
---

# Rerieving Values at Runtime

License Field values can be retrieved at runtime by querying the Titled API at http://titled:3000/. See below for some examples:

{{< linked_headline "GET /license/v1/license" >}}

```bash
$ curl http://titled:3000/license/v1/license | jq
{
  "license_id": "CfdER3rXrdqONh9VhMAMqPVoKy0cUhm8",
  "expiration_time": "2019-12-31T00:00:00Z",
  "assignee": "Demo Customer",
  "release_channel": "Nightly",
  "license_type": "trial",
  "fields": [
    {
      "field": "num_seats",
      "value": 5,
      "type": "Integer"
    }
  ]
}
```

{{< linked_headline "GET /license/v1/field/<field name>" >}}

```bash
$ curl http://titled:3000/license/v1/field/num_seats | jq
{
  "field": "num_seats",
  "value": 5,
  "type": "Integer"
}
```

{{< linked_headline "GET /titled/v1/entitlements" >}}

```bash
$ curl http://titled:3000/titled/v1/entitlements | jq
{
  "meta": {
    "lastUpdated": "2019-07-31T22:25:26Z",
    "customerID": "ZQnOh6RKS7yeRnOSYZHc1Uc3zmFbOlFs"
  },
  "signature": "Llnn6nGeEJhfqLBeR3xTd3SCDjbNNOtkK/ewF4fJb3WtLlWUyoSHGjPiUjRX1b9Nr9sNi7zxzrKC2jcD5rgfrjnJbT9gIfBB82aoKmTR8veg7rIAgw9bvONHmvyIZP5+ba/8zf0z2vYipOEpMbD9kZ6y+14N5dOoR0qGhrvzqiDMbOgoapAdgF+WLQD1G3x/mZzjujzNzPwCKAFYusCQDSDNoWMgQRxUPd1wNUd0ivbAG4ruyGQuYjHgBd34ZYCho3Si7VEfACyCxD4H0ugiR9e2RxDFm9QJSisJhJvrO5m+aOmjxwEsrd1Uc+GdL1RW3G/6I0JWvmMJ/3Uds0zjuISOcQGw795wEirMRuEqKk9R+BFjrtAaxfs28Nbtd/D8McAXHJzpjRGdNymeFX8whR4N0Ztpt2RRXZ+OPaX8vrB5A50LmdIf5R62qiG6W3gXv/EMVc1C4lky/m/bRc81TKp1a/1DK+TzJ4xPd0XhoJndr0spO/4/5TDIRWnN2beJm/oMN2T6rYq+Yr2UagV7+sgKSb8aRiP2okZEoYFu3Cv/MUx+JDLra7OEQgtzbrwbSQ8hh6nvazmXmkJhVEtFkefPwFZ2vgdw9ZaH8oxwuig74xPNOlGTqEgIpy63ujpWVNcnEMlV4HlA7DgbNDntqNp0K0Ph4BAX4zgUhXZ2g8k=",
  "values": [
    {
      "key": "num_seats",
      "value": "5",
      "labels": [
        {
          "key": "replicated.com/app",
          "value": "GymwVsK5jO3Mbmwpfv6Oz1CKvAh3s03n"
        },
        {
          "key": "entitlements.replicated.com/type",
          "value": "Integer"
        }
      ]
    }
  ]
}
```
