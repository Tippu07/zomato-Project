const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    cuisines: { type: String },
    location: { type: Object },
});

const restaurant = mongoose.model('restaurants', restaurantSchema);

module.exports = { restaurant };
