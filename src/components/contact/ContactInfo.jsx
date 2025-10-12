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

const ContactInfo = () => {
  const infoRef = useRef(null);
  const isInfoVisible = useOnScreen(infoRef);

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
  );
};

export default ContactInfo;
