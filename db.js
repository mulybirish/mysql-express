const mysql = require("mysql2");

const { server_port, db_host, db_name, db_password, db_port, db_user } =
  process.env;
const connections = mysql.createConnection({
  host: db_host,
  user: db_user,
  database: db_name,
  password: db_password,
  port: db_port,
});

// connections.query(
//   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
//   function (err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

module.exports = connections;
