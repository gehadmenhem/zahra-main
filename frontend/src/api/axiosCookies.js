import axios from 'axios';
import config from '../config';

const instance = axios.create({
  baseURL: `${config.apiUrl}`,
  // baseURL: `${config.apiUrl}/auth/loginuser`,
  withCredentials: true // 💡 ensures cookies are sent/stored
});

export default instance;
