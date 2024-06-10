const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BaNaNa@4",
    database: "notesx"
  });

function con_init(callback) {
  connection.connect(error => {
    if (error) {
      console.log("[mysql error]: " + error);
      throw error;
    }
    connection.query("CREATE DATABASE IF NOT EXISTS notesx", function (err, result) {
      if (err) {
        console.log("[mysql error]: " + err);
      }
      console.log("Database created");
      connection.query("CREATE TABLE IF NOT EXISTS notes (`id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(30) NOT NULL, `content` MEDIUMTEXT NOT NULL, tags JSON NOT NULL, PRIMARY KEY (`id`))", function (errur, result) {
        if (errur) throw errur;
        console.log("Table created");
      });
    });
    console.log('Connected to MySQL database');
  });
  return true;
}

module.exports = {
  db: connection,
  init: con_init
};