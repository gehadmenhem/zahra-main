import React from "react";
import "./card.css";
import CardItem from "./CardItem";

function Cards() {
  
  return (
    <div className="cards" id="services">
      <h1>A Safe, Nurturing Place Where Learning, Care, and Play Come Together to Help Children Grow.</h1>
      
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/programs.png"
              text="Age-appropriate programs thoughtfully designed to support your child’s growth at every stage of early childhood"
              label="Programs / Age Groups"
              path="/programs"
            />
            <CardItem
              src="images/dailyprograms.png"
              text="A balanced daily routine that provides structure, comfort, learning, play, and rest throughout the day"
              label="Daily Schedule"
              path="/autobody"
            />

            <CardItem
              src="images/learning.png"
              text="A play-based curriculum that encourages curiosity, creativity, confidence, and a strong foundation for lifelong learning."
              label="Learning & Curriculum"
              path="/mechanic"
            />
            <CardItem
              src="images/health.png"
              text="A clean, secure, and carefully supervised environment where your child’s health, safety, and well-being always come first."
              label="Safety & Health"
              path="/tires"
            />
             <CardItem
              src="images/teachers.png"
              text="Caring, qualified educators dedicated to nurturing, teaching, and supporting every child as they grow."
              label="Meet Our Teachers"
              path="/detailing"
            />
               {/* <CardItem
              src="images/inspectionlogo.png"
              text="Salvage and Out-of-Province (OOP) inspections are mandatory safety assessments required to register vehicles that were previously written off or brought in from another province, ensuring they meet Alberta’s roadworthiness standards."
              label="Salvage and Out-of-Province"
              path="/inspection"
            />
               <CardItem
              src="images/remotestarter.png"
              text="Remote starter repair or programming involves diagnosing and resolving issues with the remote start system’s hardware or software, ensuring the device properly communicates with your vehicle’s ignition and security systems so the engine starts smoothly and securely from a distance."
              label="Remote Starter"
              path="/remotestarter"
            /> */}
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
