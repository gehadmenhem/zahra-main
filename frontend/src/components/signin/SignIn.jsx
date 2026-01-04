import { Button, Col, Form, Input, message, Progress, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../store/authSlice';
import { register } from './services';
import './signin.css';
const { Password } = Input;

function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpForm] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.parent_id}`);
    }
  }, [isAuthenticated, user, navigate]);

  const togglePanel = () => {
    setIsSignUp(!isSignUp);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const onFinishSignIn = async (values) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();
      message.success('Sign In successful!');

      navigate('/dashboard');
    } catch (error) {
      message.error(error?.message || 'Sign In failed');
    }
  };

  const onFinishSignUp = async (values) => {
    try {
      const signUpResult = await register(values); // axios sends JSON by default
      if (signUpResult) {
        message.success('Sign Up successful!');
        signUpForm.resetFields(); // Reset the form fields after successful signup
      } else {
        message.error('Sign Up failed');
      }
    } catch (error) {
      message.error(error.message || 'Sign Up failed');
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
          form={signUpForm}
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
            rules={[
              { required: true, message: 'Please input your firstname!' },
            ]}
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
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input placeholder="(403)-999-3711" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Name"
            name="emergency_contact_name"
            rules={[
              {
                required: true,
                message: 'Please input your emergency contact name!',
              },
            ]}
          >
            <Input placeholder="Emergency Contact Name" />
          </Form.Item>
          <Form.Item
            label="Emergency Contact Phone"
            name="emergency_contact_phone"
            rules={[
              {
                required: true,
                message: 'Please input your emergency contact phone!',
              },
            ]}
          >
            <Input placeholder="(403)-999-3711" />
          </Form.Item>
          <Form.Item label="Address">
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  name="province"
                  rules={[
                    { required: true, message: 'Please input your province!' },
                  ]}
                  noStyle
                >
                  <Input placeholder="Province" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="city"
                  rules={[
                    { required: true, message: 'Please input your city!' },
                  ]}
                  noStyle
                >
                  <Input placeholder="City" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="postal_code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your postal code!',
                    },
                  ]}
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
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                min: 8,
                message: 'Password must be at least 8 characters long!',
              },
              {
                pattern: /(?=.*[0-9])/,
                message: 'Password must contain at least one number!',
              },
              {
                pattern: /(?=.*[^A-Za-z0-9])/,
                message:
                  'Password must contain at least one special character!',
              },
            ]}
          >
            <Password placeholder="Password" onChange={handlePasswordChange} />
          </Form.Item>
          {passwordStrength > 0 && (
            <div className="password-strength-container">
              <Progress
                percent={passwordStrength}
                showInfo={false}
                strokeColor={
                  passwordStrength < 25
                    ? '#ff4d4f'
                    : passwordStrength < 50
                    ? '#faad14'
                    : passwordStrength < 75
                    ? '#52c41a'
                    : '#1890ff'
                }
              />
              <div className="password-strength-text">
                Password Strength:{' '}
                {passwordStrength < 25
                  ? 'Weak'
                  : passwordStrength < 50
                  ? 'Fair'
                  : passwordStrength < 75
                  ? 'Good'
                  : 'Strong'}
              </div>
            </div>
          )}
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
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>
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
