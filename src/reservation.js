const express = require('express');
const router = express.Router();

/**
 * @route GET /catways/:id/reservations
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Créer une réservation
 * @description Cette route permet de créer une réservation.
 */
router.get('/catways/:id/reservations', (req, res) => {
    res.send('Créer une réservation');
});

/**
 * @route GET /catway/:id/reservations/:idReservation
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @param {string} idReservation.path.required - Reservation ID
 * @returns {string} 200 - Lister l'ensemble des réservations
 * @description Cette route permet de lister l'ensemble des réservations.
 */
router.get('/catway/:id/reservations/:idReservation', (req, res) => {
    res.send(`Lister l'ensemble des réservations`);
});

/**
 * @route POST /catways/:id/reservations
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Récupérer les détails d'une réservation en particulier
 * @description Cette route permet de récupérer les détails d'une réservation en particulier.
 */
router.post('/catways/:id/reservations', (req, res) => {
    res.send(`Récupérer les détails d'une réservation en particulier`);
});

/**
 * @route PUT /catways/:id/reservations
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Modifier une réservation
 * @description Cette route permet de modifier une réservation.
 */
router.put('/catways/:id/reservations', (req, res) => {
    res.send(`Modifier une réservation`);
});

/**
 * @route DELETE /catways/:id/reservations/:idReservation
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @param {string} idReservation.path.required - Reservation ID
 * @returns {string} 200 - Supprimer une réservation
 * @description Cette route permet de supprimer une réservation.
 */
router.delete('/catways/:id/reservations/:idReservation', (req, res) => {
    res.send(`Supprimer une réservation`);
});

module.exports = router;
