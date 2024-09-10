import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { sendEmail } from "../../emailjs";
import { useRef } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { token, setToken, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [isGraduationsHovered, setIsGraduationsHovered] = useState(false);
  const [isEvennementsHovered, setIsEvennementsHovered] = useState(false);
  // const [cookie, takeCookie] = useState();
  const form = useRef(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/appointment/getAllAppointment",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        setAppointments(data.allAppointment);
      } catch (error) {
        setAppointments([]);
      }
    };

    const fetchStudentCount = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudentCount(data.studentCount);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchAppointments();
    fetchStudentCount();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      try {
        form.current.querySelector('input[name="to_name"]').value =
          "Amine Amdouni";
        form.current.querySelector('input[name="to_email"]').value =
          "amineamdouni24@gmail.com";

        sendEmail(form.current);
      } catch (error) {
        console.log(error);
      }
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!token) {
    return <Navigate to="/login" />;
  }

  const handleGraduationsMouseEnter = () => {
    setIsGraduationsHovered(true);
  };

  const handleGraduationsMouseLeave = () => {
    setIsGraduationsHovered(false);
  };

  const handleEvennementsMouseEnter = () => {
    setIsEvennementsHovered(true);
  };

  const handleEvennementsMouseLeave = () => {
    setIsEvennementsHovered(false);
  };

  const styles = {
    text: {
      opacity: 0.6,
      cursor: "pointer",
      display: "flex",
      fontSize: "1.5em", // Default font size
      transition: "font-size 0.2s ease-in-out, color 0.2s ease-in-out",
    },
    hoveredText: {
      fontSize: "1.8em", // Increased font size on hover
      color: "white", // Changed text color on hover
    },
  };

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/avatar.png" alt="avatar" />
          <div className="content">
            <div>
              <p>Bonjour ,</p>
              <h5>{user && `${user.firstName} ${user.lastName}`}</h5>
            </div>
          </div>
        </div>
        <div className="secondBox">
          <p
            style={{
              ...styles.text,
              ...(isEvennementsHovered && styles.hoveredText),
            }}
            onMouseEnter={handleEvennementsMouseEnter}
            onMouseLeave={handleEvennementsMouseLeave}
          >
            Evennements
          </p>
        </div>
        <div className="secondBox">
          <p
            style={{
              ...styles.text,
              ...(isGraduationsHovered && styles.hoveredText),
            }}
            onMouseEnter={handleGraduationsMouseEnter}
            onMouseLeave={handleGraduationsMouseLeave}
          >
            Graduations
          </p>
        </div>
        <div className="thirdBox">
          <p>Les Inscrit</p>
          <h3>{studentCount}</h3>
        </div>
      </div>
      <div className="banner">
        <h5>Rendez-Vous</h5>
        <form ref={form}>
          <input type="hidden" name="to_name" />
          <input type="hidden" name="to_email" />
        </form>

        <table>
          <thead>
            <tr>
              <th>Étudiant</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Niveau anglais</th>
              <th>Visite</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.phone}</td>
                  <td>
                    {new Date(
                      appointment.appointment_date
                    ).toLocaleDateString()}
                  </td>
                  <td>{appointment.levelEnglish}</td>
                  <td>
                    {appointment.hasVisited === true ? (
                      <GoCheckCircleFill className="green" />
                    ) : (
                      <AiFillCloseCircle className="red" />
                    )}
                  </td>
                  <td>
                    <select
                      className={
                        appointment.status === "Pending"
                          ? "value-pending"
                          : appointment.status === "Accepted"
                          ? "value-accepted"
                          : "value-rejected"
                      }
                      value={appointment.status}
                      onChange={(e) =>
                        handleUpdateStatus(appointment._id, e.target.value)
                      }
                    >
                      <option value="Pending" className="value-pending">
                        En attente
                      </option>
                      <option value="Accepted" className="value-accepted">
                        Confirmer
                      </option>
                      <option value="Rejected" className="value-rejected">
                        Réfuser
                      </option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun rendez-vous trouvé!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
