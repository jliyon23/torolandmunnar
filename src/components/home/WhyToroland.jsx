import { useState, useEffect, useRef } from "react";
import { 
  FaLeaf, 
  FaMountain, 
  FaHeart,
  FaWifi,
  FaStar,
  FaParking
} from "react-icons/fa";

// --- Data: No changes needed here ---
const featuresData = [
  {
    icon: <FaLeaf size={28} />,
    title: "Eco-Conscious Luxury",
    description: "Experience premium comfort with sustainable practices that protect the natural beauty of Munnar."
  },
  {
    icon: <FaMountain size={28} />,
    title: "Nature Immersion",
    description: "Our resort is a sanctuary, perfectly integrated with the stunning landscapes of the Western Ghats."
  },
  {
    icon: <FaHeart size={28} />,
    title: "Personalized Care",
    description: "Born from a family's dream, we provide attentive, heartfelt service to make every stay unforgettable."
  },
  {
    icon: <FaWifi size={28} />,
    title: "High-Speed Wi-Fi",
    description: "Stay connected with complimentary high-speed internet access available throughout the entire resort."
  },
  {
    icon: <FaStar size={28} />,
    title: "Impeccable Housekeeping",
    description: "Our dedicated team provides daily services to ensure your space remains pristine and comfortable."
  },
  {
    icon: <FaParking size={28} />,
    title: "Secure On-Site Parking",
    description: "Enjoy peace of mind with our complimentary and secure parking facilities for all our guests."
  }
];

// --- Custom Hook: No changes needed ---
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


const WhyToroland = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section ref={sectionRef} id="why-us" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 sm:mb-20">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Our Commitment
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              A Sanctuary of Care
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed">
              Toroland is born from a shared dream: to create a sanctuary where luxury coexists with nature, not at its expense. Our vision ensures your stay is both unforgettable and kind to the earth.
            </p>
          </div>
        </div>

        {/* Main Content: 1 column on mobile, 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          {/* ====== IMAGE COLUMN ====== */}
          {/* FIX 1: This entire column is now hidden on mobile (<lg) to prevent excessive scrolling */}
          <div className={`hidden lg:block transition-opacity duration-1000 delay-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="overflow-hidden shadow-lg h-full">
              <img
                // FIX 2: Using a portrait-style image URL (aspect ratio 3:4)
                src="https://res.cloudinary.com/dlgdmu6gq/image/upload/w_600,ar_3:4,c_fill,g_auto,f_auto,q_auto/v1756913001/local_amenities_3_bymxit.jpg"
                alt="A cozy, well-lit room at Toroland Resort"
                // FIX 3: h-full makes the image stretch to the height of the right-side content
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ====== FEATURES COLUMN ====== */}
          {/* This column is now full-width on mobile, and the second column on desktop */}
          <div>
            <h3 className={`text-2xl md:text-3xl font-primary text-primary mb-8 transition-all duration-700 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `200ms` }}
            >
              Why Guests Choose Us
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className={`bg-light p-6 text-center shadow-lg transition-all duration-500 transform hover:shadow-2xl hover:-translate-y-2 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 400}ms` }}
                >
                  <div className="w-16 h-16 bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-primary text-primary mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-main-text/80 font-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
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