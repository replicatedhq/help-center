---
date: "2016-07-01T00:00:00Z"
lastmod: "2016-07-01T00:00:00Z"
title: "Resetting the Console Password"
weight: "999999"
categories: [ "Knowledgebase", "Supporting Your Customers" ]
---

If the customer chooses to secure their on-prem Replicated admin console with a 
password they can reset that password (or switch the authentication type to 
LDAP/unsecured) by visiting https://`<server>`/create-password.

If they are unable to remember the password (and hence unable to access the 
/create-password page), they can also reset the password if they have sudo access 
to the machine.

To do this they need to:

1. Use the following command: `replicated auth reset` to remove the password
1. Visit https://`<server>`:8800/create-password to create a new password or connect LDAP.


