const express = require('express');
const router = express.Router();

/**
 * @route GET /catways
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Créer un catway
 * @description Cette route permet de créer un catway.
 */
router.get('/catways', (req, res) => {
    res.send('Créer un catway');
});

/**
 * @route GET /catway/:id
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @param {string} idReservation.path.required - Reservation ID
 * @returns {string} 200 - Lister l'ensemble des catway
 * @description Cette route permet de lister l'ensemble des catway.
 */
router.get('/catway/:id', (req, res) => {
    res.send(`Lister l'ensemble des catways`);
});

/**
 * @route POST /catways
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Récupérer les détails d'un catway en particulier
 * @description Cette route permet de récupérer les détails d'un catway en particulier.
 */
router.post('/catways', (req, res) => {
    res.send(`Modifier la description de l'état d'un catway (le numéro et le type ne doivent pas être modifiables)`);
});

/**
 * @route PUT /catways/:id
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Modifier un catway
 * @description Cette route permet de modifier un catway.
 */
router.put('/catways/:id', (req, res) => {
    res.send(`Modifier un catway.`);
});

/**
 * @route DELETE /catways/:id
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @param {string} idReservation.path.required - Reservation ID
 * @returns {string} 200 - Supprimer un catway.
 * @description Cette route permet de supprimer un catway.
 */
router.delete('/catways/:id', (req, res) => {
    res.send(`Supprimer une réservation`);
});

module.exports = router;
