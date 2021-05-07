import React, {Component} from 'react';
import {Row, Col, Container} from 'react-bootstrap';
import logo from '../assets/logo.png'; 
import {Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import '../styles.css'
import '../components/Home.css'
import firebase from './Firebase.js'
import "firebase/auth";

export class SignIn extends Component {

  state = {
    Email: null,
    Password: null,
    message: "",
    isLogged: false
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
    this.setState({ [name]: value});
  }

  handleClick = (event) =>{
    event.preventDefault();
    this.setState({message:""});
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    var em = document.getElementById("email");
    var pw = document.getElementById("password");
    (async () => {
      //if form is invalid then display message
      if(!em.checkValidity() || !pw.checkValidity()){
        this.setState({message:"error2"});
      }
      else{
        firebase.auth().signInWithEmailAndPassword(this.state.Email, this.state.Password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          console.log(user)
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage)
        });
      }
    })();
  };

  googleSuccess = (response) => {
    console.log(response);
  }
  googleFailure = (response) => {
    console.log(response);
  }
  componentDidUpdate(prevProps) {
    console.log(this.props.logged, prevProps.logged)
    if(this.props.logged!==prevProps.logged)
    {
      console.log(this.props.logged, prevProps.logged)
      this.setState({isLogged:this.props.logged})
    }
  } 
  componentDidMount(){
    this.setState({isLogged:this.props.logged})
  }
    render(){

        return (
          <Container fluid className = 'container'>
              <Row> 
                <div className = "home-padding"></div>
                    <Col xs={12} sm={12} md={12} lg={5} xl={3} > 
                        <img className = "home-logo" src={logo} alt=""/> </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={8}>
                        <div className="home-textbox-mission">
                            <p>
                            Welcome to the New Beginnings Sign In page! 
                            Please log in below to access your account. 
                            If you have not made an account, sign up to create an account.
                            </p>
                        </div>
                    </Col>
                </Row>
                <div className = "space80"></div>

                <Row className = "outline">
                  <Col className = "centered">
                  {this.state.isLogged?<div>
                    <h1>My Account</h1>
                    <button className = "sign-in" style={{paddingLeft:"20px",paddingRight:"20px"}} onClick = {this.signOut}> <h4>Logout</h4> </button> 
                  </div>:<div>
                      <h2>Account Login</h2>
                      <div className = "space20"></div>
                      <div className = "space10"> </div>
                      <form className = "login-style">
                        <Row className = "signin_padding">
                          <h4>Email: </h4>    
                        </Row> 
                        <Row> 
                            <h5>
                              <input type="email" onClick = {this.handleClick} onChange = {this.getValue} placeholder="Enter Email" name="Email" id="email" required></input>
                            </h5>
                        </Row>
                        <div className = "space20"> </div>
                        <Row className = "signin_padding">
                          <h4>Password: </h4> 
                        </Row>
                        <Row>
                            <h5>
                              <input type="password" onClick = {this.handleClick} onChange = {this.getValue} placeholder="Enter Password" name="Password" id="password" required></input>
                            </h5>
                        </Row>
                        { this.state.message ==="error1"? <p className = "signin-error">Incorrect password or email address</p>: this.state.message === "error2"? <p className = "signin-error">Make sure everything is entered correctly</p>: this.state.message === "success"? <p className = "signin-success">Successful Login </p>: <p className = "signin-error"><br></br></p>}
                          <button className = "sign-in" onClick = {this.handleSubmit}> <h4>Sign In</h4> </button> 
                      </form>
                      <div className = "space10"></div>
                        <h5><span style={{color:"#cfcfcf",fontSize:"30px"}}>——— </span> or  <span style={{color:"#cfcfcf",fontSize:"30px"}}> ———</span></h5>
                      <div className = "space10"></div>
                      <GoogleLogin
                        clientId="762255135689-uoluckcm2dt1j14u9ko5phe484qkppmb.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        theme = {"dark"}
                        width = {300}
                        onSuccess={this.googleSuccess}
                        onFailure={this.googleFailure}
                        cookiePolicy={'single_host_origin'}
                      />
                      <div className = "space20"></div> 
                      <p>Don't have an account? <u><Link to ="/register">Click here to sign up!</Link></u></p>4</div>}
                  </Col>
                </Row>
                <div className = "space80"></div>
          </Container>  

        )
    }
  }