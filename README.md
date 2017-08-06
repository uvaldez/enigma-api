# enigma-api
A web server that lets users create an encrypted message given a random passphrase

## Getting Started

```
1. Clone this repository
2. Create postgres database and change credentials on /src/backend/db.js
3. Run `npm install && npm start`
4. Visit `localhost:8000/graphql` in your browser

```

Table Message should be created once you run npm start, if not run ```sequelize db:migrate``` in order to create the table

## Built With

* [NodeJS](https://nodejs.org)
* [ExpressJS](https://expressjs.com/)
* [GraphQL](http://graphql.org/)