import { Endpoints } from "../config/endpoints";
import { ILoginForm, IRegisterForm } from "../config/interfaces";
import { showToastError, showToastSuccess } from "../utils/toastMessages";

import { apiPost } from "../utils/requests";

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

  // Use apiPost for the request
  setLoading(true);
  apiPost<any>(login, payload)
    .then((res) => {
      const userData = res.data.user; // Assuming the response structure
      const tokens = res.data.tokens;

      // Update context state with user data and tokens
      setUser(userData);
      setTokens(tokens);
      setLoading(false);
      navigate("/dashboard");
    })
    .catch((error) => {
      showToastError(error.message || "Failed to log in. Please try again.");
      setLoading(false);
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

  apiPost<any>(register, payload)
    .then((res) => {
      setLoading(false);
      showToastSuccess("Registration successful, proceed to logging in");
    })
    .catch((error) => {
      showToastError(error.message || "Failed to sign up. Please try again");
    });
}
