# Donor Wall: Spring Membership 2015

A temporary fix to ensure 2015 spring membership donations are docuemented in realtime as we switch from Sugar to Salesforce.

Built w/ News Apps' graphic kit. To install, clone repo and run:

```
npm install && bower install
npm install jquery
```

To test locally, run:

```
gulp serve
```

To deploy to Tribune's S3 account, you'll need to add a [profile newsapps] to ~/.aws/config. It should look something like this:

```
[profile newsapps]
aws_access_key_id=YOUR_UNIQUE_ID
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
```

Then you can run these commands to build and deploy:

```
gulp
npm run deploy
```

The package will deploy to graphics.texastribune.org/donor-wall. To change the location, update the package.json file.

For more commands, see [graphic kit](https://github.com/texastribune/newsapps-graphic-kit).
