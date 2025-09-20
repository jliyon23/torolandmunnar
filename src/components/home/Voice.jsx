import { useState, useEffect, useRef } from "react";
import { Quote, Star, Award, MessagesSquare } from "lucide-react";

// --- Data for Testimonials ---
const testimonialsData = [
  {
    quote: "Everything here was great: the staff, the room layout, the property amenities with indoor pool, and the quality of the food. But the high point is the view from the mountains.",
    author: "Anna Williams",
    source: "TripAdvisor",
    rating: 5
  },
  {
    quote: "Toroland offers an unparalleled escape into nature without compromising on luxury. The eco-friendly approach combined with modern comforts made our stay unforgettable.",
    author: "Michael Chen",
    source: "Google Reviews",
    rating: 5
  },
  {
    quote: "The perfect blend of sustainability and luxury. Waking up to the misty mountains while knowing you're in an eco-conscious resort is a rare and precious experience.",
    author: "Sarah Johnson",
    source: "Booking.com",
    rating: 5
  }
];

// --- Custom Hook for Intersection Observer ---
const useOnScreen = (ref, threshold = 0.3) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return isIntersecting;
};

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  // CORRECTED: Function name fixed to use camelCase
  const handleTestimonialChange = (index) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300); // Duration of the fade-out transition
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonialsData.length;
      // CORRECTED: Call the fixed function name
      handleTestimonialChange(nextIndex);
    }, 6000); // Auto-rotate every 6 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const activeTestimonial = testimonialsData[currentIndex];

  return (
    <section
      id="testimonials-section"
      ref={sectionRef}
      className="relative py-24 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://res.cloudinary.com/dlgdmu6gq/image/upload/f_auto,q_auto/v1756795607/5_uvx5wt.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="uppercase tracking-widest text-sm font-semibold text-accent mb-2 font-secondary">
            Voice from our guests
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-white">
            Guest Experiences
          </h2>
          <div className="w-20 h-[1px] bg-accent mx-auto mt-4"></div>
        </div>

        {/* Testimonial Carousel */}
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <Quote className="text-accent mx-auto mb-4" size={40} />
          <blockquote className="text-xl md:text-2xl font-light max-w-3xl mx-auto font-secondary leading-relaxed">
            {activeTestimonial.quote}
          </blockquote>
          <div className="mt-8">
            <p className="font-semibold text-lg tracking-wide font-primary">
              {activeTestimonial.author}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              – {activeTestimonial.source}
            </p>
          </div>
          <div className="flex justify-center mt-4 space-x-1 text-accent">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-10 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              // CORRECTED: Call the fixed function name
              onClick={() => handleTestimonialChange(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-accent w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`View testimonial ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Divider */}
        <div className="w-full max-w-xs mx-auto h-[1px] bg-white/20 my-12"></div>

        {/* Social Proof Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-white/90">
            <div className="flex flex-col items-center">
                <Star className="w-8 h-8 mb-2 text-accent"/>
                <span className="font-bold text-lg font-primary">4.9/5 Rating</span>
                <span className="text-sm text-white/70">Based on guest reviews</span>
            </div>
            <div className="flex flex-col items-center">
                <MessagesSquare className="w-8 h-8 mb-2 text-accent"/>
                <span className="font-bold text-lg font-primary">200+ Reviews</span>
                <span className="text-sm text-white/70">Across all platforms</span>
            </div>
            <div className="flex flex-col items-center">
                <Award className="w-8 h-8 mb-2 text-accent"/>
                <span className="font-bold text-lg font-primary">Eco Award 2023</span>
                <span className="text-sm text-white/70">For sustainable tourism</span>
            </div>
        </div>
      </div>
    </section>
  );
}