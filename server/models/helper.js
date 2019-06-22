require("../db")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const { restaurant } = require('../schema/restaurant');
const {users} = require('../schema/user')

module.exports = {
    getTrendingRestaurants: () => {
        return restaurant.find({}).sort({ "user_rating.aggregate_rating": -1 }).limit(10)
            .then((data) => data)
            .catch(err => err.message)
    },
    getRestaurantbyId: (restaurantId) => {
        return restaurant.find({ id: restaurantId })
            .then(restaurant => restaurant)
            .catch(err => err.message)

    },
    searchRestaurant: (searchtext) => {
        return restaurant.find({
            $or: [{ name: { $regex: searchtext, $options: 'i' } },
            { cuisines: { $regex: searchtext, $options: 'i' } }]
        }).limit(20)
        .then(searchData => searchData)
        .catch(err => err.message)
    },
    getUserById:(userId)=>{
        return users.find({email:userId})
        .then(users => users)
        .catch(err => err.message)
    },
    postNewUser:(username,email,date,phone,photourl,bookingDetails)=>{
        console.log(username,typeof(username))
        return users.create({username:username,phone:phone,email:email,date:date,photourl:photourl,bookingDetails:bookingDetails})
        .then(newUser=> {newUser})
        .catch(err=> err.message)
    },
    getBookingDetails:(email)=>{
        console.log(email)
        return users.find({email:email}).select('bookingDetails')
        .then(userBooking=>userBooking)
        .catch(err=>err.message)
    }, 
    bookRestaurant:(email,hotelId,date,numberOfPeople)=>{
        return users.findOneAndUpdate({email:email},{$push:{bookingDetails:{"id":hotelId,"date":date,"numberOfPeoples":numberOfPeople}}})
        .then(resto=>resto)
        .catch(err=>err.message)
    }
}

