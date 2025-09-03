import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SearchContainer } from "../components/SearchContainer";
import { Background } from "../components/Background";
export function HomePage() {
  return (
    <Background>
      <Header />
      <SearchContainer />
      <Footer />
    </Background>
  );
}
