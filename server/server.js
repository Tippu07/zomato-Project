require('./db');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const helper = require('./models/helper');
const cors = require('cors');


app.use(bodyParser.json());
app.use(cors());

app.get('/api/restaurants/trending', (req, res) => {
    helper.getTrendingRestaurants().then(rating=>{
        res.status(200).send(rating)
    })
    .catch(err =>{
        res.status(400).send(err.message)
    })  
})

app.get('/api/restaurants/:id', (req, res) => {
    helper.getRestaurantbyId(req.params.id).then(data => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send(err.message)
    })
})
app.get('/api/restaurants/search/:searchtext',(req,res)=>{
    helper.searchRestaurant(req.params.searchtext)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
})

app.get('/api/user/:id',(req,res)=>{
    helper.getUserById(req.params.id)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
})

app.post('/api/user',(req,res)=>{
    let username = req.body.username
    let email = req.body.email
    let date = req.body.date
    let phone = req.body.phone
    let photourl = req.body.photourl
    let bookingDetails = req.body.bookingDetails
helper.postNewUser(username,email,date,phone,photourl,bookingDetails)
.then(data=>{
    res.status(200).send(data)
})
.catch(err=>{
    res.status(400).send(err.message)
})
})

app.get('/api/bookings/:email',(req,res)=>{
    let email = req.params.email
    helper.getBookingDetails(email)
    .then(userbookings=>{
        res.status(200).send(userbookings)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
})

app.post('/api/bookings',(req,res)=>{
    let email = req.body.email
    let hotelId = req.body.id
    let date = req.body.date
    let numberOfPeople = req.body.numberOfPeople
    let time = req.body.time
    helper.bookRestaurant(email,hotelId,date,numberOfPeople,time)
    .then(restoDetails=>{
        res.status(200).send(restoDetails)
    })
    .catch(err=>{
        res.status(400).send(err.message)
    })
})




app.listen(5000, function () { console.log('post 5000') });