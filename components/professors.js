const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "rateMyProfessor",
  password: "password",
  port: 5432,
});
