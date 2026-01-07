import axiosInstance from '../../api/axiosCookies.js';

export const registerChildren = async (data, fileList) => {
  try {
    console.log(fileList);
    const formData = new FormData();

    // Append all fields except profile_image
    for (const key in data) {
      if (
        key !== 'profile_image' &&
        data[key] !== undefined &&
        data[key] !== null
      ) {
        formData.append(key, data[key]);
      }
    }

    // Append the file (must match multer.single('profile_image'))
    if (fileList && fileList.length > 0) {
      formData.append('profile_image', fileList[0].originFileObj);
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
