import { Header } from "../components/Header";
import { Background } from "../components/Background";
import { Footer } from "../components/Footer";
import { WeatherContainer } from "../components/WeatherContainer";

export function WeatherPage() {
  return (
      <Background>
        <Header />
        <WeatherContainer/>
        <Footer/>
    </Background>
  );
}
