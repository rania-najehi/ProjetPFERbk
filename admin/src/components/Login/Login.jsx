import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://127.0.0.1:4000/api/v1/user/login/", {
          email,
          password,
          confirmPassword,
          role: "Admin",
        })
        .then((res) => {
          setToken(res.data.token);

          navigateTo("/");

          setEmail("");
          setPassword("");
          setConfirmPassword("");
          toast.success(res.data.message);
          console.log(res.data);
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="container form-component">
      <img src="/logo.png" alt="logo" className="logo" />
      <h1 className="form-title">Bienvenue à RBK </h1>
      <p>ESPACE ADMIN!</p>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">Connecter</button>
        </div>
      </form>
    </section>
  );
};

export default Login;
