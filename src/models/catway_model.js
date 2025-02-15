const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
    name: String,
    description: String,
    status: String,
});

const Catway = mongoose.model('Catway', catwaySchema);

module.exports = Catway;
