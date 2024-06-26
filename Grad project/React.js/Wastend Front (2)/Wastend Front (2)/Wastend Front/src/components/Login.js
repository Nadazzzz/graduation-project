import React, { useState } from "react";
import "./styles/login.css";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      const response = await fetch("http://172.29.176.1/supplier/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors[0].msg);
      } else {
        setError("");
        const responseData = await response.json();
        console.log("Login successful:", responseData);
        window.sessionStorage.setItem("SupplierId", responseData.supplierId);
        window.sessionStorage.setItem("StoreId", responseData.storeId);
        navigate(`../${responseData.supplierId}/dashboard`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="login-main">
      <div className="left">
        <h2 className="logo">Wastend</h2>
        <h2 className="text">LOG IN TO MYSTORE</h2>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <h2 className="heading">Log in to your account</h2>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value={"LOG IN"} />
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
