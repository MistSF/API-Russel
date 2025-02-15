const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    catwayNumber: Number.parseInt,
    clientName: String,
    boatName: String,
    startDate: Date,
    endDate: Date
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
