import React,{useEffect} from "react";
import api from "../../api/apiCalls";
import { Form, Input, Button,notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./contactus.css";
const { TextArea } = Input;

export default function ContactUs() {
  const [form] = Form.useForm();
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

const onFinish = () => {
  form.validateFields()
    .then(async (values) => {
      try {
        // Make POST request to backend
        const response = await api.sendEmail(values)
        // Show success notification
        if (response) {
          console.log(response)
          notification.success({
          message: 'Success',
          description: response?.data +"  please check your email" || "email has bee sent successfully please check your email",
          duration: 3,
        });

        // Optionally reset the form
        form.resetFields();

        }
       
      } catch (error) {
        console.log(error)
        // Handle server error
        notification.error({
          message: 'Error',
          description: error.response?.data?.message || error?.message,
          duration: 5,
        });
      }
    })
    .catch(() => {
      // Form validation failed
      notification.info({
        message: 'Info',
        description: 'Please fill in all required fields.',
        duration: 5,
      });
    });
};


  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-content">
        {/* AntD Contact Form */}
        <Form
          form={form}
          name="contact-form"
          layout="vertical"
          onFinish={onFinish}
          className="contact-form"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email address" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                pattern: /^[0-9\-()+\s]*$/,
                message: "Phone number can only contain digits and symbols",
              },
            ]}
          >
            <Input placeholder="(123) 456-7890" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please write your message" }]}
          >
            <TextArea rows={5} placeholder="Write your message here..." />
          </Form.Item>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
       
        </Form>

        {/* Contact info & map */}
        <aside className="contact-info">
          <div className="info-item">
            <FontAwesomeIcon icon={faPhone} />
           <p style={{ margin: 0 ,color:"black"}}>
    Call Us: <a href="tel:4034001224" style={{color:"black"}}>(403)400-1224</a>
  </p>

          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} />
             <p style={{ margin: 0 }}>
    Email Us: <a href="mailto:a2zautocalgary@gmail.com" style={{color:"black"}}>a2zautocalgary@gmail.com</a>
  </p>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {/* <p>
              <strong>Address:</strong> 4142 16 St SE, Calgary, AB T2G 3S1
            </p> */}

            <p style={{ margin: 0 }}>
    Visit Us:{" "}
     <a
        href="https://www.google.com/maps?q=4142+16+St+SE,+Calgary,+AB+T2G+3S1"
        target="_blank"
        rel="noopener noreferrer"
      style={{color:"black"}}>
        4142 16 St SE, Calgary, AB T2G 3S1
      </a>
  </p>
          </div>

          <img
            src="/images/map.png"
            alt="Map showing location"
            className="map-image"
            style={{ height: 400 }}
          />
        </aside>
      </div>
    </div>
  );
}
