const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true
    },
    clientName: {
        type: String,
        required: true
    },
    boatName: {
        type: String,
        required: true
    },
    startDate: Date,
    endDate: Date
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
