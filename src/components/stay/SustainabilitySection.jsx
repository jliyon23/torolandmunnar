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

const SustainabilitySection = () => {
  const sustainabilityRef = useRef(null);
  const isSustainabilityVisible = useOnScreen(sustainabilityRef);

  return (
    <section ref={sustainabilityRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto text-center text-light">
        <div className={`transition-all duration-700 transform ${
          isSustainabilityVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-primary mb-8">
            Our Sustainability Promise
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-primary mb-2">100%</div>
              <p className="font-secondary">Carbon Neutral</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-primary mb-2">0</div>
              <p className="font-secondary">Single-Use Plastics</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-primary mb-2">90%</div>
              <p className="font-secondary">Local Sourcing</p>
            </div>
          </div>
          <p className="text-xl font-secondary leading-relaxed mb-8">
            Every aspect of your stay contributes to our regenerative mission. From solar-powered rooms to organic amenities, we ensure your comfort comes with a positive environmental impact.
          </p>
          <button className="bg-light text-primary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-secondary hover:text-light transition-all duration-300 shadow-lg">
            LEARN MORE ABOUT OUR MISSION
          </button>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
