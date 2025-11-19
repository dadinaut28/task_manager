const { Pool } = require('pg')


// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  user: 'postgres',
  password: 'Ahihonsou2808',
  host: 'localhost',
  port: 5432,
  database: 'task_manager'
})


module.exports = pool