import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { checkAuth } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import './login.css';
import apiCalls from '../../api/apiCalls';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 Toggle state
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    try {
      const response = await apiCalls.userLogin({ email, password });
      const loggedInUser = response?.data; // backend returns the (password-stripped) user
      dispatch(checkAuth());
      notification.success({
        message: "Success",
        description: "Login successful",
        duration: 3,
      });
      navigate(`/dashboard/${loggedInUser?.parent_id}`);
    } catch (error) {
      notification.error({
        message: "Error",
        description: error?.message,
        duration: 5,
      });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      
      <div className="password-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(prev => !prev)}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </span>
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
