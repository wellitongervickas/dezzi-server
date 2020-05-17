# Dezzi server (node + express + knex)

## Routes

| Path | Allowed Methods | Params |
|--|--|--|
| /users | post, put  | `` |
| /users/auth | post | `` |
| /contacts | get, post, put, delete  | `contact_uuid` |
| /billings | get, post, put, delete  | `contact_uuid, billing_uuid` |

## Environment Variables

| Variable | Description | Default Value |
|--|--|--|
| SERVER_HOST | | `localhost` |
| SERVER_PORT | | `8080` |
| SERVER_TOKEN_SECRET | hash to encrypt token  | `` |
| SERVER_TOKEN_EXPIRES | time to expire | `86400000` |

## Npm Scripts

* npm install
* npm run dev
* npm start

## Knex

* npx knex migrate:latest

## Test Scripts

* npm test
* npm run test:watch
