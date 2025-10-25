import { useRef, useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLeaf
} from 'react-icons/fa';

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
      icon: <FaMapMarkerAlt className="text-amber-600" size={24} />,
      title: "Location",
      details: ["Toroland Resort", "Tiger Cave, Kallar - Mankulam Rd, Mankulam", "Kerala 685565"]
    },
    {
      icon: <FaPhone className="text-amber-600" size={24} />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 87654 32109"]
    },
    {
      icon: <FaEnvelope className="text-amber-600" size={24} />,
      title: "Email",
      details: ["info@torolandmunnar.com", "reservations@torolandmunnar.com"]
    },
    {
      icon: <FaClock className="text-amber-600" size={24} />,
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
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-primary">Contact Information</h2>
          <p className="font-secondary text-gray-600 text-lg leading-relaxed mb-8">
            We're available 24/7 to assist you with reservations, questions about our sustainable practices, or planning your perfect eco-luxury experience.
          </p>
        </div>

        {contactInfo.map((info, index) => (
          <div key={index} className="flex gap-6 p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              {info.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-primary">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="font-secondary text-gray-600 mb-1">{detail}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Social Media */}
        <div className="p-6 bg-accent text-white">
          <div className="flex items-center gap-3 mb-4">
            <FaLeaf className="text-white" size={20} />
            <h3 className="text-xl font-semibold font-primary">Follow Us</h3>
          </div>
          <p className="font-secondary mb-6">Stay connected for updates on sustainable tourism and special offers.</p>
          <div className="flex gap-3">
            <button className="bg-white/20 hover:bg-white hover:text-amber-600 p-3 rounded transition-all duration-300">
              <FaFacebook size={20} />
            </button>
            <button className="bg-white/20 hover:bg-white hover:text-amber-600 p-3 rounded transition-all duration-300">
              <FaTwitter size={20} />
            </button>
            <button className="bg-white/20 hover:bg-white hover:text-amber-600 p-3 rounded transition-all duration-300">
              <FaInstagram size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;