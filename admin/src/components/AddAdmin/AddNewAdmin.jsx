import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./aa.css";

const AddNewAdmin = () => {
  const { token } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://127.0.0.1:4000/api/v1/user/admin/addNew",
          { firstName, lastName, email, phone, genre, password },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setGenre("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="page">
      <section className="container form-component add-admin-form">
        <img src="/logo.png" alt="logo" className="logo" />
        <h1 className="form-title">Nouveau admin</h1>
        <form onSubmit={handleAddNewAdmin}>
          <div>
            <input
              type="text"
              placeholder="Nom"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div></div>
          <div>
            <select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">Séléctionner genre</option>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default AddNewAdmin;
