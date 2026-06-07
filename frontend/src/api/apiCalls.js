import axios from "axios";
import config from "../config.js";
import axiosInstance from '../api/axiosCookies.js';
const register = async (data) => {
  try {
    const apiUrl = config.apiUrl;
 
    const result = await axios.post(`${apiUrl}/register`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (result?.status === 200) {
      return result.data;
    } else {
      throw new Error("Something went wrong with the registration.");
    }
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "Registration failed";
    console.error("Register error:", message);
    throw new Error(message);
  }
};


const getAllinventory = async () => {
  try {
    const apiUrl = config.apiUrl;

    const result = await axios.get(`${apiUrl}/inventory`);

    if (result?.status === 200) {
      return result.data || [];
    } else {
      throw new Error("something went wrong while getting the inventory");
    }
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "getting Inventory failed";
    console.error("gettin Inventory error:", message);
    throw new Error(message);
  }
};

const getAllReviews = async () => {
  try {
    const apiUrl = config.apiUrl;

    const result = await axios.get(`${apiUrl}/reviews`);

    if (result?.status === 200) {
      return result.data || [];
    } else {
      throw new Error("something went wrong while getting the reviews");
    }
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "getting reviews failed";
    console.error("gettin reviews error:", message);
    throw new Error(message);
  }
};

const getinventoryImages = async (vin_number) => {
  try {
    const apiUrl = config.apiUrl;
    const result = await axios.post(`${apiUrl}/inventoryImages`,{vin_number:vin_number});

    if (result?.status === 200) {
      return result.data || [];
    } else {
      throw new Error("something went wrong while getting the inventory");
    }
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "getting Inventory failed";
    console.error("gettin Inventory error:", message);
    throw new Error(message);
  }
};


const sendEmail = async (emailData) => {
  try {
    const apiUrl = config.apiUrl;
    const message = await axios.post(`${apiUrl}/sendEmail`, { emailData });
    if (message) {
      return message 
    }
    else {
       throw new Error('something went wrong while sending email please check all the required field and try agaian');

    }
    
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "sending email failed failed";
    console.error("sending email error:", message);
    throw new Error(message);
  }
};

const userLogin = async (userData) => {
  try {
    const apiUrl = config.apiUrl;
    // Backend route is POST /auth/login and reads req.body.loginData
    // with { email_address, password } (see backend/routes/authServices.js).
    const message = await axiosInstance.post(`${apiUrl}/auth/login`, {
      loginData: {
        email_address: userData?.email,
        password: userData?.password,
      },
    });
    if (message) {
      return message
    }
    else {
       throw new Error('something went wrong while login');

    }

  } catch (error) {

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "user login failed";
    console.error("user login failed:", message);
    throw new Error(message);
  }
};


const checkifValidCookies = async (userData) => {
  try {
    const apiUrl = config.apiUrl;
    const message = await axiosInstance.get(`${apiUrl}/auth/me`);
    if (message) {
      return message 
    }
    else {
       throw new Error('something went wrong while login');

    }
    
  } catch (error) {

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "user login failed";
    console.error("user login failed:", message);
    throw new Error(message);
  }
};


const sendInquiry = async (emailData) => {
  try {
    const apiUrl = config.apiUrl;
    const message = await axios.post(`${apiUrl}/sendinquiry`, { emailData });
    if (message) {
      return message 
    }
    else {
       throw new Error('something went wrong while sending email please check all the required field and try agaian');

    }
    
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || "sending email failed failed";
    console.error("sending email error:", message);
    throw new Error(message);
  }
};




export default { register,getAllinventory,getinventoryImages,sendEmail,userLogin ,checkifValidCookies,sendInquiry,getAllReviews};
