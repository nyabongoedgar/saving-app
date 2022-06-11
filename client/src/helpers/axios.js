import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response
      && error.response.config.url !== '/api/v1/users/authenticate'
      && error.response.status === 401
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh');
      const loginUrl = '/login';
      if (window.location.href !== loginUrl) {
        window.location.href = loginUrl;
        return;
      }
    }
    // eslint-disable-next-line consistent-return
    return Promise.reject(error);
  },
);

export default axiosInstance;
