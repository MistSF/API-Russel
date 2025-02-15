const fs = require("fs");
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Lire le fichier de configuration JSON
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const catwaysRouter = require('./src/catways');
const reservationsRouter = require('./src/reservations');
const utilisateurRouter = require('./src/utilisateurs');

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Utilisation des router
app.use("/", catwaysRouter);
app.use("/", reservationsRouter);
app.use("/", utilisateurRouter);

// Connexion à MongoDB
mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@localhost:27017/${config.db.database}`).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(8000, () => {
    console.log("Server started on port 8000");
});
