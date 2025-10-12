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

const StorySection = () => {
  const storyRef = useRef(null);
  const isStoryVisible = useOnScreen(storyRef);

  return (
    <section ref={storyRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 transform ${
            isStoryVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Our Beginning
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              The Toroland Story
            </h2>
            <div className="w-24 h-[2px] bg-secondary mb-8"></div>
            
            <div className="space-y-6 text-main-text/80 font-secondary text-lg leading-relaxed">
              <p>
                Nestled in the pristine hills of Munnar, Toroland was born from a vision to create a sanctuary where travelers could experience the untouched beauty of the Western Ghats while contributing to its preservation.
              </p>
              <p>
                Our journey began with a simple belief: that luxury doesn't have to come at the expense of our environment. Every stone laid, every tree planted, and every experience crafted at Toroland reflects our commitment to regenerative tourism.
              </p>
              <p>
                We partner with local communities, support traditional crafts, and ensure that every guest's stay leaves a positive impact on both the land and its people.
              </p>
            </div>
          </div>
          
          <div className={`transition-all duration-700 delay-200 transform ${
            isStoryVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
              alt="Toroland Story"
              className="w-full aspect-[4/3] object-cover shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
