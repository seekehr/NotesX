import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import mysql from 'mysql2';

const createNoteQuery = "INSERT INTO notes (id, title, content, tags) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE title = VALUES(title), content = VALUES(content), tags = VALUES(tags)";
const deleteNoteQuery = "DELETE FROM notes WHERE id=?";

function Backend(connection) {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.post('/api/create/', (req, res) => {
        console.log(req.body);
        console.log(req.query);
        let query = req.query;
        if (query.noteid && query.title && query.content && query.tags) {
            connection.execute(
                createNoteQuery,
                [query.noteid, query.title, query.content, query.tags]
            );
        } else {
            res.status(500).send("Error: 500. Wrong query parameters.")
        }
    });

    app.get('/api/notes/', (req, res) => {
        connection.promise()
        .query("Select * from notes")
        .then(([rows, metadata]) =>
            res.send(rows)
        )
        .catch((error) => {
            console.error("[mysql error] during http-get/notes: " + error)
        })
    })

    app.post('/api/delete/', (req, res) => {
        let query = req.query;
        if (query.noteId) {
            connection.execute(
                deleteNoteQuery,
                [query.noteId]
            );
        } else {
            res.status(400).send("Error: 500. Wrong query parameters.")
        }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default Backend;