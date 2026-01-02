import axios from "axios";
import config from "../../config.js"
import axiosInstance from '../../api/axiosCookies.js';
export const register = async (data) => {
  try {
    const apiUrl = config.apiUrl;

    const result = await axios.post(`${apiUrl}/register`, data);
    // Axios automatically sends JSON

    return result.data;
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error.message ||
      "Registration failed";

    console.error("Register error:", message);
    throw new Error(message);
  }
};


