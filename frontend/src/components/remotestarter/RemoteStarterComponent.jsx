import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./remotestarter.css"; // You can rename this if needed to match the topic

const steps = [
  {
    number: 1,
    title: "Vehicle Inspection & Compatibility Check",
    description:
      "The technician starts by verifying that the vehicle supports a remote starter system and checks for any existing factory-installed security systems or limitations. The car's make, model, and year are confirmed to ensure compatibility.",
    image: "/images/remote1.jpg",
  },
  {
    number: 2,
    title: "Module & Wiring Installation",
    description:
      "An aftermarket remote start module is installed under the dashboard. The technician carefully accesses the ignition wiring harness and connects necessary control wires using secure soldering or T-taps, ensuring no interruption to factory circuits.",
    image: "/images/remote2.webp",
  },
  {
    number: 3,
    title: "Programming & Key Bypass Configuration",
    description:
      "The technician configures the bypass module (if needed) to allow the car to start without a physical key in the ignition. The remote system is then programmed using a diagnostic tool or software, matching it to the car’s onboard computer.",
    image: "/images/remote3.webp",
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

export default function RemoteStarterProcess() {
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
        Remote Starter Installation Process
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
          />
        </motion.section>
      ))}
    </>
  );
}
