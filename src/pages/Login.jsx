import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Fetch users from Google Sheet via Apps Script
      const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxh6FaykBGej-7k1bR79Uf_oD7x2M1Usl1pZWY8qO95Vn09HAEyeBkZR4vSJMNqAvWTGg/exec";
      
      const response = await fetch(`${APPS_SCRIPT_URL}?action=login`);
      const users = await response.json();

      // Find user by email and password
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // Store authenticated user
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("authToken", "sheet-auth-token");
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    >
      <div className="card shadow-lg border-0" style={{ maxWidth: "450px", width: "100%", borderRadius: "12px" }}>
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Welcome Back</h2>
            <p className="text-muted">Login to continue</p>
          </div>

          {error && (
            <div className="alert alert-danger mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
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
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <p className="text-muted">
                Don't have an account? <a href="/register" style={{ color: "#667eea" }}>Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;