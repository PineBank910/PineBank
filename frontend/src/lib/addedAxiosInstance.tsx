import axios from "axios";
export const axiosInstance = axios.create({ baseURL: "https://pinebank.onrender.com" });
// http://localhost:8000 when testing
