import {
  CalendarOutlined,
  HeartOutlined,
  HomeOutlined,
  PhoneOutlined,
  SafetyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { motion } from 'framer-motion';

import './childInfoCard.css';

const ChildInfoCard = ({ child }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="child-info-wrapper"
    >
      <Card className="child-info-card" bordered={false}>
        <div className="header">
          <Avatar className="avatar" src={child.profile_image} size="medium" />
          <div>
            <h2>
              {child?.child_first_name} {child?.child_last_name}
            </h2>
            <p className="subtitle">Child Profile</p>
          </div>
        </div>

        <div className="info-grid">
          <InfoItem
            icon={<CalendarOutlined />}
            label="Date of Birth"
            value={child?.child_date_of_birth?.split('T')[0]}
          />
          <InfoItem
            icon={<HeartOutlined />}
            label="Medical Notes"
            value={child.special_exercie_diet_details}
          />
          <InfoItem
            icon={<SafetyOutlined />}
            label="Allergies"
            value={child.general_allergies_details}
          />
          <InfoItem
            icon={<UserOutlined />}
            label="Guardian"
            value={child.primary_parent_legal_first_name}
          />
          <InfoItem
            icon={<PhoneOutlined />}
            label="Emergency Contact"
            value={child.primary_parent_phone}
          />
          <InfoItem
            icon={<HomeOutlined />}
            label="Address"
            value={child.primary_parent_work_address}
          />
        </div>
      </Card>
    </motion.div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="info-item">
    <div className="icon">{icon}</div>
    <div>
      <span className="label">{label}</span>
      <p className="value">{value || '—'}</p>
    </div>
  </div>
);

export default ChildInfoCard;
