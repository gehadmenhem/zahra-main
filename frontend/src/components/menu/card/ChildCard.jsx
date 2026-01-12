import { Avatar, Card } from 'antd';
import './ChildCard.css';

const ChildCard = ({ card, onClick }) => {
  return (
    <Card
      key={card.key}
      hoverable
      className="child-card"
      onClick={() => onClick && onClick(card)}
      bodyStyle={{
        padding: '20px 16px 24px',
        textAlign: 'center',
        position: 'relative',
      }}
      bordered={false}
    >
      {/* Top gradient bar */}
      <div
        className="card-gradient"
        style={{
          background:
            card.gradient || 'linear-gradient(135deg, #ffecd2, #fcb69f)',
        }}
      ></div>

      {/* Circular profile image */}
      <div className="card-avatar">
        <Avatar
          size={70}
          src={card.image || null}
          style={{
            border: '3px solid #fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {card.icon || null}
        </Avatar>
      </div>

      {/* Labels */}
      <div className="card-label">{card.label}</div>
      {card.subLabel && <div className="card-subLabel">{card.subLabel}</div>}
      {card.description && (
        <div className="card-description">{card.description}</div>
      )}
    </Card>
  );
};

export default ChildCard;
