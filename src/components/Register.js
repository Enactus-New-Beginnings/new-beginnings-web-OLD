import React, {Component} from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import '../styles.css'
import './Home.css'
import firebase from './Firebase.js'
import Profile from './Profile'
import Popup from './Popup'

// Add the Firebase services that you want to use

import "firebase/auth";
import "firebase/database";

export class Register extends Component {
  state = {
    Email: "",
    Password: "",
    First: "",
    Last: "",
    Address: "",
    message: "",
    emailvalid:true,
    googleEmailValid:true,
    isLogged:false,
    userFirst: "",
    userLast: "",
    userAddress: "",
    userEmail:"",
    uid: "",
    open: false
  };
  signOut = ()=>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  getValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
    this.setState({message:""});
  }
  //Registration
  handleSubmit = (event) =>{
    event.preventDefault();
    var em = document.getElementById("email");
    var pw = document.getElementById("password");
    var ft = document.getElementById("first");
    var lt = document.getElementById("last");
    //if form is valid then add details to database
    (async () => {
      if(em.checkValidity() && pw.checkValidity() && ft.checkValidity() && lt.checkValidity() && this.state.message !== "emailInvalid"){
        console.log("email", this.state.Email)
        //First, Last, Email, Password
        // Create an email/password credential
        firebase.auth().createUserWithEmailAndPassword(this.state.Email, this.state.Password)
        .then((userCredential) => {
          // Signed in 
          console.log(userCredential.user);
          firebase.database().ref('users/'+userCredential.user.uid).set({
            firstName: this.state.First,
            lastName: this.state.Last,
            email: this.state.Email,
            address: this.state.Address
          })
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
          // ..
        })
      }
      else if(this.state.message === "emailInvalid"){
        this.setState({message:"emailInvalid"})
        console.log("invalidEmail");
      }
      else{
        this.setState({message:"error"});
        console.log("error");
      }
    })();
  }
  //registering with Google
  googleSuccess = (response) => {
    console.log(response);
  }
  googleFailure = (response) =>{
    console.log(response);
  }
  handleClose = () => {
        this.setState({open:false});
  };
  handleOpen = ()=>{
    this.setState({open:true})
  }
  componentDidMount(){
    this.setState({isLogged:this.props.logged, 
      userFirst: this.props.first, 
      userLast: this.props.last,
      userAddress: this.props.address, 
      uid: this.props.uid,
      userEmail: this.props.email})
  }
  diagTitle="Why do we ask for your location?"
  diagText="This is an entirely optional feature which allows us to display how close you are to each location found in our \"Resources\" and \"Employment\" tabs, as well as Google Maps directions to them. Your information is securely stored and we will not use this data for any other purpose."
  render(){
      return (
        <Container fluid className = 'container'>
            <div className = "space80"></div>
              <Row className = "outline" onClick = {this.handleClick}>
                <Col className = "centered">
                  {this.state.isLogged?<Profile first={this.state.userFirst} 
                  last={this.state.userLast} 
                  address={this.state.userAddress} 
                  uid={this.state.uid}
                  email={this.state.userEmail}/>:
                  <div>
                    <h2>Creating Your Account</h2>
                    <div className = "space20"></div>
                    <div className = "space10"> </div>
                    <form className = "login-style">
                      <Row className = "signin_padding">
                        <h4>First Name: </h4>    
                      </Row> 
                      <Row> 
                          <h5>
                            <input type="text" onChange = {this.getValue} placeholder="Enter First Name" name="First" id="first" required></input>
                          </h5>
                      </Row>
                      <div className = "space20"> </div>
                      <Row className = "signin_padding">
                        <h4>Last Name: </h4> 
                      </Row>
                      <Row>
                          <h5>
                            <input type="text"  onChange = {this.getValue} placeholder="Enter Last Name" name="Last" id="last" required></input>
                          </h5>
                      </Row>
                      <div className = "space20"> </div>
                      <Row className = "signin_padding">
                        <h4>Email: </h4> 
                      </Row>
                      <Row>
                          <h5>
                            <input type="email" onChange = {this.getValue} placeholder="Enter Email" name="Email" id = "email" required></input>
                          </h5>
                      </Row>
                      <div className = "space20"> </div>
                      <Row className = "signin_padding">
                        <h4>Password: </h4> 
                      </Row>
                      <Row>
                          <h5>
                            <input type="password" onChange = {this.getValue} placeholder="Enter Password" name="Password" id="password" required></input>
                          </h5>
                      </Row>
                      <div className = "space20"> </div>
                      <Row className = "signin_padding">
                        <h4>Address (Optional): <button className="link" onClick={this.handleOpen}>Why should I add my address?</button></h4> 
                      </Row>
                      <Row>
                          <h5>
                            <input type="text" onChange = {this.getValue} placeholder="Enter Address, City, State, Zip" name="Address" id="address"></input>
                          </h5>
                      </Row>
                      <Popup open={this.state.open} handleClose={this.handleClose} diagTitle={this.diagTitle} diagText={this.diagText}/>
                      {this.state.message==="success"? <p className = "signin-success">Successfully created an account</p>: this.state.message==="error"? <p className = "createAcc-error">Make sure everything is typed correctly</p>: this.state.message==="emailInvalid"? <p className = "createAcc-error">Account already exists for that email. Try using another email.</p>: <p className = "createAcc-error"><br></br></p>}
                        <button className = "sign-in" style={{paddingLeft:"20px",paddingRight:"20px"}} onClick = {this.handleSubmit}> <h4>Create Account</h4> </button> 
                        <div className = "space10"></div>
                          <h5><span style={{color:"#cfcfcf",fontSize:"30px"}}>——— </span> or  <span style={{color:"#cfcfcf",fontSize:"30px"}}> ———</span></h5>
                        <div className = "space10"></div>
                        <GoogleLogin
                          clientId="762255135689-uoluckcm2dt1j14u9ko5phe484qkppmb.apps.googleusercontent.com"
                          buttonText="Sign up with Google"
                          theme = {"dark"}
                          onSuccess={this.googleSuccess}
                          onFailure={this.googleFailure}
                          cookiePolicy={'single_host_origin'}
                        />
                        <div className = "space20"></div> 
                        <p>Already have an account? <u><Link to ="/signin">Click here to sign in.</Link></u></p>
                    </form></div>}
                </Col>
              </Row>
              <div className = "space80"></div>
        </Container>  

      )
  }
}