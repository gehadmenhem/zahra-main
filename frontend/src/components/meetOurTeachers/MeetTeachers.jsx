import React from "react";
import { motion } from "framer-motion";
import "./meetTeachers.css";

const teachersData = [
  {
    name: "Mrs. Caroline",
    position: "Lead Infant Teacher",
    image: "/images/teacher1.jfif",
    about: "I have been teaching for 5+ years and love spending time with kids...",
    education: "Bachelor's Degree & state-approved teacher certification.",
    funFacts: "I have a cute dog named Dobby and speak English & Spanish.",
    contact: "011-121-12121",
    favorites: { food: "🍎", movie: "🎬", flower: "🌸" },
    color: "#FFD6E0FF",
  },
  // Add more teachers...
];

export default function FancyTeacherProfiles() {
  return (
    <section className="fancy-teachers-section">
      <motion.h2
        className="teachers-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Meet the Daycare Teachers
      </motion.h2>

      <div className="teachers-grid">
        {teachersData.map((teacher, index) => (
          <motion.div
            key={index}
            className="flip-card-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flip-card">
              {/* Front */}
              <div
                className="flip-card-front"
                style={{ background: `linear-gradient(135deg, ${teacher.color} 0%, #fff 100%)` }}
              >
                <img src={teacher.image} alt={teacher.name} />
                <h3>{teacher.name}</h3>
                <p>{teacher.position}</p>
              </div>

              {/* Back */}
              <div className="flip-card-back">
                <h4>About Me</h4>
                <p>{teacher.about}</p>
                <h4>Education</h4>
                <p>{teacher.education}</p>
                <h4>Fun Facts</h4>
                <p>{teacher.funFacts}</p>
                <h4>Contact</h4>
                <p>{teacher.contact}</p>
                <h4>Favorites</h4>
                <div className="favorites">
                  <span>{teacher.favorites.food}</span>
                  <span>{teacher.favorites.movie}</span>
                  <span>{teacher.favorites.flower}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
