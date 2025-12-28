import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./mechanic.css";

const steps = [
  {
    number: 1,
    title: "Vehicle Drop-Off & Initial Assessment",
    description:
      "The mechanic begins with a discussion about the issues and performs a visual inspection to identify any obvious problems.Advanced diagnostic tools are used to scan the vehicle’s systems and identify engine, transmission, or electronic faults.",
    image: "/images/cardiagnost.jpg",
  },
 
  {
    number: 2,
    title: "Estimate & Customer Approval",
    description:
      "After diagnostics, an estimate is prepared. Repairs begin only after the customer gives approval for the service.The mechanic performs necessary repairs such as replacing worn-out parts, fixing leaks, or resolving engine performance issues.",
    image: "/images/mechanicfix.jpg",
  },
 
  {
    number: 3,
    title: "Fluid Changes & Maintenance",
    description:
      "Essential fluids like oil, coolant, brake, and transmission fluids are checked and replaced as needed.Brakes, shocks, and suspension systems are tested and repaired to ensure the vehicle’s safety and comfort. A complete systems check is done, followed by a test drive to confirm that all issues have been resolved.",
    image: "/images/oilchange.jpg",
  },

];

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default function MechanicRepairProcess() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Mechanic Repair Process
      </motion.h1>

      {steps.map((step, index) => (
        <motion.section
          key={step.number}
          className="about-hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
          style={{
            backgroundColor: index % 2 === 0 ? "#222" : "#333",
            position: "relative",
            padding: "2rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "2rem",
          }}
        >
          {index === 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url("/images/aboutusback.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                opacity: 0.15,
                zIndex: 0,
              }}
            />
          )}

          <motion.div
            className="about-text"
            variants={index % 2 === 0 ? fadeLeft : fadeRight}
            transition={{ duration: 0.6 }}
        
          >
            <h2>
            {step.title}
            </h2>
            <p>{step.description}</p>
          </motion.div>

          <motion.img
            src={step.image}
            alt={step.title}
            className="about-image"
            variants={index % 2 === 0 ? fadeRight : fadeLeft}
            transition={{ duration: 0.5 }}
         
           
          />
        </motion.section>
      ))}

    
    </>
  );
}
