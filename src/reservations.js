const express = require('express');
const router = express.Router();
const Reservation = require("./models/reservation_model")

/**
 * @route GET /
 * @desc Get all reservations
 * @access Private
 */
router.get('/', async (req, res) => {
    try {
        const items = await Reservation.find();
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route GET /:idReservation
 * @desc Get reservation by ID
 * @access Private
 */
router.get('/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation;
    try {
        const reservation = await Reservation.findById(reservationId);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json("Aucune reservation à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route POST /
 * @desc Create a new reservation
 * @access Private
 */
router.post('/', async (req, res) => {
    const { 
        catwayNumber, 
        clientName, 
        boatName, 
        startDate, 
        endDate 
    } = req.body;

    try {
        const currentStartDate = startDate ? new Date(startDate) : new Date();
        const currentEndDate = endDate ? new Date(endDate) : new Date() + 1;

        const newReservation = new Reservation({
            catwayNumber: catwayNumber,
            clientName: clientName,
            boatName: boatName,
            startDate: currentStartDate,
            endDate: currentEndDate
        });

        await newReservation.save();
        res.status(200).json("Nouvelle reservation enregistrée");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

/**
 * @route PUT /:idReservation
 * @desc Update reservation by ID
 * @access Private
 */router.put('/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation;
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    try {
        const tempReservation = await Reservation.findById(reservationId);
        if (!tempReservation) {
            return res.status(404).json("Aucune reservation à ce numéro");
        }

        const updatedFields = {};
        if (catwayNumber != null) {
            updatedFields.catwayNumber = catwayNumber;
        }
        if (clientName) {
            updatedFields.clientName = clientName;
        }
        if (boatName) {
            updatedFields.boatName = boatName;
        }
        if (startDate) {
            updatedFields.startDate = new Date(startDate);
        }
        if (endDate) {
            updatedFields.endDate = new Date(endDate);
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (updatedReservation) {
            res.status(200).json(updatedReservation);
        } else {
            res.status(404).json("Aucune reservation à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});


/**
 * @route DELETE /:idReservation
 * @desc Delete reservation by ID
 * @access Private
 */
router.delete('/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation;
    try {
        const result = await Reservation.findByIdAndDelete(reservationId);
        if (result) {
            res.json("La réservation " + reservationId + " a été supprimé");
        } else {
            res.status(404).json("Aucune reservation à ce numéro");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Erreur du serveur");
    }
});

module.exports = router;
