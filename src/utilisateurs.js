const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require("./models/utilisateur_model")
const bcrypt = require('bcryptjs');

router.get('/users/', async (req, res) => {
    User.find().then((item) => res.json(item))
});

router.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({email: email})
    try {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json("Aucun utilisateur avec cette email");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json("Erreur du serveur");
    }
});

router.post('/users/', async (req, res) => {
    const { 
        username, 
        email, 
        password
    } = req.body

    try {
        const newUser = new User({
            username: username,
            email: email,
            password: password
        })

        await newUser.save()
        res.status(200).json("Nouvel utilisateur enregistrée")
    } catch (e) {
        console.error(e)
        res.status(500).json("Erreur du serveur")
    }
});

router.put('/users/:email', async (req, res) => {
    const userEmail = req.params.email
    const updatedData = req.body;

    try {
        const user = User.findOne({email: userEmail})

        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        const updatedUser = await User.findOneAndUpdate(
            {email: userEmail},
            updatedData,
            { new: true, runValidators: true }
        );

        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json("Aucune reservation à ce numéro")
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Erreur du serveur")
    }
});

router.delete('/users/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const userID = await User.findOne({ email: userEmail });
        const result = await User.findByIdAndDelete(userID._id)
        if (result) {
            res.json("L'utilisateur " + userEmail + " a été supprimé")
        } else {
            res.status(404).json("Aucun utilisateur trouvé")
        }
    } catch (e) {
        console.error(e)
        res.json("Erreur de serveur")
    }
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
