import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

  const attemptLocalLogin = () => {
    const localUsers = JSON.parse(localStorage.getItem("users")) || [];
    return localUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      /* STEP 1 = Try Google Sheet first */
      const urlParams = new URLSearchParams({
        action: "login",
        email: formData.email,
        password: formData.password,
      });

      const res = await fetch(`${APPS_SCRIPT_URL}?${urlParams.toString()}`);
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }

      /* STEP 2 = Fallback to Local Storage */
      const localUser = attemptLocalLogin();
      if (localUser) {
        localStorage.setItem("authUser", JSON.stringify(localUser));
        localStorage.setItem("authToken", "local-auth-token");

        setIsAuthenticated(true);
        navigate("/dashboard");
        return;
      }

      setError("Invalid email or password");
    } catch (err) {
      console.warn("Login failed → Using fallback");

      /* STEP 3 = Network/API failure → use localStorage fallback */
      const localUser = attemptLocalLogin();
      if (localUser) {
        localStorage.setItem("authUser", JSON.stringify(localUser));
        localStorage.setItem("authToken", "local-auth-token");

        setIsAuthenticated(true);
        navigate("/dashboard");
        return;
      }

      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div
        className="card shadow-lg border-0"
        style={{ maxWidth: "450px", width: "100%", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold mb-2">Welcome Back</h2>
            <p className="text-muted">Login to continue</p>
          </div>

          {error && <div className="alert alert-danger mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4 position-relative">
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

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "55%",
                  cursor: "pointer",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <p className="text-muted">
                Don’t have an account?{" "}
                <a href="/register" style={{ color: "#667eea" }}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
