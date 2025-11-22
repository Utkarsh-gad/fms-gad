import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const APPS_SCRIPT_URL =import.meta.env.VITE_APPS_SCRIPT_URL;


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
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
      // Prepare query parameters for GET request
      const urlParams = new URLSearchParams({
        action: "register",
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        designation: formData.designation,
        email: formData.email,
        password: formData.password,
      });

      // Send GET request to Apps Script
      const res = await fetch(`${APPS_SCRIPT_URL}?${urlParams.toString()}`, {
        method: "GET",
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful!");

        // Save session
        localStorage.setItem(
          "authUser",
          JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            designation: formData.designation,
            userName: formData.userName,
          })
        );

        localStorage.setItem("authToken", "sheet-auth-token");

        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Unable to connect to server. Try again.");
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
          overflow: "hidden",
        }}
      >
        <div
          className="card-body p-4 p-md-5"
          style={{ overflowY: "auto", maxHeight: "90vh" }}
        >
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p className="text-muted">Sign up to get started</p>
          </div>

          {error && <div className="alert alert-danger mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* First + Last Name */}
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

            {/* User Name + Designation */}
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

            {/* Email */}
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

            {/* Password */}
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
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </div>

            {/* Confirm Password */}
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
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
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
