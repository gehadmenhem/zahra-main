import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./detailing.css"; // You can keep the same CSS or rename if needed

const steps = [
  {
    number: 1,
    title: "Initial Wash & Decontamination",
    description:
      "The vehicle is thoroughly rinsed and hand-washed using a pH-neutral shampoo. Iron particles, tar, and other contaminants are removed using a clay bar or specialized cleaners to prep the surface for polishing.",
    image: "/images/detailing1.jpg",
  },
  {
    number: 2,
    title: "Paint Correction",
    description:
      "Swirl marks, light scratches, and oxidation are removed using a machine polisher with compounds and polishes. This restores clarity, depth, and gloss to the paint. Every panel is carefully corrected for a flawless finish.",
    image: "/images/detailing2.jpg",
  },
  {
    number: 3,
    title: "Interior Detailing & Protection",
    description:
      "All interior surfaces are deep cleaned, including carpets, seats, and dashboard. Leather is conditioned, and plastics are protected with UV blockers. Glass is polished and streak-free. Optional ceramic coatings are applied for long-term protection.",
    image: "/images/detailing3.webp",
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

export default function DetailingProcess() {
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
        Auto Detailing Process
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
