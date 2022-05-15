import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_API_URL,
  mode: "cors",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Origin": process.env.VUE_APP_FRONTEND_URL,
    "Access-Control-Allow-Credentials": true,
  },
});

export default instance;
