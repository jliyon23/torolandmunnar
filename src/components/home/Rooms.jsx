import { useState, useEffect, useRef } from "react";
import { ArrowRight, Ruler, Users, BedDouble } from "lucide-react";

// --- Data ---
const roomData = [
  {
    title: "Eco Suite",
    description: "Inspired by the traditional architecture of the Western Ghats, featuring modern comforts for an extraordinary experience.",
    size: "60 m²",
    guests: "2 Guests",
    bed: "1 Queen Size Bed",
    image: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1756798653/_DSC2821_1_mtwrwr.jpg"
  },
  {
    title: "Thatch Suite",
    description: "Constructed with sustainable materials, offering a perfect blend of rustic charm and contemporary luxury.",
    size: "60 m²",
    guests: "2 Guests",
    bed: "1 Queen Size Bed",
    image: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1756795607/5_uvx5wt.jpg"
  },
  {
    title: "Deluxe Room",
    description: "A cozy retreat with elegant interiors and a private balcony overlooking the serene natural landscape.",
    size: "55 m²",
    guests: "2 Guests",
    bed: "1 King Size Bed",
    image: "https://res.cloudinary.com/dlgdmu6gq/image/upload/w_800,ar_4:3,c_fill,f_auto,q_auto/v1756795601/3_xcefgp.jpg"
  }
];

// --- Custom Hook for Intersection Observer ---
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

const Rooms = () => {
  // MODIFIED: Added ref and hook for animations
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);

  return (
    // MODIFIED: Attached ref to the section
    <section ref={sectionRef} id="accommodation" className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          {/* MODIFIED: Added transition classes and removed text-center for mobile alignment */}
          <div className={`md:text-left transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              ENJOY A STAY OF UNIQUE HOSPITALITY
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              Accommodation
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>
          {/* MODIFIED: Added transition classes */}
          <div className={`text-center md:text-right transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button className="bg-secondary text-white font-secondary px-8 py-3 hover:bg-primary transition-colors duration-300 ">
              Discover All Rooms
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomData.map((room, index) => (
            // MODIFIED: Added transition classes and staggered delay style
            <div 
              key={index} 
              className={`bg-white border border-gray-200 group transition-all duration-500 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-primary text-primary mb-4">{room.title}</h3>

                <div className="flex items-center space-x-6 text-main-text/80 font-secondary border-y border-gray-200 py-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Ruler className="w-4 h-4 mr-2 text-secondary" />
                    <span>{room.size}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-2 text-secondary" />
                    <span>{room.guests}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <BedDouble className="w-4 h-4 mr-2 text-secondary" />
                    <span>{room.bed}</span>
                  </div>
                </div>

                <p className="text-main-text/70 font-secondary leading-relaxed mb-6">
                  {room.description}
                </p>

                <a href="#" className="font-secondary text-secondary font-semibold inline-flex items-center group/link">
                  Discover More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;