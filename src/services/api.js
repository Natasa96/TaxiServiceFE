import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = async (method, url, data = null) => {
  const config = {
    method: method,
    url: url,
    data: data,
  };

  return await apiInstance(config);
};

export default api;
