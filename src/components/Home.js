import React, {Component} from 'react';
import {Row, Col, Nav} from 'react-bootstrap';
import {Link, HashRouter as Router} from "react-router-dom"
import handshake from '../assets/handshake.png';
import briefcase from '../assets/briefcase.png';
import books from '../assets/books.png';
import logo from '../assets/logo.png';
import "./Home.css";

export class Home extends Component {
    render () {
        return (
            <div>
                <Row>
                    <div className = "home-padding"></div>
                        <Col xs={12} sm={12} md={12} lg={5} xl={3} > 
                            <img className = "home-logo" src={logo}/> </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={8}>
                            <div className="home-textbox-mission">
                                <p>
                                    Our mission is to help formerly incarcerated 
                                    individuals secure employment, establish strong 
                                    relationships with mentors, and gain access to local 
                                    resources in order to ease their transition from 
                                    prison.
                                </p>
                            </div>
                        </Col>
                </Row>
                <Router>
                <div className = "space80"></div>
                <Row> 
                    <Col sm = "12" md ="12" lg="12" xl = "4" className = "box-outline">
                        <Col  className = "home-textbox-1"> <h3> Mentorship</h3>
                        <Nav.Item><Nav.Link as = {Link} to = "/mentorship"><img src = {handshake} height = {50}></img></Nav.Link></Nav.Item>
                        <p> Connect with like-minded people who turned their lives around upon re-entering society. Studies show that people with strong mentors are twice as likely to get employed. Click here if you’d like to mentor!</p>
                        </Col>
                    </Col>

                    <Col sm = "12" md ="12" lg="12" xl = "4" className = "box-outline" >
                        <Col  className = "home-textbox-1"> <h3> Employment</h3>
                        <Nav.Item><Nav.Link as = {Link} to = "/employment"><img src = {briefcase} height = {50}></img></Nav.Link></Nav.Item>
                        <p>Reach out to employers who don’t discriminate based on past convictions. <br></br> <br></br>If you’d like to have your business featured please click here!  </p></Col>
                    </Col>
                    <Col sm = "12" md ="12" lg="12" xl = "4" className = "box-outline">
                        <Col className = "home-textbox-1"> <h3>Resources</h3> 
                        <Nav.Item><Nav.Link as = {Link} to = "/profdev"><img src = {books} height = {50}></img></Nav.Link></Nav.Item>
                        <p>Here you can find a cirrculum to guide your professional development, (as well as other local resources: affordable housing, local support groups, transportation etc.) </p></Col>
                    </Col>
                </Row>
                </Router>

                <div className = "space80"></div>
                <Row> 
                    <Col xs = "12" sm = "12" md ="12" lg="5" xl = "5" className = "image-outline">
                        <Col >
                        <img className = "home-logo" src={logo}/> 
                        </Col>
                    </Col>
                    <Col xs = "12" sm = "12" md ="12" lg="7" xl = "7" className = "feedback-outline">
                        <Col  className = "home-textbox-feedback">
                        <p> We’re constantly looking for ways to improve our website/app. Feel free to reach out to us at newbeginnings.innb@gmail.com or fill out this feedback form!</p>
                        </Col>
                    </Col>
                </Row>
                <div className = "space80"></div>
            </div>
        )
    }
}