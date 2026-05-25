const mysql = require("mysql2");

const connection = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "root123",

  database: "time_capsule_db",

  port: 3307

});

connection.connect((err) => {

  if (err) {

    console.log("Database Error");

  } else {

    console.log("MySQL Connected ✅");
  }
});

module.exports = connection;