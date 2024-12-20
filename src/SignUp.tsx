import { useState } from "react";
import { IRegisterForm } from "./config/interfaces";
import { InputField } from "./components/Input";
import { Link } from "react-router-dom";
import { HandleRegister } from "./api/authActions";
// import use

function SignUp() {
  const [formData, setFormData] = useState<IRegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState<IRegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: IRegisterForm = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };

    // Check for empty fields
    let hasError = false;
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        hasError = true;
        errors[key as keyof IRegisterForm] = "This field is required.";
      }
    });

    // Update error state
    setFormErrors(errors);

    if (hasError) return;
    setLoading(true);
    HandleRegister(formData, setLoading);
  };
  return (
    <div className="relative h-screen flex items-center justify-center bg-main_bg">
      <div className="absolute inset-0">
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl top-20 -left-10"></div>
        <div className="absolute w-[250px] h-[250px] bg-teal-400 rounded-full opacity-50 blur-3xl bottom-20 right-20"></div>
      </div>
      <div className=" relative z-10 md:h-[80%] w-[85%]  md:w-1/3 flex py-8 items-center flex-col bg-primary rounded-lg text-center shadow-lg">
        {/* Heading */}
        <h1 className="text-secondary text-xl md:text-2xl font-semibold">
          Register
        </h1>
        <p className="text-secondary text-sm md:text-base my-4 md:mx-24">
          Hey, Enter your details to create an account
        </p>

        {/* Form */}
        <form
          className="w-full px-4 md:px-12 mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Enter your first name "
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            type="text"
            error={formErrors.firstName}
          />
          <InputField
            label="Enter your last name "
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            type="text"
            error={formErrors.lastName}
          />
          <InputField
            label="Enter Email "
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            type="email"
            error={formErrors.email}
          />
          <InputField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            error={formErrors.password}
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
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        {/* Social Sign-In */}
        <div className="mt-6 w-full px-6 pb-5">
          <Link to={"/"} className="text-white text-sm">
            Or Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
