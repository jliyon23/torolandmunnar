import { useState, useEffect, useRef } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

// Custom Hook for intersection observer
const useOnScreen = (ref, threshold = 0.2) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, threshold]);

  return isIntersecting;
};

const Contact = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  
  const isHeroVisible = useOnScreen(heroRef);
  const isFormVisible = useOnScreen(formRef);
  const isInfoVisible = useOnScreen(infoRef);
  const isMapVisible = useOnScreen(mapRef);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! We will get back to you soon.');
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Location",
      details: ["Toroland Resort", "Munnar Hills", "Kerala, India - 685612"]
    },
    {
      icon: "📞",
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"]
    },
    {
      icon: "✉️",
      title: "Email",
      details: ["info@torolandmunnar.com", "reservations@torolandmunnar.com"]
    },
    {
      icon: "🕒",
      title: "Office Hours",
      details: ["Mon - Sun: 24/7", "Check-in: 2:00 PM", "Check-out: 11:00 AM"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            We're here to help you plan your perfect sustainable getaway
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div ref={formRef} className={`transition-all duration-700 transform ${
              isFormVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}>
              <div className="bg-light p-8 shadow-xl">
                <h2 className="text-3xl font-primary text-primary mb-2">Send us a Message</h2>
                <p className="font-secondary text-main-text/70 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="guests">
                        Number of Guests
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                      >
                        <option value="">Select guests</option>
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5+">5+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="checkIn">
                        Check-in Date
                      </label>
                      <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-secondary text-primary mb-2" htmlFor="checkOut">
                        Check-out Date
                      </label>
                      <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleInputChange}
                        className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-secondary text-primary mb-2" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 focus:border-primary outline-none transition-colors bg-white resize-none"
                      placeholder="Tell us about your requirements, special occasions, dietary restrictions, or any questions you have..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary text-light py-4 font-secondary font-semibold tracking-wider hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div ref={infoRef} className={`transition-all duration-700 delay-200 transform ${
              isInfoVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-primary text-primary mb-4">Contact Information</h2>
                  <p className="font-secondary text-main-text/80 text-lg leading-relaxed mb-8">
                    We're available 24/7 to assist you with reservations, questions about our sustainable practices, or planning your perfect eco-luxury experience.
                  </p>
                </div>

                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-6 p-6 bg-light hover:shadow-lg transition-shadow duration-300">
                    <div className="text-4xl">{info.icon}</div>
                    <div>
                      <h3 className="text-xl font-primary text-primary mb-3">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="font-secondary text-main-text/80 mb-1">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Social Media */}
                <div className="p-6 bg-primary text-light">
                  <h3 className="text-xl font-primary mb-4">Follow Us</h3>
                  <p className="font-secondary mb-6">Stay connected for updates on sustainable tourism and special offers.</p>
                  <div className="flex gap-4">
                    <button className="bg-light/20 hover:bg-light hover:text-primary p-3 transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="bg-light/20 hover:bg-light hover:text-primary p-3 transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </button>
                    <button className="bg-light/20 hover:bg-light hover:text-primary p-3 transition-all duration-300">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.001 12.017z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section ref={mapRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 transform ${
            isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Find Us in Munnar
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto mb-6"></div>
            <p className="font-secondary text-main-text/80 text-lg max-w-3xl mx-auto">
              Located in the heart of Munnar's tea country, Toroland offers easy access to major attractions while maintaining perfect seclusion in nature.
            </p>
          </div>

          <div className={`bg-background p-8 transition-all duration-700 delay-200 transform ${
            isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="aspect-video bg-gray-300 flex items-center justify-center mb-8">
              <div className="text-center text-gray-600">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-lg font-secondary">Interactive Map Coming Soon</p>
                <p className="text-sm">Google Maps Integration</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-primary text-primary mb-3">Distance from Airport</h3>
                <p className="font-secondary text-main-text/80">Cochin International Airport<br />110 km (3 hours drive)</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-primary text-primary mb-3">Nearby Attractions</h3>
                <p className="font-secondary text-main-text/80">Eravikulam National Park<br />Mattupetty Dam<br />Tea Museum</p>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-primary text-primary mb-3">Transportation</h3>
                <p className="font-secondary text-main-text/80">Airport pickup available<br />Local taxi services<br />Self-drive options</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
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

      <Footer />
    </div>
  );
};

export default Contact;
