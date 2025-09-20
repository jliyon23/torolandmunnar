import { useState, useEffect, useRef } from "react";

// --- Data ---
// Using thin-line icons for a more elegant and minimal look.
const amenities = [
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3201/3201597.png",
    name: "Airport Pick-up Service",
    description: "Seamless and complimentary transport from the airport.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/8177/8177953.png",
    name: "High-Speed Wi-Fi",
    description: "Stay connected with free high-speed internet across the resort.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3593/3593531.png",
    name: "Housekeeper Services",
    description: "Daily cleaning to ensure a pristine and comfortable space.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/1054/1054949.png",
    name: "Laundry Services",
    description: "On-demand laundry and dry cleaning for your convenience.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2965/2965377.png",
    name: "Breakfast in Bed",
    description: "Enjoy a delicious, freshly prepared breakfast in your room.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/7543/7543949.png",
    name: "Parking Facility",
    description: "Complimentary and secure on-site parking for all our guests.",
  },
];

// --- Custom Hook for Intersection Observer ---
const useInView = (options) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// --- Component ---
const WhyToroland = () => {
  const [sectionRef, isVisible] = useInView({ threshold: 0.15 });
  
  // Base class for fade-in-up animation
  const animationClass = `transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`;

  return (
    <section ref={sectionRef} className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Story */}
        <div className={`max-w-3xl mx-auto text-center mb-16 ${animationClass}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            The Story of Toroland
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 leading-relaxed">
            Toroland is born from a shared dream of two brothers, Tony and Rojan.
            Our vision was to create a sanctuary where luxury coexists with nature, not at its expense.
            Environmental sustainability is the soul of our retreat, ensuring your stay is both unforgettable and kind to the earth.
          </p>
        </div>

        {/* Main Content: Image and Amenities */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with animation */}
          <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
              alt="Serene poolside view at Toroland Resort in Munnar"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Right Column: Amenities with staggered animation */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center sm:text-left">
              Our Signature Amenities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {amenities.map((amenity, index) => (
                <div
                  key={amenity.name}
                  className={`flex items-start p-4 bg-gray-50/80 rounded-lg ${animationClass}`}
                  // BUG FIX: Apply dynamic delays using inline styles
                  style={{ transitionDelay: `${150 + index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-4">
                    <img
                      src={amenity.icon}
                      alt={`${amenity.name} icon`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {amenity.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {amenity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyToroland;