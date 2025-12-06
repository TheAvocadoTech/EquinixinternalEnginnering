import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const INITIAL_LOGIN_OBJ = { password: "", emailId: "" };
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitForm = (e) => {
    // If called from onClick, e is the click event; from form submit it would be submit event.
    if (e && e.preventDefault) e.preventDefault();

    setErrorMessage("");
    if (loginObj.emailId.trim() === "") {
      return setErrorMessage("Email Id is required!");
    }
    if (loginObj.password.trim() === "") {
      return setErrorMessage("Password is required!");
    }

    setLoading(true);
    // Example: set token in localStorage (uncomment in real app)
    // localStorage.setItem("token", "DummyTokenHere");

    // Your navigate call — call the function returned from useNavigate.
    setLoading(false);
    navigate("/app/dashboard");
  };

  const updateFormValue = (field, value) => {
    setErrorMessage("");
    setLoginObj((prev) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") submitForm(e);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div
        className="
          w-full h-96 md:h-64 lg:h-screen
          lg:w-[70%]
          flex-shrink-0
          overflow-hidden
          flex items-center justify-center
        "
        aria-hidden="true"
      >
        <img
          src="/logo.svg"
          alt="Decorative preview"
          className="w-auto h-80 mt-2 md:h-48 object-contain lg:hidden"
        />
        <img
          src="/login.jpg"
          alt="Decorative preview"
          className="hidden lg:block w-full h-full object-cover"
        />
      </div>

      <div
        className="
          w-full lg:w-[30%]
          flex items-center justify-center
          p-6 md:p-10
          bg-white
          lg:h-screen lg:overflow-hidden
        "
      >
        <div className="w-full max-w-md mt-16">
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <div className="w-1 h-6 bg-red-500 rounded-sm" />
                <div className="w-1 h-6 bg-red-500 rounded-sm" />
                <div className="w-1 h-6 bg-red-500 rounded-sm" />
                <div className="w-1 h-6 bg-red-500 rounded-sm" />
              </div>
              <span className="text-xl font-semibold tracking-wider">
                EQUINIX
              </span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">
              Nice to see you again
            </h2>
            <p className="text-sm text-gray-500 mt-2 hidden md:block">
              Login to access your dashboard
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Login</label>
              <input
                type="text"
                value={loginObj.emailId}
                onChange={(e) => updateFormValue("emailId", e.target.value)}
                placeholder="Email or phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginObj.password}
                  onChange={(e) => updateFormValue("password", e.target.value)}
                  placeholder="Enter password"
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="text-sm text-red-600">{errorMessage}</div>
            )}

            <button
              onClick={submitForm}
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
