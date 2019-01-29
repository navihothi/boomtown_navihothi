//The client pool allows you to have a reusable pool of clients you can check out, use, and return. 
const { Pool } = require('pg');

module.exports = (app) => {
  /**
   * @TODO: Configuration Variables
   *
   *  Retrieve the necessary information to connect to Postgres
   *  For example: app.get('PG_DB')
   */
  return new Pool({
    user: app.get('PG_USER'),
    host: app.get('PG_HOST'),
    database: app.get('PG_DB'),
    password: app.get('PG_PASSWORD'),
    idleTimeoutMillis: 30000, //losing a connection to postgres more than 30 seconds
    connectionTimeoutMillis: 2000, //starting up node .. takes longer than 2 seconds this will throw an error
  });
};
