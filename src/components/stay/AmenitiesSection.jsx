import { useState, useEffect, useRef } from "react";

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

const AmenitiesSection = () => {
  const amenitiesRef = useRef(null);
  const isAmenitiesVisible = useOnScreen(amenitiesRef);

  const amenities = [
    {
      icon: "🌿",
      title: "Eco-Friendly Design",
      description: "Sustainable architecture using local materials and renewable energy"
    },
    {
      icon: "🍃",
      title: "Organic Gardens",
      description: "Fresh herbs and vegetables grown in our permaculture gardens"
    },
    {
      icon: "💧",
      title: "Rainwater Harvesting",
      description: "Complete water conservation system with natural filtration"
    },
    {
      icon: "🧘",
      title: "Wellness Spaces",
      description: "Dedicated areas for yoga, meditation, and holistic healing"
    },
    {
      icon: "🔥",
      title: "Traditional Cooking",
      description: "Stone ovens and traditional cooking methods for authentic flavors"
    },
    {
      icon: "📚",
      title: "Nature Library",
      description: "Curated collection of books on ecology, culture, and mindfulness"
    }
  ];

  return (
    <section ref={amenitiesRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isAmenitiesVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Property Features
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Sustainable Amenities
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={`bg-light p-8 text-center transition-all duration-700 transform hover:shadow-xl hover:scale-105 ${
                isAmenitiesVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-5xl mb-6">{amenity.icon}</div>
              <h3 className="text-xl font-primary text-primary mb-4">{amenity.title}</h3>
              <p className="font-secondary text-main-text/80 leading-relaxed">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
