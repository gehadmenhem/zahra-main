import axiosInstance from '../../api/axiosCookies.js';

export const registerChildren = async (data, fileList) => {
  try {
    const formData = new FormData();
    console.log('RAW DATA:', data);

    for (const key in data) {
      if (
        key !== 'profile_image' &&
        data[key] !== undefined &&
        data[key] !== null
      ) {
        // ✅ stringify objects & arrays
        if (typeof data[key] === 'object') {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      }
    }

    // Append the file (must match multer.single('profile_image'))
    if (fileList && fileList.length > 0) {
      formData.append('profile_image', fileList[0].originFileObj);
    }

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
