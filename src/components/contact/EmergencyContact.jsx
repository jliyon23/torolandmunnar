const EmergencyContact = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto text-center text-light">
        <h2 className="text-3xl font-primary mb-4">24/7 Emergency Contact</h2>
        <p className="font-secondary text-xl mb-6">For urgent matters or emergencies during your stay</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+919876543210" className="bg-light text-secondary px-6 py-3 font-secondary font-semibold hover:bg-primary hover:text-light transition-all duration-300">
            📞 +91 98765 43210
          </a>
          <a href="mailto:emergency@torolandmunnar.com" className="border-2 border-light text-light px-6 py-3 font-secondary font-semibold hover:bg-light hover:text-secondary transition-all duration-300">
            ✉️ Emergency Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContact;
