import React, { useState, useEffect } from 'react';
import { Modal, Carousel, notification, Spin, ConfigProvider, Descriptions,Form ,Input, Button} from 'antd';
import api from '../../api/apiCalls';
import './imageCarouselModal.css';
import Carfeature from"../features/CarFeatures"
import FinanceCalculator from '../financeCalculator/FinanceCalculator';

export default function ImageCarouselModal({ open, onClose, startIndex = 0, carInfo }) {
  const { TextArea } = Input;
  const [carImages, setCarImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(startIndex);
    const [btnLoading, setBtnLoading] = useState(false);
  const [customerForm] = Form.useForm();

  const handleSendToStore = async () => {
    try {
      // Validate customer form fields
      const customerData = await customerForm.validateFields();

      if (!carInfo?.vin_number) {
        notification.warning({
          message: 'Warning',
          description: 'No car selected.',
        });
        return;
      }

      setBtnLoading(true);

      // Prepare data to send
      const payload = {
        vin_number: carInfo.vin_number,
        make: carInfo?.make,
        year: carInfo?.year,
        price:carInfo?.price,
        trim:carInfo?.trim,
        ...customerData,
      };

      // Call your API (replace with your actual endpoint)
      const response = await api.sendInquiry(payload);
      if (response) {
        notification.success({
          message: 'Success',
          description: response?.data + "  please check your email" || "email has bee sent successfully please check your email",
          duration: 3,
        });
      }
      customerForm.resetFields();

    } catch (error) {
      // validation error or API error
      notification.error({
              message: 'Error',
              description: error.response?.data?.message || error?.message,
              duration: 5,
            });
    } finally {
      setBtnLoading(false);
    }
  };


  useEffect(() => {
    async function getCarInfo(vin_number) {
      setLoading(true);
      try {
        const response = await api.getinventoryImages(vin_number);
        const allImages = [];

        if (response) {
          for (const buffer of response) {
            const imageBase64 = await bufferToBase64(buffer.imageBuffer);
            allImages.push(imageBase64);
          }
        }

        setCarImages(allImages);
        setCurrentSlide(startIndex); // Reset current slide on new images
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error?.message,
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    }

    if (carInfo?.vin_number && open) {
      getCarInfo(carInfo.vin_number);
    }
  }, [carInfo, open, startIndex]);

  const bufferToBase64 = async (buffer) => {
    const bytes = new Uint8Array(buffer.data);
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  return (
    <Modal
      title="Car Details"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="responsive-modal"
      // bodyStyle={{ padding: 0 }}
    >
      <div className="hidden-scroll">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <ConfigProvider
              theme={{
                components: {
                  Carousel: {
                    arrowSize: 50,
                    arrowOffset: 2,
                    dotHeight: 10,
                    dotWidth: 10,
                    dotActiveWidth: 20,
                    dotGap: 6,
                  },
                },
              }}
            >
                <div style={{ position: 'relative' }}>
                  <div className="car-header">
  <h1 className="car-title">
    {carInfo?.year} <span className="make">{carInfo?.make}</span> <span className="model">{carInfo?.model}</span>
  </h1>
</div>

              <Carousel
  initialSlide={startIndex}
  afterChange={(index) => setCurrentSlide(index)}
  arrows
>
  {carImages
    .filter((base64) => base64 && base64.trim() !== "")
    .map((base64, index) => (
      <div key={index} className="carousel-slide">
        <img
          src={`data:image/jpeg;base64,${base64}`}
          alt={`Car image ${index + 1}`}
        
        />
      </div>
    ))}
</Carousel>

                {/* Image counter overlay */}
               <div className="image-counter"> {currentSlide + 1} / {carImages.length}</div>
              </div>
              </ConfigProvider>
                   <Descriptions
    column={1}
  
              >
            
  <Descriptions.Item style={{ padding: 16 }} >
  <h5 className="card__model" style={{ margin: 0 }}>
                    <div className="price-box">
                      <div className="price-label">Price :</div>
    {carInfo?.new_price ? (
      <>
        <span className="old-price">{carInfo?.price} CAD </span>
        <span className="new-price">{carInfo?.new_price} CAD + GST</span>
      </>
    ) : (
      <span className="new-price">{carInfo?.price} CAD + GST</span>
    )}
  </div>
</h5>

                 
                </Descriptions.Item>

                 </Descriptions>
              <div className="descriptions-section" style={{ padding: 16 }}>
              <Descriptions     column={{ xs: 1, sm: 1, md: 2 }} // ✅ Updated for responsiveness
    labelStyle={{ fontWeight: 600 }}>
                  <Descriptions.Item label="Make">{carInfo?.make || ''}</Descriptions.Item>
                <Descriptions.Item label="Model">{carInfo?.model || ''}</Descriptions.Item>
                <Descriptions.Item label="Body Type">{carInfo?.body_type || ''}</Descriptions.Item>
                <Descriptions.Item label="Trim">{carInfo?.trim || ''}</Descriptions.Item>
                <Descriptions.Item label="Transmission">{carInfo?.transmission || ''}</Descriptions.Item>
                <Descriptions.Item label="Condition">{carInfo?.condition || ''}</Descriptions.Item>
                <Descriptions.Item label="Year">{carInfo?.year || ''}</Descriptions.Item>
                <Descriptions.Item label="Kilometers">
                {carInfo?.mileage ? carInfo.mileage.toLocaleString() + ' KM' : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Fuel Type">{carInfo?.fuel_type || ''}</Descriptions.Item>
                <Descriptions.Item label="Engine">{carInfo?.engine || ''}</Descriptions.Item>
                <Descriptions.Item label="VIN">{carInfo?.vin_number || ''}</Descriptions.Item>
                <Descriptions.Item label="Exterior Color">{carInfo?.exterior_color || ''}</Descriptions.Item>
                <Descriptions.Item label="Interior Color">{carInfo?.interior_color || ''}</Descriptions.Item>
                <Descriptions.Item label="Stock Number">{carInfo?.stock_number || ''}</Descriptions.Item>
                </Descriptions>
              {carInfo?.carfax && (
  <div style={{ marginBottom: "1rem" }}>
    <a href={carInfo.carfax} target="_blank" rel="noopener noreferrer">
      <img
        src="/images/carfax.png"
        alt="View Carfax"
        className="carfax-image"
        style={{ cursor: "pointer" }}
      />
    </a>
  </div>
)}

                  <Descriptions
    column={1}
    title="Description"
    labelStyle={{ fontWeight: 600 }}
    contentStyle={{ color: 'rgba(0, 0, 0, 0.75)', fontStyle: 'italic' }}
    style={{ marginTop: 24 }}
  >
    <Descriptions.Item>
      {carInfo?.description || 'No description available.'}
    </Descriptions.Item>
  </Descriptions>
              </div>
              
             {carInfo?.features && carInfo.features.length > 0 && (
  <>
    <Carfeature features={carInfo.features} />
  </>
)}
          </>
        )}
     <FinanceCalculator carPrice={carInfo?.new_price ?? carInfo.price}/>
      <div style={{ padding: '26px', borderTop: '1px solid #f0f0f0' }}>
              <h3>Send Inquiry / Request</h3>
              <Form form={customerForm} layout="vertical" name="customerForm">
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="Your name" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    { required: true, message: 'Please enter your phone number' },
                    { pattern: /^\+?[\d\s\-]{7,15}$/, message: 'Please enter a valid phone number' },
                  ]}
                >
                  <Input placeholder="Your phone number" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email address' },
                  ]}
                >
                  <Input placeholder="Your email" />
                </Form.Item>
  <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please write your message" }]}
          >
            <TextArea rows={5} placeholder="Write your message here..." />
          </Form.Item>
                <Form.Item>
                  <Button type="primary" loading={btnLoading} onClick={handleSendToStore} block>
                    Send Request
                  </Button>
                </Form.Item>
              </Form>
        </div>
         </div>
    </Modal>
  );
}
