import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import SearchIcon from "../assets/search-icon.png";
import "./WeatherContainer.css";

// Tip simplificat pentru datele API
type WeatherCondition = { text: string; icon: string };
type HourData = { time: string; temp_c: number; condition: WeatherCondition };
type WeatherData = {
  location: { name: string; localtime: string };
  current: { temp_c: number; condition: WeatherCondition };
  forecast: { forecastday: { hour: HourData[] }[] };
};

export function WeatherContainer() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city") || "Chisinau"; // default

  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<WeatherData>(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: import.meta.env.VITE_WEATHER_API_KEY,
              q: city,
              days: 1,
              aqi: "no",
              alerts: "no",
            },
          }
        );
        setData(res.data);
      } catch {
        setError("Nu am putut încărca vremea.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  if (loading) return <main className="weather-container">Se încarcă vremea...</main>;
  if (error) return <main className="weather-container">{error}</main>;
  if (!data) return null;

  // Funcție simplă pentru a pune https la icon
  const getIcon = (icon: string) => (icon.startsWith("http") ? icon : `https:${icon}`);

  const hours = data.forecast.forecastday[0].hour;

  // Ora curentă
  const currentHourStr = data.location.localtime.split(" ")[1].slice(0, 2) + ":00";
  const nowHour = hours.find(h => h.time.endsWith(` ${currentHourStr}`)) || hours[0];

  // Orele dorite
  const wantedHours = ["13:00", "14:00", "15:00", "16:00"];
  const forecastHours = wantedHours
    .map(h => hours.find(hour => hour.time.endsWith(` ${h}`)))
    .filter((h): h is HourData => !!h);

  return (
    <main className="weather-container">
      {/* Oraș */}
      <section className="city-name-input">
        <img src={SearchIcon} className="search-icon-image" />
        <section className="city-name">{data.location.name}</section>
      </section>

      {/* Starea vremii acum */}
      <section className="weather-description">
        <img src={getIcon(data.current.condition.icon)} className="weather-icon-image" />
        <section className="weather-info">
          <section className="temperature-text">{Math.round(data.current.temp_c)}°C</section>
          <section className="weather-status">{data.current.condition.text}</section>
        </section>
      </section>

      {/* Orele 13:00 – 16:00 */}
      <section className="weather-hours-status">
        <section className="interval-weather">
          <div className="time">Now</div>
          <div className="weather-icon-hours">
            <img src={getIcon(nowHour.condition.icon)} className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">{Math.round(nowHour.temp_c)}°C</div>
        </section>

        {forecastHours.map(h => (
          <section key={h.time} className="interval-weather">
            <div className="time">{h.time.split(" ")[1]}</div>
            <div className="weather-icon-hours">
              <img src={getIcon(h.condition.icon)} className="hours-weather-icon" />
            </div>
            <div className="hours-temperature">{Math.round(h.temp_c)}°C</div>
          </section>
        ))}
      </section>
    </main>
  );
}
