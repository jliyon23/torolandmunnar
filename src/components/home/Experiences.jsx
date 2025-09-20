import { useState, useEffect, useRef } from "react";

// --- Data: Updated with the new descriptions you provided ---
const experiencesData = [
  {
    title: "Guided Nature Walks",
    description: "Explore the lush Western Ghats with experienced naturalists who share insights into the region's flora and fauna.",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756913006/local_amenities_2_pdbzpz.jpg"
  },
  {
    title: "Cultural Workshops",
    description: "Participate in hands-on sessions on traditional Western Ghats crafts, music, and cooking, and experience the authentic culture of the region.",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756913001/local_amenities_3_bymxit.jpg"
  },
  {
    title: "Wellness Activities",
    description: "Engage in yoga and meditation for holistic well-being, surrounded by serene natural landscapes. (Note: Spa services are not currently offered.)",
    imageUrl: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,g_auto,f_auto,q_auto/v1756912996/local_amenities_1_klaedb.jpg"
  }
];

// --- Custom Hook (can be moved to a separate utils/hooks.js file) ---
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

const Experiences = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    <section ref={sectionRef} id="experiences" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Discover Munnar
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              Unforgettable Experiences
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed">
              We offer unique experiences designed to immerse you in the natural beauty and cultural heritage of Munnar, providing a perfect blend of adventure, relaxation, and enrichment.
            </p>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8">
          {experiencesData.map((experience, index) => (
            <div
              key={index}
              className={`relative transition-all duration-500 group ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden  shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={experience.imageUrl}
                  alt={experience.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlapping Text Box - UPDATED with your new content */}
              <div className="relative bg-light shadow-xl  mx-auto w-10/12 -mt-20 p-6 text-center">
                <h3 className="text-xl font-primary text-primary mb-3">
                  {experience.title}
                </h3>
                
                <p className="text-main-text/80 font-secondary text-sm leading-relaxed">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experiences;