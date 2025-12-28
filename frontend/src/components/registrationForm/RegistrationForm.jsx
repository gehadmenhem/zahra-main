// import { Form, Link } from "react-router-dom";
// https://www.bing.com/videos/riverview/relatedvideo?&q=ant+desin+form&&mid=96F489C67859E74A365396F489C67859E74A3653&&FORM=VRDGAR

// https://ant.design/components/form
import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "primeicons/primeicons.css";
// const { MinusCircleOutlined, PlusOutlined } = icons;
import { Input, Form, Button, DatePicker, Select,notification, Result, message ,Checkbox} from "antd";
import "./newform.css";
import dayjs from "dayjs";
import ImageUploader from "../UploadImages/ImageUploader";
import api from "../../api/apiCalls"
const carFeatures = [
  { name: 'remote_start', label: 'Remote Start' },
  { name: 'remote_lock_unlock', label: 'Remote Lock/Unlock' },
  { name: 'heated_steering_wheel', label: 'Heated Steering Wheel' },
  { name: 'heated_ventilated_seats', label: 'Heated and Ventilated Seats' },
  { name: 'camera_system', label: '360-Degree Camera System' },
  { name: 'speed_alerts', label: 'Speed Alerts' },
  { name: 'bluetooth', label: 'Bluetooth Connectivity' },
  { name: 'carplay_android', label: 'Wireless Apple CarPlay & Android Auto' },
  { name: 'screen_personalization', label: 'Control Screen Personalization' },
  { name: 'multi_vehicle_control', label: 'Multiple Vehicle Control' },

  // ✅ Added from your list
  { name: 'heated_seats', label: 'Heated Seats' },
  { name: 'ventilated_seats', label: 'Ventilated Seats' },
  { name: 'cruise_control', label: 'Cruise Control' },
  { name: 'steering_wheel_controls', label: 'Steering Wheel Controls' },
  { name: 'keyless_entry', label: 'Keyless Entry' },
  { name: 'dual_climate_control', label: 'Dual Climate Control' },
  { name: 'power_windows', label: 'Power Windows' },
  { name: 'power_mirrors', label: 'Power Mirrors' },
  { name: 'power_locks', label: 'Power Locks' },
  { name: 'parking_sensors', label: 'Parking Sensors' },
  { name: 'panoramic_sunroof', label: 'Panoramic Sunroof' },
  { name: 'power_tailgate', label: 'Power Tailgate' },
  { name: 'hybrid', label: 'Hybrid' },
  { name: 'lane_keep_assist', label: 'Lane Keep Assist' },
  { name: 'adaptive_cruise', label: 'Adaptive Cruise Control' },
  { name: 'backup_camera', label: 'Backup Camera' },
  { name: 'seven_seater', label: '7 Seaters' },
  { name: 'front_collision_detection', label: 'Front Collision Detection' },
  { name: 'side_mirror_camera', label: 'Side Mirror Camera' },
  { name: 'navigation', label: 'Navigation System' },
  { name: 'blind_spot_monitor', label: 'Blind Spot Monitor' },
  { name: 'auto_stop_start', label: 'Auto Stop/Start' },
  { name: 'automatic_emergency_braking', label: 'Automatic Emergency Braking' },
  { name: 'collision_avoidance', label: 'Collision Avoidance System' },
  { name: 'traction_control', label: 'Traction Control' },
  { name: 'forward_collision_warning', label: 'Forward Collision Warning' },
  { name: 'surround_view_camera', label: 'Surround-View Camera' },
  { name: 'automatic_high_beams', label: 'Automatic High Beams' },
  { name: 'wireless_charging_pad', label: 'Wireless Charging Pad' },
  { name: 'push_to_start', label: 'Push To Start' }
];
function RegistrationForm() {
  const navigate=useNavigate()
  const [currentStep, setCurrentStep] = useState(0);

  const [caroverview] = Form.useForm();
  const [carperformance] = Form.useForm();
  const [carinfo] = Form.useForm();
  const [carimagesadditionalinfo] = Form.useForm();
  const [formData, setformData] = useState({});
 const [imageFiles, setImageFiles] = useState([]);
 const [loading, setLoading] = useState(false);
   useEffect(() => {
  window.scrollTo(0, 0);
}, []);
 const handleNavigateToInventory=()=>{
  navigate("/inventory")
 }
  const handleNext = () => {
    if (currentStep < 3) {
      if (currentStep === 0) {
        caroverview
          .validateFields()
          .then((values) => {
            console.log(values);
            setformData((prev) => ({
              ...prev,
              ...values,
            }));
            setCurrentStep(currentStep + 1); // ✅ Only advance if valid
          })
          .catch((errorInfo) => {
            notification.success({
  message: 'Info',
  description:  'please start enter data to proceed',
  duration: 5,
      });
            console.log("Validation failed:", errorInfo);
          });
      } else if (currentStep === 1) {
        carperformance
          .validateFields()
          .then((values) => {
            console.log(values);
            setformData((prev) => ({
              ...prev,
              ...values,
            }));
            setCurrentStep(currentStep + 1); // ✅ Only advance if valid
          })
          .catch((errorInfo) => { notification.success({
  message: 'Info',
  description:  'please start enter data to proceed',
  duration: 5,
      });
            console.log("Validation failed:", errorInfo);
          });
      } else if (currentStep === 2) {
        carinfo
          .validateFields()
          .then((values) => {
            console.log(values);
            setformData((prev) => ({
              ...prev,
              ...values,
            }));
            setCurrentStep(currentStep + 1); // ✅ Only advance if valid
          })
          .catch((errorInfo) => {
            console.log("Validation failed:", errorInfo);
          });
      } else {
        setCurrentStep(currentStep + 1); // No validation for other steps
      }
    }
  };

  const handleSubmit = async () => {
  // setLoading(true)

  try {
    // 1. Validate fields from the additional info form
    const featuresValues = await carimagesadditionalinfo.validateFields();
console.log(featuresValues)
    // 2. Create FormData object
    const formDataPictures = new FormData();

    // 3. Format year if present
    if (formData?.year) {
      formData.year = dayjs(formData.year).format("YYYY");
    }

    // 4. Append non-empty basic formData fields
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        formDataPictures.append(key, val);
      }
    });

    // 5. Append image files
    imageFiles.forEach((file) => {
      formDataPictures.append("files", file.originFileObj);
    });

    // 6. Append features (as PostgreSQL array string)
    if (featuresValues.features && Array.isArray(featuresValues.features)) {
      const featuresArray = featuresValues.features;
      const pgArrayString = `{${featuresArray.map(f => `"${f}"`).join(",")}}`;
      formDataPictures.append("features", pgArrayString);
    }

    // ✅ 7. Append carfax
    if (featuresValues?.carfax) {
      formDataPictures.append("carfax", featuresValues.carfax);
    }

    // Debug output
    console.log("CARFAX:", formDataPictures.get("carfax"));
    console.log("FEATURES:", formDataPictures.getAll("features"));

    // 8. Submit to API
    const registerResult = await api.register(formDataPictures);

    if (registerResult) {
      notification.success({
        message: 'Success',
        description: registerResult,
        duration: 5,
      });

      setLoading(false);
      setformData({});
      caroverview.resetFields();
      carperformance.resetFields();
      carinfo.resetFields();
      carimagesadditionalinfo.resetFields();
      setImageFiles([]);
      setCurrentStep(currentStep + 1);
    } else {
      notification.error({
        message: 'Error',
        description: "Unknown error. Check with the administrator.",
        duration: 5,
      });
    }
  } catch (error) {
    setLoading(false);
    console.log(error?.message);
    notification.error({
      message: 'Error',
      description: error?.message || "Unknown error. Check with the administrator.",
      duration: 5,
    });
  }
};


  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1); // Move to the previous step
    }
  };
  const handleAddingCar = () => {
   
      setCurrentStep(0);
   
  
  };
  return (
    <div className="multi-step-form">
      <ul id="progressbar">
        <li className={currentStep >= 0 ? "active" : ""}>Car Overview</li>
        <li className={currentStep >= 1 ? "active" : ""}>Car Performance</li>
        <li className={currentStep >= 2 ? "active" : ""}>Additional Info</li>
        <li className={currentStep >= 3 ? "active" : ""}>Additional Info</li>
        <li className={currentStep >= 4 ? "active" : ""}>Additional Info</li>
      </ul>

      {/* Step 1 */}
      {currentStep === 0 && (
        <fieldset>
          <h2 className="fs-title">Car Overview</h2>
          <h3 className="fs-subtitle">Car Information</h3>
          <Form layout="vertical" form={caroverview}>
            <Form.Item
              name="vin_number"
              rules={[
                {
                  required: true,
                  message: "Please enter your Car Vin Number",
                },
              ]}
            >
              <Input
                placeholder="vin number ex:hjd63hfkfhf66373hdhf7"
                value={formData?.vin_number || ""}
              />
            </Form.Item>
             <Form.Item
              name="price"
              rules={[
                { required: true, message: "Please enter your Car price" },
              ]}
            >
              <Input
                placeholder="price ex:100000"
                type="number"
                min="0"
                value={formData?.price || 0}
              />
            </Form.Item>
          
            <Form.Item
              name="make"
              rules={[
                { required: true, message: "Please enter your car make" },
              ]}
            >
              <Input placeholder="make ex:Jeep" value={formData?.make || ""} />
            </Form.Item>
            <Form.Item
              name="model"
              rules={[
                { required: true, message: "Please enter your car model" },
              ]}
            >
              <Input placeholder="model ex:Grand cherokee" />
            </Form.Item>
            <Form.Item name="trim">
              <Input placeholder="trim ex:Overland" />
            </Form.Item>

            <Form.Item
              name="mileage"
              rules={[
                { required: true, message: "Please enter your Car mileage" },
              ]}
            >
              <Input
                placeholder="mileage ex:100000"
                type="number"
                min="0"
                value={formData?.mileage || 0}
              />
            </Form.Item>

            <Form.Item
              name="year"
              rules={[
                { required: true, message: "Please enter your year of make" },
              ]}
            >
              <DatePicker
                style={{
                  width: "100%",
                  height: "50px",
                  border: "2px solid #ccc",
                }}
                picker="year"
                placeholder="Date of Make"
                value={formData?.year ? dayjs(formData.year, "YYYY") : null}
              />
            </Form.Item>

            <Button onClick={handleNext} type="primary">Next</Button>
          </Form>
        </fieldset>
      )}

      {/* Step 2 */}
      {currentStep === 1 && (
        <fieldset >
          <h2 className="fs-title">Car Performance</h2>
          <h3 className="fs-subtitle">Engine-Transmission</h3>
          <Form
            layout="vertical"
            form={carperformance}
            initialValues={{
              transmission: formData?.transmission || "Automatic", // ✅ default selected option
            }}
          >
            <Form.Item
              name="engine"
              rules={[
                { required: true, message: "Please confirm your car engine" },
              ]}
            >
              <Input
                placeholder="engine ex:292 hp 4.6L V8"
                value={formData?.engine || ""}
              />
            </Form.Item>
            <Form.Item name="horse_power">
              <Input
                placeholder="horse power ex:292hp"
                value={formData?.horse_power || ""}
              />
            </Form.Item>
            <Form.Item name="drivetrain">
              <Input
                placeholder="drivetrain ex: four wheel drive"
                value={formData?.drivetrain || ""}
              />
            </Form.Item>

            <Form.Item
              name="transmission"
              rules={[
                {
                  required: true,
                  message: "Please select your car transmission",
                },
              ]}
            >
              <Select
                placeholder="transmission"
                style={{
                  width: "100%",
                  height: "50px",
                  border: "2px solid #ccc",
                }}
              >
                <Select.Option value="Automatic">Automatic</Select.Option>
                <Select.Option value="Manual">Manual</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="fuel_consumption">
              <Input
                placeholder="fuelconsumption ex:100L/km"
                value={formData?.fuel_consumption || ""}
              />
            </Form.Item>

            <Form.Item name="fuel_type">
              <Input
                placeholder="fueltype ex:Gazoline"
                value={formData?.fuel_type || ""}
              />
            </Form.Item>
            <Form.Item name="fuel_tank_size">
              <Input placeholder="fuel tank size ex:85L" />
            </Form.Item>
           <div className="button-row">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button type="primary" onClick={handleNext}>Next</Button>
      </div>
          </Form>
        </fieldset>
      )}

      {/* Step 3 */}
{currentStep === 2 && (
  <fieldset >
    <h2 className="fs-title">Additional Info</h2>
    <h3 className="fs-subtitle">Car condition</h3>

    <Form layout="vertical" form={carinfo} >
        <Form.Item name="stock_number">
              <Input placeholder="stocknumber ex:1234567" />
            </Form.Item>
      <Form.Item name="condition">
        <Input
          placeholder="Condition e.g. new, used"
          value={formData?.condition || ""}
        />
      </Form.Item>

      <Form.Item name="exterior_color">
        <Input
          placeholder="Exterior color e.g. red"
          value={formData?.exterior_color || ""}
        />
      </Form.Item>

      <Form.Item name="interior_color">
        <Input
          placeholder="Interior color e.g. black"
          value={formData?.interior_color || ""}
        />
      </Form.Item>

      <Form.Item name="body_type">
        <Input
          placeholder="Body type e.g. truck"
          value={formData?.body_type || ""}
        />
      </Form.Item>

      <Form.Item name="description">
        <Input.TextArea
          placeholder="Description"
          value={formData?.description || ""}
        />
      </Form.Item>

      {/* Buttons aligned left and right */}
      <div className="button-row">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button type="primary" onClick={handleNext}>Next</Button>
      </div>
    </Form>
  </fieldset>
)}
      {/* Step 4 */}
      {currentStep === 3 && (
        <fieldset>
          <h2 className="fs-title">Additional Info</h2>
   <h3 className="fs-subtitle">Car Features</h3>
          <Form layout="vertical" form={carimagesadditionalinfo} onFinish={handleSubmit}>
               <Form.Item name="carfax"  rules={[
                {
                  required: true,
                  message: "Please enter your Car car fax",
                },
              ]}>
        <Input
          placeholder="car fax url"
          value={formData?.carfax || ""}
        />
    </Form.Item>
  <Form.Item name="features" label="Car Features">
  <Checkbox.Group>
    <div className="feature-grid">
      {carFeatures.map((feature) => (
        <Checkbox key={feature.name} value={feature.name}>
          {feature.label}
        </Checkbox>
      ))}
    </div>
      </Checkbox.Group>
    </Form.Item>
 

            <Form.Item label="Upload Images">
              <ImageUploader fileList={imageFiles} setFileList={setImageFiles} />
            </Form.Item>
<div className="button-row">
            <Button onClick={handlePrevious}>Previous</Button>

            <Button type="primary" htmlType="submit"  loading={loading}>
              Submit
            </Button>
            </div>
          </Form>
        </fieldset>
      )}
        {currentStep === 4 && (
        <fieldset>
          <h2 className="fs-title">Successfully added the car </h2>
          <h3 className="fs-subtitle">thanks for using our systemc</h3>
          <h1>click here for adding new car</h1>
           <Button onClick={handleAddingCar}>Add new Car</Button>
           <Button onClick={handleNavigateToInventory}>Navigate to Inventory</Button>
        </fieldset>
      )}
    </div>
  );
}

export default RegistrationForm;
