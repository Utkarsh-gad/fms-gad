import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxh6FaykBGej-7k1bR79Uf_oD7x2M1Usl1pZWY8qO95Vn09HAEyeBkZR4vSJMNqAvWTGg/exec";
      
      // Fetch existing users to check if email already exists
      const loginResponse = await fetch(`${APPS_SCRIPT_URL}?action=login`);
      const existingUsers = await loginResponse.json();
      
      const exists = existingUsers.some((u) => u.email === formData.email);
      if (exists) {
        setError("Email already registered");
        setLoading(false);
        return;
      }

      // Register new user by sending data to Apps Script
      const registerResponse = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          userName: formData.userName,
          designation: formData.designation,
          password: formData.password
        })
      });

      const result = await registerResponse.json();
      if (!result.success) {
        setError("Registration failed. Please try again.");
        return;
      }

      // Store authenticated user
      const newUser = {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userName: formData.userName,
        designation: formData.designation
      };

      localStorage.setItem("authUser", JSON.stringify(newUser));
      localStorage.setItem("authToken", "sheet-auth-token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center p-3" 
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="card shadow-lg border-0" style={{ maxWidth: "550px", width: "100%", borderRadius: "12px" }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Create Account</h2>
            <p className="text-muted">Sign up to get started</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4">{error}</div>
          )}

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

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none" }}
            >
              {loading ? "Creating Account..." : "Register"}
            </button>

            <div className="text-center">
              <p className="text-muted">
                Already have an account? <a href="/login" style={{ color: "#667eea" }}>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;