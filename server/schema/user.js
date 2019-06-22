const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    date: { type: String },
    photourl:{type: String},
    bookingDetails: [{id:String,date:Date,numberOfPeoples:Number}]
});

const users = mongoose.model('users', userSchema);

module.exports = { users };
