import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://pinebank.onrender"});
// http://localhost:8000 when testing
// https://pinebank.onrender.com when deployed
