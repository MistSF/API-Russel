const express = require('express');
const router = express.Router();
const Catway = require("./models/catway_model")

/**
 * @route GET /catways
 * @group Reservations - Operations about reservations
 * @param {string} id.path.required - Catway ID
 * @returns {string} 200 - Créer un catway
 * @description Cette route permet de créer un catway.
 */
router.get('/catways', async (req, res) => {
    let newCatwayNumber = 0
    const { catwayNumber, catwayType, catwayState } = req.query

    if (catwayNumber) {
        newCatwayNumber = catwayNumber
    } else {
        const item = await Catway.findOne().sort({catwayNumber: -1})
        if (item) {
            newCatwayNumber = item.catwayNumber + 1
        }
    }

    const newCatway = new Catway({
        catwayNumber: newCatwayNumber,
        catwayType: (catwayType) ? catwayType : "Short",
        catwayState: (catwayState) ? catwayState : "bon état"
    })

    // await newCatway.save()
    res.json(newCatway)
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