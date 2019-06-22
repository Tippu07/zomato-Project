import React, { Component } from 'react';
import Api from '../Api'

class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: [],
            userId: this.props.userId,
            isLoaded: false
        }
    }
    componentDidMount() {
        Api.getUserDetails(this.state.userId)
            .then(userDetails => {
                this.setState({
                    userDetails: userDetails,
                    isLoaded: true
                })
            })
    }
    render() {
        if (this.state.isLoaded === false) {
            return <h3>Loading...</h3>
        }
        else {
            return (
                <div className="user-details">
                    {console.log(this.state.userDetails)}
                    {this.state.userDetails.map(user => {
                        return <div key="user._id">
                            <div className="imgcontainer">
                                <img src={user.photourl} alt="pic" className="avatar" />
                            </div>
                            <h1>{user.username}</h1>
                            <h1>{user.email}</h1>
                            <h1>{user.phone}</h1>
                        </div>
                    })}
                </div>
            )
        }
    }
}
export default UserDetails