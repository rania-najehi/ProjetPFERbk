import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../main";

const Students = () => {
  const [students, setStudents] = useState([]);
  const { token } = useContext(Context);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching students...");
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/user/student/getStudent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Data fetched:", data);
        setStudents(data.student);
      } catch (error) {
        console.error("Error fetching students:", error);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchStudents();
  }, [setStudents]);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <section className="page student">
      <h1>Liste des inscrits</h1>
      <div className="banner">
        {students && students.length > 0 ? (
          students.map((student) => (
            <div className="card" key={student._id}>
              <h4>{`${student.firstName} ${student.lastName}`}</h4>
              <div className="details">
                <p>
                  Email: <span>{student.email}</span>
                </p>
                <p>
                  Mobile: <span>{student.phone}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>Aucun étudiant inscrit trouvé!</h1>
        )}
      </div>
    </section>
  );
};

export default Students;
