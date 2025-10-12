import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import EnquiryHero from "../components/enquiry/EnquiryHero";
import EnquiryForm from "../components/enquiry/EnquiryForm";
import ContactInfo from "../components/enquiry/ContactInfo";
import FAQSection from "../components/enquiry/FAQSection";

const EnquiryPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <EnquiryHero />
      
      {/* Main Enquiry Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <EnquiryForm />
            </div>
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
};

export default EnquiryPage;
