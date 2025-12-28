import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./autobody.css";

const steps = [
 
  {
    number: 1,
    title: "Disassembly",
    description:
      "Damaged parts are removed to inspect for hidden issues. Additional damage is documented and the estimate may be updated.The vehicle is mounted on a frame machine to restore structural integrity using laser measuring systems for accuracy.",
    image: "/images/autobo1.jpg",
  },

  {
    number: 2,
    title: "Body Repair",
    description:
      "Dents are pulled, panels are replaced, and parts are repaired or aligned. Filler may be used for smoothness.Sanding, priming, and masking are done to prepare the surface. A clean environment is essential to prevent dust in the paint.",
    image: "/images/framerepair.jpg",
  },
 
  {
    number: 3,
    title: "Painting",
    description:
      "Using a spray booth, the vehicle is painted and clear-coated. This restores the original color and finish.All repaired or replaced parts are reinstalled. Electrical systems and sensors are tested for functionality.",
    image: "/images/paint.jpg",
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

export default function RepairProcess() {
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
        Auto Body Repair Process
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
            backgroundColor: index % 2 === 0 ? "#333" : "#444",
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
      opacity: 0.8,
    }}
  />
)}
      

          <motion.div
            className="about-text"
            variants={index % 2 === 0 ? fadeLeft : fadeRight}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "45%" }}
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
