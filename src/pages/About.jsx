import { useState, useEffect, useRef } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

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

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const visionRef = useRef(null);
  const teamRef = useRef(null);
  
  const isHeroVisible = useOnScreen(heroRef);
  const isStoryVisible = useOnScreen(storyRef);
  const isVisionVisible = useOnScreen(visionRef);
  const isTeamVisible = useOnScreen(teamRef);

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Director",
      description: "A passionate advocate for sustainable tourism with over 15 years of experience in hospitality.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
    },
    {
      name: "Priya Nair",
      role: "Head of Operations",
      description: "Expert in eco-friendly operations and guest experience management.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80"
    },
    {
      name: "Arjun Thomas",
      role: "Nature Guide & Conservationist",
      description: "Local naturalist with deep knowledge of Western Ghats ecosystem and wildlife.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Our Story</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            Where luxury meets responsibility in the heart of Munnar
          </p>
        </div>
      </section>

      {/* Story Section */}
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

      {/* Vision & Mission */}
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

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Our Values
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sustainability",
                description: "Every decision we make considers its impact on the environment and future generations.",
                icon: "🌱"
              },
              {
                title: "Authenticity",
                description: "We celebrate and preserve local culture, traditions, and natural heritage.",
                icon: "🏛️"
              },
              {
                title: "Community",
                description: "We believe in empowering local communities and creating shared prosperity.",
                icon: "🤝"
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-light">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="text-2xl font-primary text-primary mb-4">{value.title}</h3>
                <p className="font-secondary text-main-text/80 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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

      <Footer />
    </div>
  );
};

export default About;
