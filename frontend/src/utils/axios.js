import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const baseURL = import.meta.env.API_URL;

const apiInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/api',
  timeout: 0
});

apiInstance.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
});

export default apiInstance