import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ContactHero from "../components/contact/ContactHero";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import MapSection from "../components/contact/MapSection";
import EmergencyContact from "../components/contact/EmergencyContact";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ContactHero />
      
      {/* Contact Form & Info */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <MapSection />
      <EmergencyContact />
      <Footer />
    </div>
  );
};

export default Contact;
