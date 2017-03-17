var pg = require('pg');

var config = {
  user: 'postgres',
  database: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 50000,
};

var pool = new pg.Pool(config);
module.exports = pool;
