import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "sk.eyJ1IjoicmlhZGhsb3VkaGFpZWYiLCJhIjoiY2x2Z3J6MjFzMHU3eTJsbno0d2NhNXM0cSJ9.1pWIl5ZNO9V0R3II2gYH9A";

const LocationAdd = ({ onLocationChange }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentMarker, setCurrentMarker] = useState(null); // Marker for current location
  const [eventMarkers, setEventMarkers] = useState([]); // Array to hold other event markers
  const [address, setAddress] = useState(""); // State to hold the address

  useEffect(() => {
    // Initialize the map
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.935242, 40.73061], // Default center
      zoom: 10,
    });

    // Get current location using GPS
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.current.setCenter([longitude, latitude]); // Set map center to current location

        // Add a red marker at the current location
        const newCurrentMarker = new mapboxgl.Marker({ color: "red" }) // Set marker color to red
          .setLngLat([longitude, latitude])
          .addTo(map.current);
        setCurrentMarker(newCurrentMarker);
        onLocationChange([longitude, latitude, "Current Location"]); // Pass location and address to parent
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );

    // Handle map click to set marker for other events
    map.current.on("click", async (event) => {
      const { lngLat } = event;
      const longitude = lngLat.lng;
      const latitude = lngLat.lat;

      // Check if the clicked location is already marked
      const existingMarker = eventMarkers.find(
        (marker) =>
          marker.getLngLat().lng === longitude &&
          marker.getLngLat().lat === latitude
      );

      if (!existingMarker) {
        // Create a blue marker for the clicked location
        const newEventMarker = new mapboxgl.Marker({ color: "blue" }) // Set marker color to blue
          .setLngLat(lngLat)
          .addTo(map.current);

        // Add the new event marker to the array
        setEventMarkers((prevMarkers) => [...prevMarkers, newEventMarker]);

        // Fetch address from Mapbox Geocoding API
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        // Check if we have results and set the address
        if (data.features && data.features.length > 0) {
          const fetchedAddress = data.features[0].place_name; // Get the first result's address
          setAddress(fetchedAddress); // Set the address in state
          console.log("Address:", fetchedAddress); // Log the address

          // Pass new location and address to parent
          onLocationChange([longitude, latitude, fetchedAddress]);
        } else {
          console.error("No address found for the clicked location.");
          // Pass new location and a default message if no address is found
          onLocationChange([longitude, latitude, ""]);
        }
      } else {
        console.log("This location is already marked.");
      }
    });
  }, [onLocationChange, eventMarkers]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      {address && (
        <div style={{ marginTop: "10px" }}>Address: {address}</div>
      )}{" "}
      {/* Display the address */}
    </div>
  );
};

export default LocationAdd;
