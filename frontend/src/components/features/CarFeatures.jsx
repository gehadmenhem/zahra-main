
import { Descriptions } from "antd";

const featureLabels = {
  remote_start: "Remote Start",
  remote_lock_unlock: "Remote Lock/Unlock",
  heated_steering_wheel: "Heated Steering Wheel",
  heated_ventilated_seats: "Heated and Ventilated Seats",
  camera_system: "360-Degree Camera System",
  speed_alerts: "Speed Alerts",
  bluetooth: "Bluetooth Connectivity",
  carplay_android: "Wireless Apple CarPlay & Android Auto",
  screen_personalization: "Control Screen Personalization",
  multi_vehicle_control: "Multiple Vehicle Control",
  heated_seats: "Heated Seats",
  ventilated_seats: "Ventilated Seats",
  cruise_control: "Cruise Control",
  steering_wheel_controls: "Steering Wheel Controls",
  keyless_entry: "Keyless Entry",
  dual_climate_control: "Dual Climate Control",
  power_windows: "Power Windows",
  power_mirrors: "Power Mirrors",
  power_locks: "Power Locks",
  parking_sensors: "Parking Sensors",
  panoramic_sunroof: "Panoramic Sunroof",
  power_tailgate: "Power Tailgate",
  hybrid: "Hybrid",
  lane_keep_assist: "Lane Keep Assist",
  adaptive_cruise: "Adaptive Cruise Control",
  backup_camera: "Backup Camera",
  seven_seater: "7 Seaters",
  front_collision_detection: "Front Collision Detection",
  side_mirror_camera: "Side Mirror Camera",
  navigation: "Navigation System",
  blind_spot_monitor: "Blind Spot Monitor",
  auto_stop_start: "Auto Stop/Start",
  automatic_emergency_braking: "Automatic Emergency Braking",
  collision_avoidance: "Collision Avoidance System",
  traction_control: "Traction Control",
  forward_collision_warning: "Forward Collision Warning",
  surround_view_camera: "Surround-View Camera",
  automatic_high_beams: "Automatic High Beams",
  wireless_charging_pad: "Wireless Charging Pad",
  push_to_start: "Push To Start"
};

export default function FeaturesDescription({ features }) {
  
  const featureNames = features.map(f => featureLabels[f]).filter(Boolean);

  return (
    <Descriptions title="Car Features" bordered column={1}>
      <Descriptions.Item label="Extra Features">
        {featureNames.length ? featureNames.join(", ") : "No features selected"}
      </Descriptions.Item>
    </Descriptions>
  );
}


