import React, { useContext, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";
import "./Register.css";
import { sendEmail } from "../../helpers/emailjs";
import { GiMailShirt } from "react-icons/gi";
const Register = () => {
  const { token, setToken } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [password, setPassword] = useState("");
  const [levelEnglish, setLevelEnglish] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [studentAvatar, setStudentAvatar] = useState(null);
  const navigateTo = useNavigate();
  const form = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("genre", genre);
    formData.append("password", password);
    formData.append("levelEnglish", levelEnglish);
    formData.append("birthdate", birthdate);
    formData.append("file", studentAvatar);
    formData.append("role", "Student");
    console.log("FormData fields:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log("formdata", formData.values());

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/user/student/register",
        formData,
        {
          // withCredentials: true,
          // headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);

      // Redirection vers la page de login après un enregistrement réussi
      navigateTo("/login");
      try {
        const messageInput = form.current.querySelector(
          'input[name="message"]'
        );
        if (messageInput) {
          messageInput.value = "amine amdouni";
        }
        sendEmail(form.current);
      } catch (error) {
        console.log(error);
      }
      // Réinitialisation des champs du formulaire
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setGenre("");
      setPassword("");
      setLevelEnglish("");
      setBirthdate("");
      setStudentAvatar(null);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handlePhotoChange = (e) => {
    setStudentAvatar(e.target.files[0]);
  };

  return (
    <div className="centered-component">
      <div className="form-componentt">
        <h2>S'inscrire</h2>
        <form onSubmit={handleRegister} ref={form}>
          <div>
            <input
              type="text"
              placeholder="Nom"
              name="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              name="from_name"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              name="message"
              placeholder="Num de Téléphone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date de Naissance"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <label>Homme</label>
                <input
                  type="radio"
                  name="genre"
                  value="Homme"
                  checked={genre === "Homme"}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <label>Femme</label>
                <input
                  type="radio"
                  name="genre"
                  value="Femme"
                  checked={genre === "Femme"}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
            </div>
            <select
              value={levelEnglish}
              onChange={(e) => setLevelEnglish(e.target.value)}
            >
              <option value="">Niveau d'Anglais</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="file" onChange={handlePhotoChange} />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>
              Déjà inscrit?{" "}
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "#271776ca" }}
              >
                Connecter
              </Link>
            </p>
          </div>
          <div
            className="login-form"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginTop: "30px",
            }}
          >
            <button type="submit" className="pink-button">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
