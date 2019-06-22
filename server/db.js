const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/zomato', { useNewUrlParser: true }).then(() => {
    console.log('Connected to db' + mongoose.connection.host + " " + mongoose.connection.port);
})
    .catch(err => {
        console.error('Database connection error')
    });
module.exports = { mongoose };
