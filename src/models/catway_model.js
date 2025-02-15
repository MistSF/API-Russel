const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: true,
        unique: true
    },
    catwayType: String,
    catwayState: String,
});

const Catway = mongoose.model('Catway', catwaySchema);

module.exports = Catway;
