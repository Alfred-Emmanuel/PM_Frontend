import axios from "axios";

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/v1/auth",
});

