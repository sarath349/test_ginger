import axios from 'axios';
const API_BASE_URL = 'https://mypillsreminder.com/v1/api';
let authToken = '';
export const setAuthToken = token => {
  authToken = token;
};

const createFormData = data => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

export const login = async (email, password) => {
  const data = {
    email: email,
    password: password,
    fcm_token:
      'dKgA3sBSSi-_xlhCMGE9ho:APA91bFiT8NNk8UGSYMvH17xm5UaVqN1X5BzvHbFz06cU1p9MTWeYD0GTmv7lgGBUlC7DpD-WybxNdRSYsyVsk_4y7LV-0EzSVuFdcHMqyG6_OboG416NlYBAzHCtvb8tU-SybAd8IuD',
    zone: 'Asia/Kolkata',
  };

  const formData = createFormData(data);

  try {
    const response = await axios.post(`${API_BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const token = response.data.data.token;
    setAuthToken(token);

    console.log('Login API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const fetchMedicines = async selectedDate => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/dashboard`,
      {
        selected_date: selectedDate,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      },
    );

    console.log('Fetch Medicines API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};
