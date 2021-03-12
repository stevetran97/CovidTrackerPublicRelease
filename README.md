# Canadian Email Covid Tracer 

Simple Node.js/Express/Docker/Mongoose app using Nodemailer to send host a Covid Tracing Form on the web. Send Covid Tracking information directly to a designated email with a backup saved on the Mongodb database.

- Please add your own SMTP info for it to work

### Version

1.0.0

## Install Dependencies/ Apply changes, and Run
Docker may not automatically update with saved changes. The app must be rebuilt to ensure changes are seen.
```bash
docker-compose build --no-cache
docker-compose up -d
```


## Deployable

Tested Deployable on Heroku on the process environment port
