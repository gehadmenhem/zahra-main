import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import './signin.css';

const { Password } = Input;

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const onFinishSignIn = (values) => {
    console.log('Sign In values:', values);
    message.success('Sign In successful!');
  };

  const onFinishSignUp = (values) => {
    console.log('Sign Up values:', values);
    message.success('Sign Up successful!');
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
            name="firstname"
            rules={[{ required: true, message: 'Please input your firstname!' }]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[{ required: true, message: 'Please input your lastname!' }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact"
            name="emergencyContact"
            rules={[{ required: true, message: 'Please input your emergency contact!' }]}
          >
            <Input placeholder="Emergency Contact (Name and Phone)" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input placeholder="Address" />
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
            name="email"
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
