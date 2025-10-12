import { useRef, useState, useEffect } from 'react';

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

const ContactForm = () => {
  const formRef = useRef(null);
  const isFormVisible = useOnScreen(formRef);

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

  return (
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
  );
};

export default ContactForm;
