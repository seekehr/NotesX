export default function NoteTakerBackend() {
  const mysql = require('mysql2');
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BaNaNa@4"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}




function NoteTakerBackend() {
  

function saveNote(note) {
    if (note.isArray()) {
        if (note.includes("title") && note.includes("content") && note.icnludes("tags")) {

        }
    }
  }
}