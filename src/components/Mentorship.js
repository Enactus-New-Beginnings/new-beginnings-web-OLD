import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import stockpic from '../assets/StockMentorship.jpg';
import '../styles.css'

export class Mentorship extends Component {
    render () {
        return (
            <div className = "space20">
                <h1>Mentorship</h1>
                <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <img className = "widepic" src = {stockpic} ></img>
                </div>
                
                <div class="shadow-lg p-3 mb-5 bg-white rounded">
                <Row className = "centeredpink"> <h3 className = "space20">In various studies, mentorship has proven to significantly increase the likelihood of previously incarcerated people getting jobs. One program, Ready4Work, shown that mentored participants were twice as likely to get a job than their non-mentored couterparts. Additionally participants who met with mentors were 35% less likely to reoffend. </h3></Row>
                </div>
                
                <h4 className = "centered">Interested in mentoring? Reach out to us at newbeginnings.innb@gmail.com 
                (Fill out contact form?)</h4>
               
                <h1>Our Mentors</h1>
                <h1>ADD TABLE FOR MENTORS CONNECTED TO BACKEND</h1>
                <h1>ADD FILTER</h1>

            </div>
            
        )
    }
}