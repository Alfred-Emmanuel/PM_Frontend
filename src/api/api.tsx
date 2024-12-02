import axios from "axios";
import { config } from "../config/config";

export const authEndPoint = axios.create({
  baseURL: config.api.base_url + config.api.auth,
});

export const boardEndpoint = axios.create({
  baseURL: config.api.base_url + config.api.protected + config.endpoints.kanban_board.base_url,
});

// authEndPoint.interceptors.request.use(
//   (request) => {
//     console.log(`Request URL: ${request.baseURL}${request.url}`);
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
