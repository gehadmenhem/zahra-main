import React from "react";
import "./card.css";
import CardItem from "./CardItem";

function Cards() {
  
  return (
    <div className="cards" id="services">
      <h1>Your One-Stop Shop for Auto Repair, Tires, Inventory & Autobody</h1>
      
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="images/CAR_INVENTORY.png"
              text="Easily manage and sell cars with organized listings, detailed info, and filters to help buyers find vehicles quickly."
              label="Inventory"
              path="/inventory"
            />
            <CardItem
              src="images/AUTOBODY.png"
              text="Professional autobody services including collision repair, painting, and detailing. Restore your vehicle’s look and performance with expert care."
              label="AutoBody"
              path="/autobody"
            />

            <CardItem
              src="images/MECHANIC.png"
              text="Skilled mechanic services for all vehicle types, including diagnostics, repairs, and maintenance to keep your car running smoothly and safely."
              label="Mechanic & Change Oil"
              path="/mechanic"
            />
            <CardItem
              src="images/TIRES.png"
              text="Expert tire services and precise wheel alignment to improve handling, safety, and tire life for a smoother, safer drive."
              label="Tires and wheel Alignment"
              path="/tires"
            />
             <CardItem
              src="images/detailinglogo.png"
              text="Auto detailing is a meticulous cleaning, restoration, and protection process that enhances your vehicle’s appearance inside and out"
              label="Detailing"
              path="/detailing"
            />
               <CardItem
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
            />
          
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
