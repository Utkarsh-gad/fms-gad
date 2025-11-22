import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "../../component/styles/Register.css";

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
    <div className="auth-split" style={{ backgroundColor: "#f5f5f5" }}>
      {/* Left - Branding */}
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

      {/* Right - Form */}
      <div className="auth-right">
        <div className="auth-form-container">
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: 6, color: "#2d3748" }}>Create Account</h2>
            <p style={{ color: "#718096" }}>Sign up to get started</p>
          </div>

          {error && (
            <div style={{ padding: "12px 16px", backgroundColor: "#fee", color: "#c33", borderRadius: 8, marginBottom: 16, border: "1px solid #fcc" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="two-col-grid" style={{ marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>First Name</label>
                <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className="form-control" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Last Name</label>
                <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className="form-control" />
              </div>
            </div>

            <div className="two-col-grid" style={{ marginBottom: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>User Name</label>
                <input name="userName" type="text" value={formData.userName} onChange={handleChange} required className="form-control"  />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Designation</label>
                <input name="designation" type="text" value={formData.designation} onChange={handleChange} required className="form-control" />
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Email</label>
              <input name="email" type="email" value={formData.email} onChange={handleChange} required className="form-control" />
            </div>

            <div className="two-col-grid" style={{ marginBottom: 12 }}>
              <div style={{ position: "relative" }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Password</label>
                <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} required className="form-control" style={{ paddingRight: 44 }} />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 10, top: 34, cursor: "pointer", color: "#718096" }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
              </div>

              <div style={{ position: "relative" }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Confirm Password</label>
                <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} required className="form-control" style={{ paddingRight: 44 }} />
                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: "absolute", right: 10, top: 34, cursor: "pointer", color: "#718096" }}>{showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}</span>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px",                 background: "linear-gradient(135deg, #041b80 0%, #50168b 100%)", border: "none", borderRadius: 8, color: "#fff", fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>{loading ? 'Creating Account...' : 'Register'}</button>

            <div style={{ textAlign: "center", marginTop: 12, color: "#666" }}>
              Already have an account? <a href="/login" style={{ color: "#667eea", fontWeight: 600 }}>Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
