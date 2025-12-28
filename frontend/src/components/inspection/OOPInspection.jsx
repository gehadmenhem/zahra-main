import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./oopinspection.css"; // reuse same CSS

const steps = [
  {
    number: 1,
    title: "Salvage Vehicle Assessment",
    description:
      "The vehicle is inspected for structural integrity and previous damage repairs. Key components such as the frame, suspension, and airbags are checked to ensure they meet safety standards before starting the inspection process.",
    image: "/images/inspection2.jpg",
  },
  {
    number: 2,
    title: "OOP (Out-of-Province) Inspection",
    description:
      "A certified technician inspects the vehicle according to provincial regulations. This includes lights, brakes, tires, emissions equipment, VIN verification, and any modifications that may affect safety compliance.",
    image: "/images/inspection3.jfif",
  },
  {
    number: 3,
    title: "Certification & Registration",
    description:
      "Once the vehicle passes inspection, the results are submitted to the licensing authority. The vehicle becomes eligible for registration and road use in the province. Any failed items must be repaired and re-inspected.",
    image: "/images/inspection1.webp",
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

export default function SalvageOOPProcess() {
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
        Salvage & Out-of-Province Inspection Process
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
            position: "relative",
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
            style={{ zIndex: 1 }}
          />
        </motion.section>
      ))}
    </>
  );
}
