import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./tiresandwheel.css";

const steps = [
  {
    number: 1,
    title: "Tire Replacement or Rotation",
    description:
      "The technician greets the customer and begins with a visual inspection of all four tires, carefully checking for signs of wear, cracks, bulges, or uneven tread patterns that may indicate alignment or suspension issues.The car is safely lifted using a hydraulic lift, and the wheels are removed to assess tire and rim condition. Tires are either replaced or rotated based on wear patterns.",
    image: "/images/changetire.jpg",
  },

  {
    number: 2,
    title: "Tire Pressure Check",
    description:
      "Each wheel is mounted on a computerized balancing machine to ensure it spins evenly at high speeds. Tire pressure is adjusted to meet manufacturer specs.",
    image: "/images/tirepressure.jpg",
  },
  {
    number: 3,
    title: "Wheel Alignment Adjustment",
    description:
      "Using a sophisticated computerized alignment system, technicians evaluate the current positioning of each wheel in relation to the vehicle’s intended geometry. The system identifies any deviations from the manufacturer’s original specifications, allowing for accurate and finely tuned adjustments that restore proper alignment, improve driving stability, and reduce uneven tire wear",
    image: "/images/wheelalignment.jpg",
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

export default function TireAlignmentProcess() {
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
        Tire Change & Wheel Alignment Process
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
            color: "#fff",
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
            style={{ maxWidth: "45%", zIndex: 1 }}
          >
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </motion.div>

          <motion.img
            src={step.image}
            alt={step.title}
            className="about-image"
            variants={index % 2 === 0 ? fadeRight : fadeLeft}
            transition={{ duration: 0.5 }}
            // style={{
            //   maxWidth: "45%",
            //   borderRadius: "8px",
            //   boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            //   zIndex: 1,
            // }}
          
          />
        </motion.section>
      ))}

   
    </>
  );
}
