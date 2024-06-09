import axios from "axios";

const authInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authInstance.interceptors.request.use(
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

const auth = async (method, url, data = null) => {
  const config = {
    method: method,
    url: url,
    data: data,
  };
  try {
    const response = await authInstance(config);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export default auth;
