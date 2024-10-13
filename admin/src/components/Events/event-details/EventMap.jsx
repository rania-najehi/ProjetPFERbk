// EventMap.jsx
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZGFvdWQ5NCIsImEiOiJjbTI3bW9ndTYwNzQzMnFzZHJqYjBodjUwIn0.o0BtrTrjuqe-lnGRww2yDg";

const EventMap = ({ location }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.longitude, location.latitude],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([location.longitude, location.latitude])
      .addTo(map.current);
  }, [location]);
  //   [location.longitude, location.latitude]
  const handleMouseEnter = () => {
    map.current.flyTo({
      center: [location.longitude, location.latitude], // Move slightly to the right
      zoom: 18, // Zoom in
      speed: 0.5, // Make the flying slow
    });
  };

  const handleMouseLeave = () => {
    map.current.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 15, // Zoom out
      speed: 0.5, // Make the flying slow
    });
  };

  return (
    <div
      ref={mapContainer}
      className="map-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default EventMap;
