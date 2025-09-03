import "./SearchContainer.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
export function SearchContainer() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  function getCity(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.key==='Enter' && city.trim() !== '') {
      navigate(`/weather?city=${encodeURIComponent(city.trim())}`);
    }
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
        <button className="get-location-button">Get Device Location</button>
      </section>
    </main>
  );
}
