import React from "react";
import { Calendar, Card, Timeline, Tag } from "antd";
import {
  CoffeeOutlined,
  BookOutlined,
  SmileOutlined,
  RestOutlined,
  AppleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import "./dailySchedule.css";

export default function DailySchedule() {
  return (
    <section className="daily-schedule-section">
      <motion.h2
        className="daily-title"
        initial={{ opacity: 0, y: 30 }}
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
        A thoughtfully planned day that balances learning, play, meals, and rest
        to support your child’s development.
      </motion.p>

      <div className="daily-layout">
        {/* Calendar */}
        <motion.div
          className="calendar-wrapper"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="calendar-card">
            <Calendar fullscreen={false} />
            <Tag color="green" className="calendar-note">
              Regular weekday schedule
            </Tag>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="timeline-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <Card className="timeline-card">
            <Timeline>
              <Timeline.Item
                dot={<SmileOutlined />}
                color="blue"
              >
                <strong>7:30 – 9:00 AM</strong>
                <p>Arrival, free play & morning welcome</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<AppleOutlined />}
                color="green"
              >
                <strong>9:00 – 9:30 AM</strong>
                <p>Healthy breakfast & social time</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<BookOutlined />}
                color="gold"
              >
                <strong>9:30 – 11:00 AM</strong>
                <p>Learning activities & guided play</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<CoffeeOutlined />}
                color="purple"
              >
                <strong>11:00 – 12:00 PM</strong>
                <p>Outdoor play & physical activities</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<AppleOutlined />}
                color="red"
              >
                <strong>12:00 – 1:00 PM</strong>
                <p>Lunch & quiet time</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<RestOutlined />}
                color="gray"
              >
                <strong>1:00 – 3:00 PM</strong>
                <p>Nap / rest time (age-appropriate)</p>
              </Timeline.Item>

              <Timeline.Item
                dot={<SmileOutlined />}
                color="cyan"
              >
                <strong>3:00 – 5:30 PM</strong>
                <p>Afternoon snack, creative play & pick-up</p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
