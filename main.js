const fs = require("fs");
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const flash = require("connect-flash");
const catwaysRouter = require('./src/catways');
const reservationsRouter = require('./src/reservations');
const utilisateurRouter = require('./src/utilisateurs');
const User = require('./src/models/utilisateur_model');
const path = require("path");
const cors = require("cors");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60000
    }
}));
  
app.use(flash());
app.use(express.static(path.join(__dirname, 'src/html')));

/**
 * Connect to MongoDB.
 * @private
 * @function
 */
mongoose.connect(`mongodb+srv://${dbUsername}:${dbPassword}@cluster0.hrotg.mongodb.net/${dbDatabase}?authSource=admin&retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

/**
 * Middleware for verifying JWT token.
 * @private
 * @function
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Split 'Bearer <token>'
    if (!token) return res.status(403).send("A token is required for authentication");
    try {
        const decoded = jwt.verify(token, "jwtSecret");
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}

/**
 * User login.
 * @private
 * @route POST /login
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} JSON response with JWT token or error message.
 */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'jwtSecret', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send("Invalid username or password");
    }
});

/**
 * User logout.
 * @private
 * @route POST /logout
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void} JSON response with success or error message.
 */
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to logout");
        }
        res.status(200).json({ message: 'Successfully logged out' });
    });
});

/**
 * Use routers with JWT verification.
 * @private
 */
app.use("/catways", verifyToken, catwaysRouter);
app.use("/catways/:id/reservations", verifyToken, reservationsRouter);
app.use("/users", verifyToken, utilisateurRouter);

/**
 * Error handling middleware.
 * @private
 * @function
 * @param {Object} err - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

/**
 * Start the server.
 * @private
 * @constant
 * @type {number}
 */
const port = 8080;
app.listen(port, () => {
    console.log("Server started on port " + port);
});
