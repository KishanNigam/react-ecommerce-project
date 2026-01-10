import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginAdmin } from "../../services/auth.service";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../../styles/login.css";

function AdminLogin() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier || !password) {
      setError("Identifier and password are required");
      return;
    }

    try {
      setLoading(true);
      const data = await loginAdmin(identifier, password);
      login(data.token, data.admin);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Welcome Back 👋</h2>
        <p>Manage your store from one powerful dashboard.</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Sign In</h2>
          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="text"
                placeholder="Email / Username / Mobile"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <button className="login-btn" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
