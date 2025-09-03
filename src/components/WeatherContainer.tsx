import SearchIcon from "../assets/search-icon.png";
import WeatherIcon from "../assets/sunny-icon-2.webp";
import "./WeatherContainer.css";
import { useSearchParams } from "react-router";
export function WeatherContainer() {
    const [searchParams] = useSearchParams();
    const city = searchParams.get("city");
  return (
    <main className="weather-container">
      <section className="city-name-input">
        <img src={SearchIcon} className="search-icon-image" />
        <section className="city-name">{city}</section>
      </section>
      <section className="weather-description">
        <img src={WeatherIcon} className="weather-icon-image" />
        <section className="weather-info">
          <section className="temperature-text">31°C</section>
          <section className="weather-status">Sunny</section>
        </section>
      </section>
      <section className="weather-hours-status">
        <section className="interval-weather">
          <div className="time">Now</div>
          <div className="weather-icon-hours">
            <img src={WeatherIcon} alt="" className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">31°C</div>
        </section>
        <section className="interval-weather">
          <div className="time">13:00</div>
          <div className="weather-icon-hours">
            <img src={WeatherIcon} alt="" className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">30°C</div>
        </section>
        <section className="interval-weather">
          <div className="time">14:00</div>
          <div className="weather-icon-hours">
            <img src={WeatherIcon} alt="" className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">29°C</div>
        </section>
        <section className="interval-weather">
          <div className="time">15:00</div>
          <div className="weather-icon-hours">
            <img src={WeatherIcon} alt="" className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">26°C</div>
        </section>
        <section className="interval-weather">
          <div className="time">16:00</div>
          <div className="weather-icon-hours">
            <img src={WeatherIcon} alt="" className="hours-weather-icon" />
          </div>
          <div className="hours-temperature">25°C</div>
        </section>
      </section>
    </main>
  );
}
