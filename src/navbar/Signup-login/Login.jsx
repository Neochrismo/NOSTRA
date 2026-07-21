import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!loginData.email || !loginData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log(loginData);

    navigate("/home");
  }
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email);
const isPasswordValid = loginData.password.length >= 6;
const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">

        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 p-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          {/* Mobile-friendly options */}
          <div className="flex items-center gap-3 sm:items-center sm:justify-between flex-wrap">

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-green-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;