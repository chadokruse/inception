# A simple app to gather ideas
==============================

This is a fork of the most excellent [Made with Meteor](https://github.com/meteor/madewith) sample app repurposed to gather ideas instead of app names and urls.

### Notable additions   
1. Added Mad-Lib style input form  
3. Added Mongo Admin feature
4. Updated styling
5. Added SEO-friendly URLs
6. Added Google Analytics (which is harder to do in Meteor than it should be)
7. Upon submission, idea is posted to a Sprint.ly project (love me some [Sprint.ly](https://www.sprint.ly))

### Notable todos
1.  Update code naming conventions to map to new use (e.g. ideas instead of apps/names, use who/what/why)
2.  I removed the audit-arguments-check package due to compatibility error. Would be nice (and secure) to add back.
3.  ~~Occasionally there is a delay on prod (as hosted by meteor). Currently messing around with using spin.js to indicate Meteor is thinking, but this is still a work in progress.~~
4.  The z-mongo-admin package is awesome! It works great but current implementation is throwing some errors which seem to be innocuous, but nonetheless need to be figured out.


## Getting started
See instructions [here](https://github.com/chadokruse/meteor-coming-soon-email-capture#getting-started) if this is your first Meteor app.

## Usage
 

1. Add Meteorite if not already installed  
`npm install -g meteorite`
2. Add the following packages: font-awesome, spin, router, z-mongo-admin  
e.g. `mrt add spin`
2. Add your Sprint.ly credentials to settings.json  
3. If you deploy to a public site, be sure to navigate to yourapp.com/admin and enter in a set of admin credentials. You app will be exposed until you do so.
4. Update relevant Google Analytics fields per your setup

(This section under development!) 


## Screenshots

![Landing Page](https://github.com/chadokruse/inception/raw/master/public/screenshot1.png)

## Disclaimer  

This code is provided "as is" with no warranties. It'll probably break and may expose your api keys and all of your site visitors' data. Proceed with caution.

### License

The Inception name, logo, and idea content is copyright Chad Kruse and may not be used for commercial projects. Everything else, do with it as you wish, commercial or otherwise. If you like formal licenses: Copyright (c) 2013 Chad Kruse, released under the MIT license.  

See [original meteor app](https://github.com/meteor/madewith) for licensing covering the original work.

### Credits

Original meteor app creation led by [n1mmy](https://github.com/n1mmy).