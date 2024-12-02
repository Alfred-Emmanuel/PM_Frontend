import { Endpoints } from "../config/endpoints";
import { ILoginForm, IRegisterForm } from "../config/interfaces";
import { authEndPoint } from "./api";
import { showToastError, showToastSuccess } from "../utils/toastMessages";

export function HandleLogin(
  event: React.FormEvent<HTMLFormElement>,
  data: ILoginForm,
  setUser: React.Dispatch<React.SetStateAction<any>>,
  setTokens: React.Dispatch<React.SetStateAction<any>>,
  navigate: (path: string) => void,
  setLoading: React.Dispatch<React.SetStateAction<any>>
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

  authEndPoint
    .post(login, payload)
    .then((res) => {
      // Assuming the response structure is as mentioned
      const userData = res.data.data.user;
      const tokens = res.data.data.tokens;

      // Set user data and tokens in context

      setUser(userData);
      setTokens(tokens);
      setLoading(false);
      navigate("/dashboard");
    })
    .catch((error) => {
      if (error.response) {
        // Backend returned an error
        // console.log(authEndPoint.bas)
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status:", error.response.status);
        console.error("Error Headers:", error.response.headers);
        showToastError(
          error.response?.data?.message || "Failed to log in. Please try again"
        );
        setLoading(false);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        showToastError("No response from the server. Please try again.");
        setLoading(false);
      } else {
        // Something else happened while setting up the request
        console.error("Error Message:", error.message);
        showToastError("An error occurred. Please try again.");
        setLoading(false);
      }
    });
}

export function HandleRegister(
  data: IRegisterForm,
  setLoading: React.Dispatch<React.SetStateAction<any>>
) {
  const { firstName, lastName, email, password } = data;
  const { register } = Endpoints;
  const payload = {
    input: {
      firstName,
      lastName,
      email,
      password,
    },
  };

  authEndPoint
    .post(register, payload)
    .then((res) => {
      setLoading(false);

      showToastSuccess("Registration successful, proceed to logging in");
    })
    .catch((error) => {
      setLoading(false);
      showToastError(
        error.response?.data?.message ||
          "Failed to sing up. Please try again later"
      );
    });
}
