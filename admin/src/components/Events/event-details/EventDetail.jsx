// AdminEventDetail.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventSidebar from "./EventSidebar.jsx";
import EventNavigationBar from "./EventNavigationBar.jsx";
import EventContent from "./EventContent.jsx";
import { useParams, Outlet, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const AdminEventDetail = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/event/oneEvent/${eventId}`
        );
        setEventData(response.data);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    fetchData();
  }, [eventId]);

  if (loading) {
    return <div className="loader2"></div>;
  }

  return (
    <div className="container-fluid">
      <EventNavigationBar eventId={eventId} />
      <div className="row p-3">
        {eventData && (
          <div className="col-md-3">
            <EventSidebar eventData={eventData} />
          </div>
        )}
        <div className="col-md-8">
          <Outlet />
          <CSSTransition
            in={location.pathname === `/events/${eventId}` && !!eventData}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <EventContent eventData={eventData} />
          </CSSTransition>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetail;
