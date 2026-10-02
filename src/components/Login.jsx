import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

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

    const mockUser = {
      id: 101,
      name: "Alex Johnson",
      email: loginData.email,
    };
    const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    login(mockUser, mockToken);
    navigate("/");
  }

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email);
  const isPasswordValid = loginData.password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl text-gray-900">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 select-none">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
              />
              Show Password
            </label>

            <Link
              to="/forgot-password"
              className="text-green-600 hover:underline font-medium text-left sm:text-right"
            >
              Forgot Password?
            </Link>
          </div>

          <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer text-gray-700 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
            />
            Remember Me
          </label>

          {error && <p className="text-xs sm:text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm sm:text-base shadow-sm hover:shadow active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-xs sm:text-sm text-gray-600">
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