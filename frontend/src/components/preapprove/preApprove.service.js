import axiosInstance from '../../api/axiosCookies.js';

export const registerChildren = async (data, fileList) => {
  try {
    const formData = new FormData();

    // Append all fields
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    }

    // Append the file separately (must match multer.single('profile_image'))
    // Assume data.profile_image is a File object from input
    if (fileList) {
      formData.append('profile_image', fileList);
    }
    console.log(formData);
    const result = await axiosInstance.post('/registerChildren', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  } catch (error) {
    const message =
      error?.response?.data?.error || error.message || 'Registration failed';
    throw new Error(message);
  }
};
