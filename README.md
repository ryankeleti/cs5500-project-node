# cs5500-project

## Deployment instructions

Deploying the application is near identical to Assignment 4.

## Production

First, set up a MongoDB Atlas instance as usual (and allow access
from `0.0.0.0` or selected IP addresses).

In Heroku, deploy the GitHub repo <https://github.com/ryankeleti/cs5500-project-node/>. In addition, set the following config vars under settings:

  - `DB_USERNAME`: `tuiter-admin` (or admin name of choice in MongoDB)
  - `DB_PASSWORD`: corresponding MongoDB password
  - `NODE_ENV`: `production`
  - `CORS_ORIGIN`: URL of Netlify instance (React frontend URL)
  - `EXPRESS_SESSION_SECRET`: some secret

In addition, in the react repo, set the contents of `.env` to
`REACT_APP_BASE_URL=...`, filling in the heroku URL.
Then on Netlify, deploy the GitHub repo <https://github.com/ryankeleti/cs5500-project-react/>. Set the build command to `CI=false npm run build`, and deploy.

## Locally
To deploy locally, run `npm run build` and
```
  DB_USERNAME=tuiter-admin DB_PASSWORD=... CORS_ORIGIN=http://localhost:3000 EXPRESS_SESSION_SECRET... npm run start`
```

Set `.env` in the react repo to
`REACT_APP_BASE_URL=http://localhost:4000`, and run `npm run start`.

## Deployed

Netlify instance: https://incredible-pastelito-9d0af9.netlify.app/
Heroku instance: https://cs5500-messages-project.herokuapp.com/

