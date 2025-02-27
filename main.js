const fs = require("fs");
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

// Lire le fichier de configuration JSON
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));


// Connexion à MongoDB
mongoose.connect(`mongodb://${config.db.username}:${config.db.password}@localhost:27017/${config.db.database}?authSource=admin`).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const catwaysRouter = require('./src/catways');
const reservationsRouter = require('./src/reservations');
const utilisateurRouter = require('./src/utilisateurs');

// Utilisation du middleware express-session pour la session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Initialisation du passport
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Utilisation des router
app.use("/", catwaysRouter);
app.use("/", reservationsRouter);
app.use("/", utilisateurRouter);

port = 8080
app.listen(port, () => {
    console.log("Server started on port " + port);
});
