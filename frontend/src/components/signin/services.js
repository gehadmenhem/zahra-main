import axios from "axios";
import config from "../../config.js"
import axiosInstance from '../../api/axiosCookies.js';
export const register = async (data) => {
  try {
    const apiUrl = config.apiUrl;

    const result = await axios.post(`${apiUrl}/auth/register`, data);
    // Axios automatically sends JSON

    return result.data;
  } catch (error) {
    const message =
      error?.response?.data?.error ||
      error.message ||
      "Registration failed";

  
    throw new Error(message);
  }
};

export const login = async (loginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      loginData
    });

    // Backend sets cookie automatically, response contains user info
    return response.data; // { message, user: { id, email_address, role } }
  } catch (error) {
      console.log(error)
    // Extract message safely
    const message =
      error?.response?.data?.error || error.message || "Login failed";
    throw new Error(message);
  }
};

