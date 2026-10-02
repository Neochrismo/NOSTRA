import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAgreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSignup(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.termsAgreed) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    setError("");
    console.log(formData);
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-5 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Grid layout: 1 col on mobile, 2 cols on tablet/desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <label className="flex items-center gap-2 text-xs sm:text-sm cursor-pointer text-gray-700 select-none">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
            />
            Show Password
          </label>

          {error && <p className="text-red-500 text-xs sm:text-sm">{error}</p>}

          <label className="flex items-start gap-2 text-xs sm:text-sm cursor-pointer text-gray-600 select-none">
            <input
              type="checkbox"
              name="termsAgreed"
              checked={formData.termsAgreed}
              onChange={handleChange}
              required
              className="mt-0.5 h-4 w-4 shrink-0 rounded text-green-600 focus:ring-green-500"
            />
            <span>I agree to the Terms & Conditions and Privacy Policy.</span>
          </label>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold cursor-pointer text-sm sm:text-base shadow-sm hover:shadow active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;