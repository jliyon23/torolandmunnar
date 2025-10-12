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

const BlogsHero = () => {
  const heroRef = useRef(null);
  const isHeroVisible = useOnScreen(heroRef);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
        isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        <h1 className="text-5xl md:text-7xl font-primary mb-6">Our Blog</h1>
        <p className="text-xl md:text-2xl font-secondary leading-relaxed">
          Stories of sustainability, nature, and conscious travel from the heart of Munnar
        </p>
      </div>
    </section>
  );
};

export default BlogsHero;
