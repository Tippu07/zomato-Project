import React, { Component } from 'react';
import '../App.css';
import DisplayRestaurants from './DisplayRestaurants'

class DisplaySearchResto extends Component {
    
    render() {
        return (
            <div className="resto-cards">
                {this.props.restaurants.map(resto => {
                    return <div key={resto.id}>
                    <DisplayRestaurants restaurant={resto}/>
                    </div>
                }
                )}
            </div>
        )
    }
}
export default DisplaySearchResto
