import { useState } from "react";
import "./Login.css";

function Login({ onRegister, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Send login data to PHP API
      const response = await fetch(
        "http://localhost/react-backend/api/customer/login.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/jxson",
          },
          credentials: "include",

          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      // temperory add the code
      const sessionResponse = await fetch(
        "http://localhost/react-backend/api/customer/check-session.php",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const sessionText = await sessionResponse.text();

      console.log("Session Response:", sessionText);

      // temperory add the code

      // Get PHP response as text first
      const text = await response.text();

      console.log("PHP Response:", text);

      // Convert response to JSON
      const data = JSON.parse(text);

      console.log("API Response:", data);

      // Check login result
      if (data.success) {
        alert(data.message);

        console.log("Customer:", data.customer);

        onLoginSuccess(data.customer);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login API Error:", error);

      alert("Unable to connect to the server. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome Back</h1>

            <p>Login to your account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Forgot Password */}

            <div className="login-options">
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          {/* Register */}

          <div className="register-link">
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={onRegister}>
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
