import React, { Component } from 'react';
import "./About.css";
import profile_pic_name from "../assets/profile_pic.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div>
          <div class="split left">
            <div className="centered">
              <img git
                className="profile_image"
                // Image goes here
                src = {profile_pic_name}
                alt="Profile Pic"
              ></img>
            </div>
          </div>
          <div className="split right">
            <div className="centered">
              <div className="name_title">Aiden O'Neil</div>
                <div className="brief_description">
                  I like to design and build robots.
                  <br></br>
                  <br></br>
                  I am a Computer Engineering Major at Clarkson University
                  <br></br>
                  <br></br>
                  I am from Rochester, New York and I love to travel.
                </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}