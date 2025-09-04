import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./SearchContainer.css";

export function SearchContainer() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // Preluăm orașul din input
  function getCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  // Enter pentru navigare
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && city.trim() !== "") {
      navigate(`/weather?city=${city.trim()}`);
    }
  }

  // Obținem orașul din locația device-ului
  function handleGetLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Folosim Axios pentru reverse geocoding
          const res = await axios.get(
            `https://api.weatherapi.com/v1/current.json`,
            {
              params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: `${lat},${lon}`
              }
            }
          );

          const cityName = res.data.location.name;
          navigate(`/weather?city=${cityName}`);
        } catch {
          alert("Nu am putut obține orașul din locație. Introdu orașul manual.");
        }
      },
      function () {
        alert("Nu am putut obține locația. Permite accesul la GPS.");
      }
    );
  }

  return (
    <main className="search-container">
      <section className="search-input-section">
        <input
          type="text"
          placeholder="Enter city name"
          className="search-input"
          value={city}
          onChange={getCity}
          onKeyDown={handleKeyDown}
        />
      </section>

      <section className="or-text">or</section>

      <section className="get-location-section">
        <button className="get-location-button" onClick={handleGetLocation}>
          Get Device Location
        </button>
      </section>
    </main>
  );
}
