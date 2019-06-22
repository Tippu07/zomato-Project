import React, { Component } from 'react';
import '../App.css';
import Api from '../Api'
import DisplayRestaurants from './DisplayRestaurants'

class Trending extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trending: []
        }
    }
    componentDidMount() {
        Api.getTrendingResto()
            .then(trendingResto => {
                this.setState({
                    trending: trendingResto
                })
            })
    }
    render() {
        return (
            <div className="resto-cards">
                {this.state.trending.map(resto => {
                    return <div key={resto.id}>
                    <DisplayRestaurants restaurant={resto} userId={this.props.userId}/>
                    </div>
                }
                )}
            </div>

        )
    }
}

export default Trending