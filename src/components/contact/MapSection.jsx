import { useRef, useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPlane, 
  FaMountain, 
  FaCar,
  FaCompass 
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

const MapSection = () => {
  const mapRef = useRef(null);
  const isMapVisible = useOnScreen(mapRef);

  const googleMapsUrl = "https://www.google.com/maps/place/Toroland+Munnar+Resorts/@10.0901282,76.9460676,826m/data=!3m2!1e3!4b1!4m9!3m8!1s0x3b0791002fac6901:0x6c501dac33df11d8!5m2!4m1!1i2!8m2!3d10.0901229!4d76.9486425!16s%2Fg%2F11wvklh3n4?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D";

  const openGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section ref={mapRef} className="py-20 px-4 md:px-8 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-primary">
            FIND US IN MUNNAR
          </h2>
          <p className="text-xl text-gray-600 mb-2 font-secondary">Our Location</p>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
        </div>

        <div className={`transition-all duration-700 delay-200 transform ${
          isMapVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Interactive Map */}
          <div className="bg-gray-50 border border-gray-200 p-2 mb-8">
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.123456789012!2d76.9460676!3d10.0901282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0791002fac6901%3A0x6c501dac33df11d8!2sToroland%20Munnar%20Resorts!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Toroland Munnar Location"
                className="absolute inset-0"
              ></iframe>
            </div>
            <div className="p-4 bg-white border-t border-gray-200">
              <button
                onClick={openGoogleMaps}
                className="flex items-center justify-center gap-2 w-full bg-amber-600 text-white py-3 font-medium hover:bg-amber-700 transition-colors"
              >
                <FaCompass size={18} />
                Open in Google Maps
              </button>
            </div>
          </div>
          
          {/* Location Information */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaPlane className="text-amber-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 font-primary">Distance from Airport</h3>
              <p className="font-secondary text-gray-600">Cochin International Airport<br />110 km (3 hours drive)</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMountain className="text-amber-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 font-primary">Nearby Attractions</h3>
              <p className="font-secondary text-gray-600">Eravikulam National Park<br />Mattupetty Dam<br />Tea Museum</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 border border-gray-200">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar className="text-amber-600" size={20} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 font-primary">Transportation</h3>
              <p className="font-secondary text-gray-600">Airport pickup available<br />Local taxi services<br />Self-drive options</p>
            </div>
          </div>

          {/* Address Section */}
          <div className="mt-8 p-6 bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaMapMarkerAlt className="text-amber-600" size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 font-primary">Exact Location</h3>
                <p className="font-secondary text-gray-600">
                  Toroland Munnar Resorts<br />
                  Munnar Hills, Kerala, India - 685612
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;