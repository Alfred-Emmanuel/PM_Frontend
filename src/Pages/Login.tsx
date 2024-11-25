import React from "react";

function Login() {
  return (
    <div className="h-[80%] w-1/3 flex py-8 items-center flex-col bg-primary rounded-lg text-center shadow-lg">
      {/* Heading */}
      <h1 className="text-secondary text-lg md:text-2xl font-semibold">
        Agent Login
      </h1>
      <p className="text-secondary text-sm md:text-base my-4 md:mx-24">
        Hey, Enter your details to sign in to your account
      </p>

      {/* Form */}
      <form className="w-full px-12 mt-6 flex flex-col gap-4">
        {/* Email / Phone Number */}
        <div className="relative">
          <input
            type="text"
            placeholder="Enter Email / Phone No"
            className="w-full px-4 py-3 border rounded-lg bg-tertiary focus:outline-none focus:ring-secondary focus:bg-tertiary text-white"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <i className="fas fa-envelope" />
          </span>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg bg-tertiary focus:outline-none focus:ring-secondary focus:bg-tertiary text-white"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            Hide
          </span>
        </div>

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
