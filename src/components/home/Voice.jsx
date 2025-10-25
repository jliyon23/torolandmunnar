import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft, FaStar, FaAward, FaUsers } from "react-icons/fa";
import { supabaseHelpers } from "../../config/supabase";

// --- Data for Social Proof ---
const socialProofData = [
    {
        icon: <FaStar size={24}/>,
        title: "4.9/5 Rating",
        subtitle: "From 200+ Reviews"
    },
    {
        icon: <FaUsers size={24}/>,
        title: "1,200+ Guests",
        subtitle: "Hosted in the last year"
    },
    {
        icon: <FaAward size={24}/>,
        title: "Award if any..",
        subtitle: "For Sustainable Tourism"
    }
]

// --- Custom Hook for Intersection Observer ---
const useOnScreen = (ref, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(true); // Start as TRUE

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { threshold, rootMargin: '100px' }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
      return () => {
        if (currentRef) observer.unobserve(currentRef);
      };
    }
  }, [ref, threshold]);

  return isIntersecting;
};


const Testimonials = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await supabaseHelpers.getTestimonials();
      // Only show published testimonials
      setTestimonials(data.filter(t => t.is_published));
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-24 bg-light">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="testimonials" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          {/* Left Column */}
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              What Our Guests Say
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>

          {/* Right Column with Social Proof */}
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed mb-8">
              Our guests consistently praise our unique blend of serene nature, sustainable luxury, and heartfelt hospitality. Here are a few of their experiences.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {socialProofData.map((item, index) => (
                    <div key={index}>
                        <div className="text-secondary mx-auto w-12 h-12 flex items-center justify-center">{item.icon}</div>
                        <h4 className="font-primary text-primary text-xl mt-2">{item.title}</h4>
                        <p className="font-secondary text-main-text/70 text-sm">{item.subtitle}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-main-text/80 font-secondary">No testimonials available at the moment.</p>
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-background p-8 shadow-lg flex flex-col transition-all duration-500 transform hover:shadow-2xl hover:-translate-y-2 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <FaQuoteLeft className="text-secondary/50 mb-6" size={32} />
              <p className="font-secondary text-main-text/90 leading-relaxed flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 pt-6 border-t border-secondary/10">
                <h4 className="font-primary text-primary text-lg">
                  {testimonial.author}
                </h4>
                <div className="flex items-center mt-2">
                  <div className="flex text-secondary">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="ml-3 font-secondary text-main-text/60 text-sm">
                    via {testimonial.source}
                  </p>
                </div>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;