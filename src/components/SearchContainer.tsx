import "./SearchContainer.css";
export function SearchContainer() {
  return (
    <main className="search-container">
      <section className="search-input-section">
        <input type="text" placeholder="Enter city name" className="search-input"/>
      </section>
      <section className="or-text">or</section>
      <section className="get-location-section">
        <button className="get-location-button">Get Device Location</button>
      </section>
    </main>
  );
}
