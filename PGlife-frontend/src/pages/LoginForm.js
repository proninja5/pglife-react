import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost/pglife/login.php", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.data.status === "success") {
        setMessage("✅ Login Successful!");

        localStorage.setItem("user", JSON.stringify(response.data.user));

        window.location.href = "/properties";
      } else {
        setMessage("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("❌ Error connecting to server");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && (
        <p
          style={{
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
