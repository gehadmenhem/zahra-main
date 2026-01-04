import axiosInstance from '../../api/axiosCookies.js';

export const getChildrens = async () => {
  try {
    const result = await axiosInstance.get('/children', {
      withCredentials: true, // ✅ sends HTTP-only cookie automatically
    });

    return result.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      'Failed to fetch children';
    throw new Error(message);
  }
};
