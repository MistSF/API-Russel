const express = require('express');
const router = express.Router();
const Reservation = require("./models/reservation_model")

router.get('/catways/:id/reservations', (req, res) => {
    Reservation.find().then((item) => res.json(item))
});

router.get('/catways/:id/reservations/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation;
    const reservation = await Reservation.findById(reservationId)
    try {
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json("Aucune reservation à ce numéro");
        }
    } catch (e) {
        console.log(e)
        res.status(500).json("Erreur du serveur");
    }
});

router.post('/catways/:id/reservations', async (req, res) => {
    const { 
        catwayNumber, 
        clientName, 
        boatName, 
        startDate, 
        endDate 
    } = req.body

    try {
        const currentStartDate = startDate ? new Date(startDate) : new Date()
        const currentEndDate = endDate ? new Date(endDate) : new Date() + 1

        const newReservation = new Reservation({
            catwayNumber: catwayNumber,
            clientName: clientName,
            boatName: boatName,
            startDate: currentStartDate,
            endDate: currentEndDate
        })

        await newReservation.save()
        res.status(200).json("Nouvelle reservation enregistrée")
    } catch (e) {
        console.error(e)
        res.status(500).json("Erreur du serveur")
    }
});

router.put('/catways/:id/reservations/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation
    const updatedData = req.body;

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            updatedData,
            { new: true, runValidators: true }
        );

        if (updatedReservation) {
            res.status(200).json(updatedReservation);
        } else {
            res.status(404).json("Aucune reservation à ce numéro")
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Erreur du serveur")
    }
});

router.delete('/catways/:id/reservations/:idReservation', async (req, res) => {
    const reservationId = req.params.idReservation;
    try {
        const result = await Reservation.findByIdAndDelete(reservationId)
        if (result) {
            res.json("La réservation " + reservationId + " a été supprimé")
        } else {
            res.status(404).json("Aucun catway à ce numéro")
        }
    } catch (e) {
        console.error(e)
        res.json("Erreur de serveur")
    }
});

module.exports = router;
