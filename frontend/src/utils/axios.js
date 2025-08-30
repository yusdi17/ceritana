import axios from "axios";

const baseURL = import.meta.env.API_URL;

const apiInstance = axios.create({
  baseURL : 'http://127.0.0.1:8000/api',
  timeout: 0
})

export default apiInstance