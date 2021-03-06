---
date: "2016-07-03T04:02:20Z"
title: "Password Integrity"
description: "A description of how we validate password integrity"
weight: "1903"
categories: [ "Security" ]
index: "other"
---

{{< linked_headline "Vendor Password Integrity" >}}

Replicated stores your account password as a bcrypt hash with a cost parameter of 10. This is a non-reversible method that ensures that nobody can view your plain text password.

When you log in, your password is sent to our servers where we calculate a bcrypt hash of the entered password and compare that to the hash we have stored in our database. If these match, access to your account is granted and you are logged in. 

The only time we have access to your plain text password is at login and when you change or update your password. During this time, we also calculate a separate, non-reversible hash of your password and [compare it to a list of password hashes](https://blog.cloudflare.com/validating-leaked-passwords-with-k-anonymity/) that are known to have been compromised from other providers. If your password hash is on this list, we will alert you with a banner and a warning. We recommend that you change your password to a securely generated password, preferably one that is not re-used or shared on other sites. We never send your password or the full hash of your password to anyone, including when checking if your password has been compromised.
