import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://cloud.appwrite.io/v1/databases/65bea692defb4ac174b5/collections/65ca909e17dbfeda3482/documents",
  headers: {
    "X-Appwrite-Project": "65132bbcaa49f6f7a7d0", // پروژه ID صحیح خود را استفاده کنید
  },
});

axiosInstance.interceptors.request.use();
