import { Endpoints } from "../config/endpoints";
import { ILoginForm } from "../config/interfaces";
import { authApi } from "./api";
import { useNavigate } from "react-router-dom";
// import { IUser } from "../config/interfaces";

export function HandleLogin(
  event: React.FormEvent<HTMLFormElement>,
  data: ILoginForm,
  setUser: React.Dispatch<React.SetStateAction<any>>,
  setTokens: React.Dispatch<React.SetStateAction<any>>,
  navigate: (path: string) => void
) {
  event.preventDefault();
  const { email, password } = data;
  // const navigate = useNavigate();
  const { login } = Endpoints;
  const payload = {
    input: {
      email,
      password,
    },
  };

  authApi
    .post(login, payload)
    .then((res) => {
      // Assuming the response structure is as mentioned
      const userData = res.data.data.user;
      const tokens = res.data.data.tokens;

      // Set user data and tokens in context
      setUser(userData);
      setTokens(tokens);

      navigate("/dashboard");
    })
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
