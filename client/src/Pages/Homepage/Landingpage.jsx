import "../Homepage/landingpage.css";
import Navigation from "./Components/Navigation";
import HeroSection from "./Components/Hero";
import Footer from "./Components/Footer";
import CardSection from "./Components/Cards";

const LandingPage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <CardSection />
      <Footer/>
    </div>
  );
};
export default LandingPage