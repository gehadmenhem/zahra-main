import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./aboutus.css";

export default function AboutUs() {
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
        About Us
      </motion.h1>

      {/* Section 1 */}
      <motion.section
        className="about-hero"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        // style={{
        //   height: "100vh",
        //   width: "100vw",
        //   marginLeft: "calc(-50vw + 50%)",
        //   display: "flex",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   padding: "0 5%",
        //   position: "relative",
        // }}
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
          <h2>Why Choose Us?</h2>
          <p>
            We provide top-quality car services with honest pricing and fast
            results. From mechanical to autobody — we’ve got you covered.
            Our certified technicians use the latest tools and diagnostics to
            keep your vehicle running smoothly. From oil changes to engine work,
            we handle it all. We stand by our work and treat every car like it’s
            our own.

          </p>
        </motion.div>
        <motion.img
          src="/images/mechanicnew.jfif"
          alt="Car Sales"
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
        style={{
        
          backgroundColor: "#444", // fallback color
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("/images/aboutusback.png")', // different background
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
            hidden: { opacity: 0, x: 50 }, // reversed animation
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          <h2>Collision & Auto Body Services</h2>
          <p>
            Accidents happen—but we’ll make your vehicle look like new again.
            Our autobody specialists provide top-tier paint jobs, dent removal,
            and structural restoration with a commitment to quality and detail.

          </p>
        </motion.div>
        <motion.img
          src="/images/aboutus1.jfif"
          alt="Our Mission"
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
        style={{
        
          backgroundColor: "#333",
        }}
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
          <h2>About Our Tires</h2>
          <p>
            At A2Z AutoBody & Sales, we understand that tires are crucial for
            your vehicle’s safety and performance. We offer a wide selection of
            high-quality tires from trusted brands, suited for all seasons and
            driving conditions. Our expert technicians provide professional tire
            installation, balancing, and wheel alignment to ensure smooth
            handling, better fuel efficiency, and longer tire life. Whether you
            need new tires or maintenance, we deliver dependable service with
            your safety in mind.

          </p>
        </motion.div>
        <motion.img
          src="/images/tiresnew.jfif"
          alt="Our Team"
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
