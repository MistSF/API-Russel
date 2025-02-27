const express = require('express');
const router = express.Router();
const passport = require('passport');

/**
 * @route GET /users/
 * @group Users - Operations about users
 * @returns {string} 200 - Créer un utilisateur
 * @description Cette route permet de créer un utilisateur.
 */
router.get('/users/', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = new User(username, password, email);
        await newUser.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send("Erreur lors de l'inscription");
    }
});

/**
 * @route GET /users/:email
 * @group Users - Operations about users
 * @param {string} email.path.required - User email
 * @returns {string} 200 - Lister l'ensemble des utilisateurs
 * @description Cette route permet de lister l'ensemble des utilisateurs.
 */
router.get('/users/:email', (req, res) => {
    res.send(`Lister l'ensemble des utilisateurs`);
});

/**
 * @route POST /users/
 * @group Users - Operations about users
 * @returns {string} 200 - Récupérer les détails d'un utilisateur en particulier
 * @description Cette route permet de récupérer les détails d'un utilisateur en particulier.
 */
router.post('/users/', (req, res) => {
    res.send(`Récupérer les détails d'un utilisateur en particulier`);
});

/**
 * @route PUT /users/:email
 * @group Users - Operations about users
 * @param {string} email.path.required - User email
 * @returns {string} 200 - Modifier les détails d'un utilisateur
 * @description Cette route permet de modifier les détails d'un utilisateur.
 */
router.put('/users/:email', (req, res) => {
    res.send(`Modifier les détails d'un utilisateur`);
});

/**
 * @route DELETE /users/:email
 * @group Users - Operations about users
 * @param {string} email.path.required - User email
 * @returns {string} 200 - Supprimer un utilisateur
 * @description Cette route permet de supprimer un utilisateur.
 */
router.delete('/users/:email', (req, res) => {
    res.send(`Supprimer un utilisateur`);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

// Route pour la déconnexion
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                return next(err);  
            }
            res.redirect('/login');
        });
    });
});
  

module.exports = router;
