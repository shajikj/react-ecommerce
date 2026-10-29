import { useState } from "react";
import { apiUrl, readApiResponse } from "../api";
import "./Register.css";

function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        apiUrl("customer/register.php"),
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        },
      );

      const data = await readApiResponse(response);

      if (data.success) {
        alert("Registration successful. You can now sign in.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Registration failed. Please check your details and try again.");
      }
    } catch (error) {
      console.error("API Error:", error);

      alert("Unable to register. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Create Account</h1>

            <p>Register a new customer account</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}

            <div className="form-group">
              <label htmlFor="name">Name</label>

              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            {/* Register Button */}

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          {/* Login */}

          <div className="login-link">
            <p>
              Already have an account?{" "}
              <button type="button" onClick={onLogin}>
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
