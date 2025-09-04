// SearchContainer.tsx
import "./SearchContainer.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export function SearchContainer() {
  const [city, setCity] = useState("");
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  // Input city
  function getCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  // Enter key for search
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && city.trim() !== "") {
      navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    }
  }

  // Get device location
  async function handleGetLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (loadingLocation) return; // previne mai multe click-uri simultan
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await axios.get(
            "https://api.weatherapi.com/v1/current.json",
            {
              params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: `${latitude},${longitude}`,
              },
            }
          );
          const cityName = res.data.location.name;
          navigate(`/weather?city=${encodeURIComponent(cityName)}`);
        } catch {
          console.error("Weather API error");
          alert("Could not get city from your location. Try entering manually.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.warn("Geolocation error:", error.code, error.message);
        if (error.code === 1 || error.code === 2) {
          alert(
            "Could not get your location. Make sure GPS is allowed and your browser supports location."
          );
        }
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
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
        <button
          className="get-location-button"
          onClick={handleGetLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? "Getting location..." : "Get Device Location"}
        </button>
      </section>
    </main>
  );
}
