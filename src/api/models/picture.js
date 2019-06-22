const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: String,
    user: String,
    url: String,
});

module.exports = mongoose.model('Picture', pictureSchema);