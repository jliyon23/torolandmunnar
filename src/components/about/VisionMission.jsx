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

const VisionMission = () => {
  const visionRef = useRef(null);
  const isVisionVisible = useOnScreen(visionRef);

  return (
    <section ref={visionRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isVisionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Our Purpose
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            Vision & Mission
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={`bg-primary p-12 text-light transition-all duration-700 delay-200 transform ${
            isVisionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl font-primary mb-6">Our Vision</h3>
            <p className="font-secondary text-lg leading-relaxed text-light/90">
              To be the leading example of regenerative hospitality in India, where every guest experience contributes to the restoration and preservation of our natural heritage while supporting local communities.
            </p>
          </div>

          <div className={`bg-secondary p-12 text-light transition-all duration-700 delay-400 transform ${
            isVisionVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h3 className="text-3xl font-primary mb-6">Our Mission</h3>
            <p className="font-secondary text-lg leading-relaxed text-light/90">
              To provide transformative travel experiences that connect guests with nature, culture, and community while maintaining carbon neutrality and creating positive environmental and social impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
