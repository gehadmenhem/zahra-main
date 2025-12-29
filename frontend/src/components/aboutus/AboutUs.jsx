import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./aboutus.css";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Page Title */}
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Our Daycare
      </motion.h1>

      {/* Section 1 */}
      <motion.section
        className="about-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        style={{ backgroundColor: "#C7EDE6FF" }}
      >
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
            zIndex: -1,
          }}
        />

        <motion.div
          className="about-text"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
           
        >
          <h2>Where Little Minds Grow</h2>
          <p>
            At Bright Steps Daycare, we provide a warm, safe, and nurturing
            environment where children feel happy, supported, and encouraged to
            explore the world around them. Our dedicated caregivers focus on
            early learning, creativity, and social development to help every
            child grow with confidence.
          </p>
        </motion.div>

        <motion.img
          src="/images/daycare-bg.png"
          alt="Children learning through play"
          className="about-image"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="about-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        style={{ backgroundColor: "#E8F5E9FF" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/images/daycare-bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.7,
            zIndex: -1,
          }}
        />

        <motion.div
          className="about-text"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <h2>Learning Through Play</h2>
          <p>
            We believe children learn best when they are engaged, curious, and
            having fun. Our daily programs include storytelling, music, arts and
            crafts, outdoor play, and hands-on activities that build confidence,
            independence, and strong social skills.
          </p>
        </motion.div>

        <motion.img
          src="/images/daycare-activities.png"
          alt="Creative activities at daycare"
          className="about-image"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.section>

      {/* Section 3 */}
      <motion.section
        className="about-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        style={{ backgroundColor: "#eef6f0" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/images/daycare-bg.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.6,
            zIndex: -1,
          }}
        />

        <motion.div
          className="about-text"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <h2>Safe, Caring & Trusted</h2>
          <p>
            Your child’s safety and well-being are our highest priorities. We
            maintain clean, secure facilities and follow strict health and safety
            standards at all times. Our trained staff provides attentive care,
            giving families peace of mind and children a place to thrive.
          </p>
        </motion.div>

        <motion.img
          src="/images/daycare-care.png"
          alt="Caring daycare staff"
          className="about-image"
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.section>
    </>
  );
}
