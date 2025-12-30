import React, { useState } from "react";
import { Calendar, Tag } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import {
  ClockCircleOutlined,
  SmileOutlined,
  BookOutlined,
  CoffeeOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import "./dailySchedule.css";

const scheduleData = [
  {
    time: "7:30 – 9:00 AM",
    title: "Arrival & Free Play",
    icon: <SmileOutlined />,
    description:
      "Warm welcomes, parent check-ins, and calm free play as children arrive.",
    color: "arrival",
  },
  {
    time: "9:00 – 10:00 AM",
    title: "Learning & Circle Time",
    icon: <BookOutlined />,
    description:
      "Storytelling, songs, early literacy, and group activities.",
    color: "learning",
  },
  {
    time: "10:00 – 11:00 AM",
    title: "Outdoor Play & Movement",
    icon: <SmileOutlined />,
    description:
      "Fresh air, physical play, and motor skill development.",
    color: "play",
  },
  {
    time: "11:30 – 12:30 PM",
    title: "Lunch Time",
    icon: <CoffeeOutlined />,
    description:
      "Nutritious meals served in a calm, supervised environment.",
    color: "meal",
  },
  {
    time: "12:30 – 2:30 PM",
    title: "Nap & Quiet Time",
    icon: <MoonOutlined />,
    description:
      "Rest time tailored to each age group’s needs.",
    color: "rest",
  },
  {
    time: "2:30 – 4:00 PM",
    title: "Creative Activities",
    icon: <BookOutlined />,
    description:
      "Arts, crafts, hands-on learning, and exploration.",
    color: "creative",
  },
  {
    time: "4:00 – 5:30 PM",
    title: "Snack & Pick-Up",
    icon: <ClockCircleOutlined />,
    description:
      "Light snacks, reflection, and end-of-day transitions.",
    color: "departure",
  },
];

export default function DailySchedule() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <section className="daily-schedule-section">
      <motion.h2
        className="daily-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Daily Schedule
      </motion.h2>

      <motion.p
        className="daily-subtitle"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        A balanced daily routine that supports learning, play, rest, and care.
      </motion.p>

      <div className="daily-layout">
        {/* Calendar */}
        <motion.div
          className="calendar-card"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Calendar
            fullscreen={false}
            onSelect={(date) => setSelectedDate(date)}
          />
          {selectedDate && (
            <Tag color="gold" className="selected-date">
              Selected Date: {selectedDate.format("MMMM D, YYYY")}
            </Tag>
          )}
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="schedule-timeline"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence>
            {scheduleData.map((item, index) => (
              <motion.div
                key={index}
                className={`timeline-item ${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="timeline-icon">{item.icon}</div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <span className="time">{item.time}</span>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
