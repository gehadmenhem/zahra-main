import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import './signin.css';
import {register,login} from "./services"
const { Password } = Input;

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const onFinishSignIn = async(values) => {
    try {
      console.log('Sign In values:', values);
      const signInResult = await login(values)
      
    message.success(signInResult || 'Sign In successful!');
    } catch (error) {
        message.error(error.message || "Sign In failed");
    }
   
  };

 const onFinishSignUp = async (values) => {
  try {
    console.log("Sign Up values:", values);

    await register(values); // axios sends JSON by default

    message.success("Sign Up successful!");
  } catch (error) {
    message.error(error.message || "Sign Up failed");
  }
};


  return (
    <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className="form-container sign-up-container">
        <Form
          name="sign-up"
          className="form"
          onFinish={onFinishSignUp}
          layout="vertical"
        >
          <h1 className="form-title">Create Account</h1>
          {/* <p className="form-subtitle">Use your email for registration</p>
          <div className="social-container">
            <Button shape="circle" icon={<span>f</span>} />
            <Button shape="circle" icon={<span>G</span>} />
            <Button shape="circle" icon={<span>l</span>} />
          </div>
          <span>or use your email for registration</span> */}
          <Form.Item
            label="Firstname"
            name="first_name"
            rules={[{ required: true, message: 'Please input your firstname!' }]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="last_name"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email_address"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="(403)-999-3711" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Name"
            name="emergency_contact_name"
            rules={[{ required: true, message: 'Please input your emergency contact name!' }]}
          >
            <Input placeholder="Emergency Contact Name" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Phone"
            name="emergency_contact_phone"
            rules={[{ required: true, message: 'Please input your emergency contact phone!' }]}
          >
            <Input placeholder="(403)-999-3711" />
          </Form.Item>
          <Form.Item label="Address">
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  name="province"
                  rules={[{ required: true, message: 'Please input your province!' }]}
                  noStyle
                >
                  <Input placeholder="Province" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: 'Please input your city!' }]}
                  noStyle
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="postal_code"
                  rules={[{ required: true, message: 'Please input your postal code!' }]}
                  noStyle
                >
                  <Input placeholder="Postal Code" />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="ant-btn">
            Sign Up
          </Button>
          <button className="mobile-signin-btn" onClick={togglePanel}>
            Already have an account? Sign In
          </button>
        </Form>
      </div>
      <div className="form-container sign-in-container">
        <Form
          name="sign-in"
          className="form"
          onFinish={onFinishSignIn}
          layout="vertical"
        >
          <h1 className="form-title">Sign in</h1>
          {/* <p className="form-subtitle">Use your account</p>
          <div className="social-container">
            <Button shape="circle" icon={<span>f</span>} />
            <Button shape="circle" icon={<span>G</span>} />
            <Button shape="circle" icon={<span>l</span>} />
          </div>
          <span>or use your account</span> */}
          <Form.Item
            label="Email"
            name="email_address"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Password placeholder="Password" />
          </Form.Item>
          <a href="#" className="forgot-password">Forgot your password?</a>
          <Button type="primary" htmlType="submit" className="ant-btn">
            Sign In
          </Button>
          <button className="mobile-signup-btn" onClick={togglePanel}>
            Don't have an account? Sign Up
          </button>
        </Form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1 className="overlay-title">Welcome Back!</h1>
            <p className="overlay-description">
              To keep connected with us please login with your personal info
            </p>
            <Button ghost className="ant-btn ghost" onClick={togglePanel}>
              Sign In
            </Button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1 className="overlay-title">Hello, Friend!</h1>
            <p className="overlay-description">
              Enter your personal details and start journey with us
            </p>
            <Button ghost className="ant-btn ghost" onClick={togglePanel}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
