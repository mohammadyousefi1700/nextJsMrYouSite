import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}` || "http://localhost:3000",
  headers: {
    "X-Appwrite-Project": process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  return config;
});

export default axiosInstance;
