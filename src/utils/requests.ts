import axios, { AxiosRequestConfig } from "axios";

// Generic API request function
export const apiPost = async <T>(
  url: string,
  data: any,
  token?: string
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    const response = await axios.post<T>(url, data, config);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Request failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "An error occurred");
    }
  }
};

export const apiGet = async <T>(url: string, token?: string) => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };

    const response = await axios.get<T>(url, config);
    console.log("API Response:", response);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
