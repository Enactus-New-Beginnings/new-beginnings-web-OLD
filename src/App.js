import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Jumbotron} from 'react-bootstrap';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Mentorship} from './components/Mentorship';
import Resources from './components/Resources';
import Employment from './components/Employment';
import {MobileApp} from './components/MobileApp';
import {SignIn} from './components/SignIn';
import {Home} from './components/Home';
import {Register} from './components/Register';
import { NavigationBar } from './components/NavigationBar';
import { Helmet } from 'react-helmet';
import "./styles.css";
import firebase from './components/Firebase.js'
import "firebase/database";

function App(){
  const [logged, setLogged]=React.useState(false)
  const [first, setFirst]=React.useState("")
  const [last, setLast]=React.useState("")
  const [address, setAddress]=React.useState("")
  const [uid, setUid] = React.useState()
  const [email, setEmail] = React.useState()
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setLogged(true)
      firebase.database().ref().child("users").child(user.uid).get().then((snapshot) => {
        if (snapshot.exists()) {
          setFirst(snapshot.val().firstName)
          setLast(snapshot.val().lastName)
          setAddress(snapshot.val().address)
          setUid(user.uid)
          setEmail(snapshot.val().email)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      })
    } else{
      setLogged(false)
    }
  });
    return (
      <>
      <div>
        <Helmet>
          <title> New Beginnings </title>
        </Helmet>
      </div>
      <Jumbotron fluid className = "jumbo-main"/>
      
      <NavigationBar/>
      <div className = "space20"></div>
        <Router>

         <Route path = "/" exact component = {Home} />
         <Route path = "/mentorship" exact component = {Mentorship} />
         <Route path = "/resources" >
           <Resources logged={logged}/>
         </Route>
         <Route path = "/employment" >
           <Employment/>
          </Route>
         <Route path = "/mobileapp" exact component = {MobileApp} />
         <Route path = "/signin" exact  component = {()=><SignIn logged={logged} first={first} last={last} address={address} uid={uid} email={email}/>} logged={logged} />
         <Route path = "/register" exact component = {()=><Register logged={logged} first={first} last={last} address={address} uid={uid} email={email}/>} logged={logged} />
        </Router>

      </>
    );
}

export default App;
