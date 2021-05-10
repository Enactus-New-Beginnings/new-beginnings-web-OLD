import React from 'react';
import firebase from './Firebase.js'
import "firebase/auth";
import "firebase/database";
import Popup from './Popup'
export default function Profile(props){
    const [diagText, setDiagText] = React.useState("")
    const [diagTitle, setDiagTitle] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
      };
    let signOut = ()=>{
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }
      const explainLoc = () => {
          setDiagTitle("Why do we ask for your location?")
          setDiagText("This is an entirely optional feature which allows us to display how close you are to each location found in our \"Resources\" and \"Employment\" tabs, as well as Google Maps directions to them. Your information is securely stored and we will not use this data for any other purpose.")
        setOpen(true);
      };
      const updateAddressSuccess = ()=>{
        firebase.database().ref('users/'+props.uid).set({
            firstName: props.first,
            lastName: props.last,
            email: props.email,
            address: address
          });
          setDiagTitle("Updated address successfully")
          setDiagText("Your address has successfully been saved to our database. You may need to refresh this page to see changes.")
          setOpen(true)
      }
      const addressOnChange=(event)=>{
          setAddress(event.target.value)
      }
    return(<div>
        <h1>My Account</h1>
        <h5 style={{textAlign: 'left'}}>Welcome back, {props.first} {props.last}.</h5>
        {(props.address!=null&&props.address!=="")?<h5 style={{textAlign: 'left'}}>Your address on file is {props.address}</h5>:
                                <h5 style={{textAlign: 'left'}}>You do not have an address on file. <button className="link" onClick={explainLoc}>(Why should I add my address?)</button></h5>}
        <h5 style={{textAlign: 'left'}}>
            Change Address: <input onChange={addressOnChange} style={{width: "60%"}} type="text" placeholder="Enter Address, City, State, Zip" name="First" id="first" required></input>
            <button onClick={updateAddressSuccess}>Update</button>
        </h5>
        <Popup open={open} handleClose={handleClose} diagTitle={diagTitle} diagText={diagText}/>
        <button className = "sign-in" style={{paddingLeft:"20px",paddingRight:"20px"}} onClick = {signOut}> <h4>Logout</h4> </button> 
      </div>)
}