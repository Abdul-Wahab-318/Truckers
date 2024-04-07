import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-truckers-978b8.cloudfunctions.net/app",
  timeout: 5000,
  withCredentials : true
});

export default axiosInstance;
