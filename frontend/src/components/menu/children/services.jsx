import axiosInstance from '../../../api/axiosCookies.js';

export const getChildrens = async (parent_id) => {
  try {
    console.log('Fetching children for parent:', parent_id);

    const result = await axiosInstance.get(`/children`, {
      params: { parent_id }, // ✅ send as query parameter
      withCredentials: true, // ✅ send cookie
    });

    return result.data; // ✅ return only the data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      'Failed to fetch children';
    throw new Error(message);
  }
};
export const updateChild = async (parent_id) => {
  try {
    console.log('Fetching children for parent:', parent_id);

    const result = await axiosInstance.get(`/children`, {
      params: { parent_id }, // ✅ send as query parameter
      withCredentials: true, // ✅ send cookie
    });

    return result.data; // ✅ return only the data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      'Failed to fetch children';
    throw new Error(message);
  }
};
export const addChild = async (parent_id) => {
  try {
    console.log('Fetching children for parent:', parent_id);

    const result = await axiosInstance.get(`/children`, {
      params: { parent_id }, // ✅ send as query parameter
      withCredentials: true, // ✅ send cookie
    });

    return result.data; // ✅ return only the data
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      'Failed to fetch children';
    throw new Error(message);
  }
};
