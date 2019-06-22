import React, { Component } from 'react';
import Api from '../Api'
import DispalyBookedRestaurants from './DisplayBookedRestaurants'


class DisplayUserBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookedRestaurants: [],
            userId: this.props.userId,
            isLoaded: false
        }
    }
    componentDidMount() {
        console.log(this.state.userId)
        Api.getBookedRestaurants(this.state.userId)
            .then(bookedResto => {
                this.setState({
                    bookedRestaurants: bookedResto,
                    isLoaded: true
                })
            })
    }
    render() {
        if (this.state.isLoaded === false) {
            return <h5>Loading...</h5>
        }
        else {
            return (
                <div className="user-bookings">
                    {this.state.bookedRestaurants[0].bookingDetails.map(resto=>{
                        return <div key={resto.id}>
                        <DispalyBookedRestaurants restaurantId={resto.id}/>
                        </div>
                    })}
                </div>

            )
        }
    }
}
export default DisplayUserBookings