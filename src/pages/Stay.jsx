import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import StayHero from "../components/stay/StayHero";
import IntroSection from "../components/stay/IntroSection";
import RoomsSection from "../components/stay/RoomsSection";
import AmenitiesSection from "../components/stay/AmenitiesSection";
import SustainabilitySection from "../components/stay/SustainabilitySection";
import BookingCTA from "../components/stay/BookingCTA";

const Stay = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <StayHero />
      <IntroSection />
      <RoomsSection />
      {/* <AmenitiesSection /> */}
      <SustainabilitySection />
      <BookingCTA />
      <Footer />
    </div>
  );
};

export default Stay;
