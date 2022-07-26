const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "l",
  host: "localhost",
  port: "5432",
  database: "senator",
});

module.exports = pool;
