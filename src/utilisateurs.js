/**
 * @fileoverview Routes for managing users.
 * @module routes/utilisateur
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('./models/utilisateur_model');
const bcrypt = require('bcryptjs');

/**
 * Get all users.
 * @private
 * @route GET /
 * @returns {Promise<void>} JSON response with all users.
 */
router.get('/', async (req, res) => {
    User.find().then((item) => res.json(item));
});

/**
 * Get a user by email.
 * @private
 * @route GET /:email
 * @param {string} email - The email of the user.
 * @returns {Promise<void>} JSON response with the user or error message.
 */
router.get('/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    try {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("Aucun utilisateur avec cette email");
        }
    } catch (e) {
        console.log(e);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * Create a new user.
 * @private
 * @route POST /
 * @param {Object} req.body - The user details.
 * @param {string} req.body.username - The username of the user.
 * @param {string} req.body.email - The email of the user.
 * @param {string} req.body.password - The password of the user.
 * @returns {Promise<void>} JSON response with a success message or error message.
 */
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({
            username: username,
            email: email,
            password: password
        });

        await newUser.save();
        res.status(200).json("Nouvel utilisateur enregistrée");
    } catch (e) {
        console.error(e);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * Update a user by email.
 * @private
 * @route PUT /:email
 * @param {string} email - The email of the user to be updated.
 * @param {Object} req.body - The updated user details.
 * @returns {Promise<void>} JSON response with the updated user or error message.
 */
router.put('/:email', async (req, res) => {
    const userEmail = req.params.email;
    const updatedData = req.body;

    try {
        const user = await User.findOne({ email: userEmail });

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        const updatedUser = await User.findOneAndUpdate(
            { email: userEmail },
            updatedData,
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json("Aucune reservation à ce numéro");
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * Delete a user by email.
 * @private
 * @route DELETE /:email
 * @param {string} email - The email of the user to be deleted.
 * @returns {Promise<void>} JSON response with a success message or error message.
 */
router.delete('/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const userID = await User.findOne({ email: userEmail });
        const result = await User.findByIdAndDelete(userID._id);
        if (result) {
            res.json("L'utilisateur " + userEmail + " a été supprimé");
        } else {
            res.status(404).json("Aucun utilisateur trouvé");
        }
    } catch (e) {
        console.error(e);
        res.json("Erreur de serveur");
    }
});

module.exports = router;
