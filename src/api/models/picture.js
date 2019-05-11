const mongoose = require('mongoose');

const pictureSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    user: String,
    url: String,
});

module.exports = mongoose.model('Picture', pictureSchema);