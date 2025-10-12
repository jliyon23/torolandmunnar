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

const TeamSection = () => {
  const teamRef = useRef(null);
  const isTeamVisible = useOnScreen(teamRef);

  const teamMembers = [
    {
      name: "abc",
      role: "Founder & Director",
      description: "A passionate advocate for sustainable tourism with over 15 years of experience in hospitality.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
    },
    {
      name: "abcd",
      role: "Head of Operations",
      description: "Expert in eco-friendly operations and guest experience management.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80"
    },
    {
      name: "abcde",
      role: "Nature Guide & Conservationist",
      description: "Local naturalist with deep knowledge of Western Ghats ecosystem and wildlife.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    }
  ];

  return (
    <section ref={teamRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
            Meet Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
            The People Behind Toroland
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-700 transform ${
                isTeamVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-48 h-48 mx-auto object-cover mb-6"
              />
              <h3 className="text-2xl font-primary text-primary mb-2">{member.name}</h3>
              <p className="font-secondary text-secondary font-semibold mb-4">{member.role}</p>
              <p className="font-secondary text-main-text/80 leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
