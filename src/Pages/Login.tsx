import { useState } from "react";
// import { Link } from "react-router-dom";
import { ILoginForm } from "../config/interfaces";
import { HandleLogin } from "../api/actions";
import { InputField } from "../components/Input";

function Login() {
  const [formData, setFormData] = useState<ILoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    HandleLogin(event, formData);
  };

  return (
    <div className=" relative z-10 h-[80%] w-1/3 flex py-8 items-center flex-col bg-primary rounded-lg text-center shadow-lg">
      {/* Heading */}
      <h1 className="text-secondary text-lg md:text-2xl font-semibold">
        Agent Login
      </h1>
      <p className="text-secondary text-sm md:text-base my-4 md:mx-24">
        Hey, Enter your details to sign in to your account
      </p>

      {/* Form */}
      <form
        className="w-full px-12 mt-6 flex flex-col gap-4"
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
          className="bg-teal-400 text-black font-medium py-3 rounded-lg cursor-pointer hover:bg-teal-600 transition"
        >
          Sign in
        </button>
      </form>

      {/* Social Sign-In */}
      <div className="mt-6 w-full px-6">
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
      </div>

      {/* Request Account */}
      <p className="mt-4 text-sm text-gray-500">
        Don’t have an account?{" "}
        <a href="#" className="text-secondary hover:underline">
          Request Now
        </a>
      </p>
    </div>
  );
}

export default Login;
