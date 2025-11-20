import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxSv6dOGfQYALpXwKrzpY77xcRNcMyWDmizr-hJcyT_1CnvRKPB7-SMRaz5wyF-yA_sjw/exec";

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* 🔥 Utility: Save to Google Apps Script */
  const saveToGoogleSheet = async (newUser) => {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Avoids CORS preflight
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          ...newUser
        })
      });

      // With no-cors, we can't read response.ok, so we optimistically assume success
      console.log("User posted to Google Sheet");
      return true;
    } catch (err) {
      console.warn("Failed to post to Google Sheet, will use localStorage fallback:", err);
      return false;
    }
  };

  /* 🔥 Utility: Save to localStorage fallback */
  const saveToLocalStorage = (newUser) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("User saved to localStorage (fallback)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.some((u) => u.email === formData.email);
      if (exists) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        designation: formData.designation,
        email: formData.email,
        password: formData.password
      };

      // Try to save to Google Sheet first
      const sheetSaved = await saveToGoogleSheet(newUser);

      // Always save to localStorage as fallback
      saveToLocalStorage(newUser);

      localStorage.setItem("authUser", JSON.stringify(newUser));
      localStorage.setItem("authToken", sheetSaved ? "sheet-auth-token" : "local-auth-token");

      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{ background: "#f8f9fc" }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "550px",
          width: "100%",
          borderRadius: "12px",
          maxHeight: "90vh",
          overflow: "hidden"
        }}
      >
        <div
          className="card-body p-4 p-md-5"
          style={{
            overflowY: "auto",
            maxHeight: "90vh"
          }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p className="text-muted">Sign up to get started</p>
          </div>

          {error && <div className="alert alert-danger mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">First Name</label>
                <input
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Last Name</label>
                <input
                  name="lastName"
                  type="text"
                  className="form-control"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">User Name</label>
                <input
                  name="userName"
                  type="text"
                  className="form-control"
                  placeholder="johndoe"
                  value={formData.userName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Designation</label>
                <input
                  name="designation"
                  type="text"
                  className="form-control"
                  placeholder="Manager"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer"
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none"
              }}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <div className="text-center">
              <p className="text-muted">
                Already have an account?{" "}
                <a href="/login" style={{ color: "#667eea" }}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
