const express = require('express');
const bodyParser = require('body-parser');
const database = require('./Database');
const app = express();

while(!database.init){}
console.log("Database initialised!");
const db = database.db;

db.on('error', function(err) {
    console.log("[mysql error]: ",err);
    process.kill(process.pid, 'SIGTERM');
  });


db.query("Select * from notes", function (result, error) {
    if(error) throw error;
    console.log(result);
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/api/:noteid', (req, res) => {
    db.query('SELECT * FROM notesx', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));