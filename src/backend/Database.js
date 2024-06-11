import mysql from 'mysql2';
import Backend from './Backend.js';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BaNaNa@4',
  database: 'notesx',
});

connection.promise()
.query("CREATE DATABASE IF NOT EXISTS notesx")
.catch((error) => {
  console.error("[mysql error]: " + error);
  throw error;
}).then(() => {
  connection.promise()
  .query("CREATE TABLE IF NOT EXISTS notes (`id` INT NOT NULL AUTO_INCREMENT, `title` VARCHAR(30) NOT NULL, `content` MEDIUMTEXT NOT NULL, tags TINYTEXT NOT NULL, PRIMARY KEY (`id`))")
  .then(() => {
    console.log("MySQL database: connection established.")
      Backend(connection);
    })
  .catch((error) => {
    console.error("[mysql error]: " + error);
    throw error;
  })
})