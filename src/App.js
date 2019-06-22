import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './components/Home'
import Trending from './components/Trending'
import UserDetails from './components/UserDetails'
import DisplayUserBookings from './components/DisplayUserBookings'
import Api from './Api'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


firebase.initializeApp({
  apiKey: "AIzaSyClAV08Jewa4hHWIpw5_ZfyU4b2TVmWnao",
  authDomain: "zomato-6c425.firebaseapp.com"
})
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchFlag: false,
      userId: '',
      isSignedIn: false
    }
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callback: {
      signInSuccess: () => false
    }
  }
  onTextEnter = e => {
    let enteredData = e.target.value;
    this.setState({
      searchText: enteredData,
    })
  }
  searchText = e => {
    e.preventDefault();
    Api.getSearchDetails(this.state.searchText)
      .then(result => {
        this.setState({
          searchData: result,
          searchFlag: true,
          searchText: ""
        })
      })
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }
  render() {
    return (
      <Router>
        <div>
          <div className="header">
            <img src="https://b.zmtcdn.com/images/zomato_white_logo_new.svg" className="logo" alt="logo" />
            <input type="text" placeholder="Search for restaurants or cuisines..." onChange={this.onTextEnter} />
            <button className="search-button" onClick={this.searchText}>Search</button>
            {this.state.isSignedIn ?
              (<span>
                <span>{firebase.auth().currentUser.displayName}</span>
                <button className="search-button logout-button" onClick={() => firebase.auth().signOut()}>Sign out!</button>
              </span>
              ) : (
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />)
            }
            <button className="search-button sign-up">Create an account</button>
          </div>
          <div className="sidenav">
            <li>
              <Link className="link" to="/">Home</Link>
            </li>
            <li>
              <Link className="link" to="/trending">Trending</Link>
            </li>
            <li>
              <Link className="link" to="/userDetails">User</Link>
            </li>
            <li>
              <Link className="link" to="/displayUserBookings">Bookings</Link>
            </li>
          </div>

          <div className="main">
            {this.state.isSignedIn ? (
              <span>
                <Route exact path="/" component={() =>
                  <Home searchData={this.state.searchData} searchFlag={this.state.searchFlag} />} />
                <Route path="/trending" component={() =>
                  <Trending userId={firebase.auth().currentUser.displayName} />} />
                <Route path="/userDetails" component={() =>
                  <UserDetails userId={firebase.auth().currentUser.email} />} />
                <Route path="/displayUserBookings" component={() =>
                  <DisplayUserBookings userId={firebase.auth().currentUser.email} />} />
              </span>
            ) : (<span className="container">
              <h1>Please Login...</h1>
            </span>)}

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
