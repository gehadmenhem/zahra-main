import React from "react";
import { Collapse, Tag } from "antd";
import { motion } from "framer-motion";
import {
  HeartOutlined,
  SmileOutlined,
  BookOutlined,
} from "@ant-design/icons";
import "./programsAge.css";

const { Panel } = Collapse;

const programsData = [
  {
    key: "infant",
    title: "Infants",
    ages: "0 – 12 Months",
    icon: <HeartOutlined />,
    image: "/images/infant.jpeg",
    gradient: "infant-bg",
    summary:
      "A calm, loving space where infants feel safe, comforted, and deeply cared for.",
    details: [
      "Individual feeding & sleeping schedules",
      "Tummy time and sensory exploration",
      "Music, visual stimulation & storytelling",
      "Strong caregiver bonding",
      "Daily parent updates and communication",
    ],
    goal:
      "Build emotional security, trust, and early sensory development.",
  },
  {
    key: "toddler",
    title: "Toddlers",
    ages: "1 – 3 Years",
    icon: <SmileOutlined />,
    image: "/images/toddler.jpg",
    gradient: "toddler-bg",
    summary:
      "An active and playful environment that encourages independence and discovery.",
    details: [
      "Language development through songs & stories",
      "Fine & gross motor skill activities",
      "Guided social interaction",
      "Creative play and movement",
      "Introduction to routines & self-help skills",
    ],
    goal:
      "Support confidence, communication, and early social development.",
  },
  {
    key: "preschool",
    title: "Preschool",
    ages: "3 – 5 Years",
    icon: <BookOutlined />,
    image: "/images/preschool.jpg",
    gradient: "preschool-bg",
    summary:
      "A structured learning program that prepares children for school success.",
    details: [
      "Early literacy & numeracy",
      "Creative arts and imagination",
      "Problem-solving & critical thinking",
      "Social-emotional learning",
      "Classroom-style routines",
    ],
    goal:
      "Build school readiness, independence, and lifelong learning skills.",
  },
];

export default function ProgramsAge() {
  return (
    <section className="programs-age-section">
      <motion.h2
        className="programs-age-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Programs & Age Groups
      </motion.h2>

      <motion.p
        className="programs-age-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        Age-appropriate programs thoughtfully designed to nurture learning,
        confidence, and joyful growth.
      </motion.p>

      {programsData.map((program, index) => (
        <motion.div
          key={program.key}
          className={`program-row ${program.gradient}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <div className="program-image-wrapper">
            <img src={program.image} alt={program.title} />
          </div>

          <div className="program-content">
            <h3>
              {program.icon} {program.title}
            </h3>

            <Tag color="gold">{program.ages}</Tag>

            <p className="program-summary">{program.summary}</p>

            <Collapse ghost>
              <Panel header="What We Do Every Day">
                <ul>
                  {program.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </Panel>

              <Panel header="Our Focus & Goals">
                <p>{program.goal}</p>
              </Panel>
            </Collapse>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
