/** Database connection for messagely. */


const { Client } = require("pg");
const DB_URI = require('./config')

const client = new Client({
    user: 'baer',
    host: 'localhost',
    port: 5432,
    password: 'baer',
    database: 'messagely'
  });
  
  client.connect();
  
  module.exports = client;