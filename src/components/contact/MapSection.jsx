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

const MapSection = () => {
  const mapRef = useRef(null);
  const isMapVisible = useOnScreen(mapRef);

  return (
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
  );
};

export default MapSection;
