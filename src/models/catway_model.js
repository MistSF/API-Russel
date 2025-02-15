const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    catwayNumber: Int32Array,
    catwayType: String,
    catwayState: String,
});

const Catway = mongoose.model('Catway', catwaySchema);

module.exports = Catway;
