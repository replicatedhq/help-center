## Contributing Guidelines
When contributing to the Replicated documentation, please consider the following writing styles:  

- ### Avoid acronyms. If using one, make sure to define it on first use.

- ### Writing for the audience.
The audience is a software vendor and that should not need to be made explicit in the docs. The term *customer* should be used only to refer to the vendor's customers, the end user of Replicated.  
**Yes:** This section explains the options available when creating a license for your customer's installation.  
**No:** This section explains the options available to vendors when creating a license for an end customer's installation.

- ### Favor writing in the [active voice](http://writing.wisc.edu/Handbook/CCS_activevoice.html).
**Yes:**  The next section includes some basic information about our app release including the app name.  
**No:**  In the next section we include some basic information about our app release including the app name.

- ### Avoid Second Person Pronouns
**Yes:** A license value can be used to show and hide fields on the settings page.
**No:** You can use your license to allow customer access to hidden settings.

- ### Do not reference relative time from when the document was written.
**Yes:** Replicated 2.0.1640 includes a new feature to...  
**No:** A new feature of Replicated is...  
 
- ### Use relevant, descriptive anchor text in links.
**Yes:** ```More information is available in the <a href="/link">release notes</a>.```  
**No:**  ```For more information, read the release notes <a href="/link">here</a>.```  

- ### Only use Markdown backticks on code or command literals.  
The backtick symbol shouldn't be used for emphasis.

- ### Code snippets in bash should not include sudo.
**Yes:**  ```docker logs -f replicated```  
**No:** ```sudo docker logs -f replicated```

- ### Multi-line code snippets should not have the bash prompt.
**Yes:**  
```
docker rmi quay.io/replicated/replicated
docker pull quay.io/replicated/replicated
```
**No:**  
```
$ docker rmi quay.io/replicated/replicated
$ docker pull quay.io/replicated/replicated
```  

- ### Avoid `<h1>` tags on a page.
Use`<h2>` tags to separate page content. If there's a need for another `<h1>`, consider a new document.

- ### Do not end header text with a colon.
**Yes:** `## Installation Guide`  
**No:** `## Installation Guide:`  

- ### Use hyphens in filenames, not underscores.

- ### The product and the company are named Replicated (with a capital R).
**Yes:** How to install Replicated.  
**No:** How to install replicated.  

- ### The container, the daemon and the Linux process are named replicated (with a lowercase r).
**Yes:** Collect the logs from the replicated-ui container.  
**No:** Collect the logs from the Replicated-UI container.  

- ### Use the following terms, when referring to components and parts of the ecosystem.
  - *distribution(s)* of Linux, not *flavors*  
  - The Replicated UI should be referred to as the *Admin Console*, not *management console* or *on-prem management console*  
  - *snapshots* not *backups*  

- ### None of these rules are absolute  
It's perfectly acceptable (and often reasonable) to break these rules on occasion. No writing style can cover 100% of the possible use cases.