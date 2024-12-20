import { useState } from "react";
import { Link } from "react-router-dom";
import { ILoginForm } from "./config/interfaces";
import { HandleLogin } from "./api/authActions";
import { InputField } from "./components/Input";
import { useUserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setTokens } = useUserContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    HandleLogin(event, formData, setUser, setTokens, navigate, setLoading);
    // console.log(user)
  };

  return (
    <div className=" relative z-10 h-[80%] w-[85%] md:w-1/3 flex py-8 items-center flex-col bg-primary rounded-lg text-center shadow-lg">
      {/* Heading */}
      <h1 className="text-secondary text-lg text-xl md:text-2xl font-semibold">
        Agent Login
      </h1>
      <p className="text-secondary text-sm md:text-base my-4 md:mx-24">
        Hey, Enter your details to sign in to your account
      </p>

      {/* Form */}
      <form
        className="w-full px-4 md:px-12 mt-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        {/* Email */}
        <InputField
          label="Enter Email "
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          type="text"
        />
        {/* Password */}
        <InputField
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          type="password"
        />

        {/* Trouble logging in */}
        <a
          href="#"
          className="text-sm text-gray-500 hover:text-secondary self-end"
        >
          Having trouble signing in?
        </a>

        {/* Sign In Button */}
        <button
          type="submit"
          className={`bg-teal-400 text-black font-medium py-3 rounded-lg cursor-pointer hover:bg-teal-600 transition flex justify-center items-center ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-black mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Social Sign-In */}
      {/* <div className="mt-6 w-full px-6">
        <p className="text-gray-500 text-sm">Or Sign in with</p>
        <div className="flex justify-center mt-4 gap-4">
          <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg">
            <img src="/google-icon.svg" alt="Google" className="h-6" />
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg">
            <img src="/apple-icon.svg" alt="Apple" className="h-6" />
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg">
            <img src="/facebook-icon.svg" alt="Facebook" className="h-6" />
          </button>
        </div>
      </div> */}

      {/* Request Account */}
      <p className="mt-4 text-sm text-gray-500">
        Don’t have an account?{" "}
        <Link to={"/sign_up"} className="text-secondary hover:underline">
          Create One
        </Link>
      </p>
    </div>
  );
}

export default Login;
