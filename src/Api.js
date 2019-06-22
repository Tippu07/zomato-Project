module.exports = {
    getTrendingResto: function () {
        return fetch(`http://localhost:5000/api/restaurants/trending`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => err.message)
    },
    getSearchDetails: function (searchText) {
        return fetch(`http://localhost:5000/api/restaurants/search/${searchText}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'GET',
        })
            .then(res => res.json())
            .catch(err => err.message)
    },
    getUserDetails: function (email) {
        return fetch(`http://localhost:5000/api/user/${email}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'GET'
        })
            .then(res => res.json())
            .catch(err => err.message)
    },
    bookRestaurants: function (userId, restaurantId, selectedDate, numberOfPeople) {
        var data = {
            "email": userId,
            "id": restaurantId,
            "date": selectedDate,
            "numberOfPeople": numberOfPeople
        };
        return fetch(`http://localhost:5000/api/bookings`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .catch(err=>err.message)
    },
    getBookedRestaurants:function(userId){
        return fetch(`http://localhost:5000/api/bookings/${userId}`,{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'GET',
        })
        .then(res => res.json())
        .catch(err=>err.message)
    },
    getRestaurantById: function(restoId){
        return fetch(`http://localhost:5000/api/restaurants/${restoId}`,{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method: 'GET'
        })
        .then(res => res.json())
        .catch(err=>err.message)
    }
}