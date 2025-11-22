import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../component/styles/Login.css";
import { useNavigate } from "react-router-dom";


const APPS_SCRIPT_URL =import.meta.env.VITE_APPS_SCRIPT_URL;

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
const navigate =useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
          // Call backend with action, email, password
      const response = await fetch(`
        ${APPS_SCRIPT_URL}?action=login&email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}
      `);

      const result = await response.json();
      console.log("API response:", result); // debug

      if (!result.success) {
        setError(result.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      const user = result.data;

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
    <div className="auth-split" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Left Side - Logo and Branding */}
      <div className="auth-left">
        {/* Decorative circles */}
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-80px",
          right: "-80px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}></div>

        {/* School Logo Placeholder - use project SVG file for clarity */}
        <div className="logo-wrap" style={{ background: "transparent", padding: 8, marginBottom: 12, width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/file.svg" alt="Logo" style={{ width: 128, height: 128, objectFit: 'contain', background: 'transparent' }} />
        </div>

        {/* School Name and Tagline */}
        <div style={{ textAlign: "center", color: "white", zIndex: 1 }}>
          <h1 style={{ fontSize: "2.1rem", fontWeight: "700", marginBottom: "8px", textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}>G.A.D. Convent School</h1>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "500", marginBottom: "6px", opacity: 0.95 }}>Ludhiana</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.9, fontWeight: "300", letterSpacing: "1px" }}>Best Education Best Future</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "10px", color: "#2d3748" }}>Welcome Back</h2>
            <p style={{ color: "#718096", fontSize: "1rem" }}>Login to continue to your account</p>
          </div>

          {error && (
            <div style={{
              padding: "12px 16px",
              backgroundColor: "#fee",
              color: "#c33",
              borderRadius: "8px",
              marginBottom: "24px",
              border: "1px solid #fcc"
            }}>
              {error}
            </div>
          )}

          <div>
            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#2d3748",
                fontSize: "0.95rem"
              }}>
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                onFocus={(e) => e.target.style.borderColor = "#667eea"}
                onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px", position: "relative" }}>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "600",
                color: "#2d3748",
                fontSize: "0.95rem"
              }}>
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                style={{ paddingRight: 50 }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "42px",
                  cursor: "pointer",
                  color: "#718096"
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg, #041b80 0%, #50168b 100%)",
                border: "none",
                borderRadius: "8px",
                color: "white",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "all 0.2s",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.35)"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div style={{ textAlign: "center", marginTop: "16px", color: "#718096" }}>
              Don't have an account?{" "}
              <a
                href="/register"
                style={{
                  color: "#667eea",
                  fontWeight: "600",
                  textDecoration: "none"
                }}
                onMouseOver={(e) => e.target.style.textDecoration = "underline"}
                onMouseOut={(e) => e.target.style.textDecoration = "none"}
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;