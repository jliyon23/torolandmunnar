import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import AboutHero from "../components/about/AboutHero";
import StorySection from "../components/about/StorySection";
import VisionMission from "../components/about/VisionMission";
import ValuesSection from "../components/about/ValuesSection";
import TeamSection from "../components/about/TeamSection";

const About = () => {

  return (
    <div className="min-h-screen">
      <Navbar />
      <AboutHero />
      <StorySection />
      <VisionMission />
      {/* <ValuesSection /> */}
      <TeamSection />
      <Footer />
    </div>
  );
};

export default About;
