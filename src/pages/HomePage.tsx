import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SearchContainer } from "../components/SearchContainer";
import './HomePage.css'
export function HomePage() {
  return (
    <div className="home-page-div">
      <Header />
      <SearchContainer/>
      <Footer />
    </div>
  );
}
