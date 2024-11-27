import { Endpoints } from "../config/endpoints";
import { ILoginForm } from "../config/interfaces";
import { authApi } from "./api";

export function HandleLogin(
  event: React.FormEvent<HTMLFormElement>,
  data: ILoginForm
) {
  event.preventDefault();
  const { email, password } = data;
  const { login } = Endpoints;
  const payload = {
    input: {
      email,
      password,
    },
  };

  authApi
    .post(login, payload)
    .then((res) => console.log(res))
    .catch((error) => {
      if (error.response) {
        // Backend returned an error
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error Message:", error.message);
      }
    });
}
