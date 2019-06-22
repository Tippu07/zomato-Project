import React, { Component } from 'react';
import '../App.css';
import DisplaySearchResto from './DisplaySearchResto';

class Home extends Component {
    render() {
        return (
            <div className="main-container">
                <div className="container-image">
                    <img src="https://b.zmtcdn.com/images/logo/square_zomato_logo_new-2.svg" alt="zomato" />
                </div>
                <div className="search">
                    {this.props.searchFlag ? <DisplaySearchResto restaurants={this.props.searchData} /> : null}
                </div>
            </div>
        )
    }
}

export default Home;