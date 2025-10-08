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

const Stay = () => {
  const heroRef = useRef(null);
  const roomsRef = useRef(null);
  const amenitiesRef = useRef(null);
  const sustainabilityRef = useRef(null);
  
  const isHeroVisible = useOnScreen(heroRef);
  const isRoomsVisible = useOnScreen(roomsRef);
  const isAmenitiesVisible = useOnScreen(amenitiesRef);
  const isSustainabilityVisible = useOnScreen(sustainabilityRef);

  const roomTypes = [
    {
      id: 1,
      name: "Forest View Suite",
      description: "Spacious suites with panoramic forest views, perfect for couples seeking tranquility.",
      features: ["King Size Bed", "Private Balcony", "Forest Views", "En-suite Bathroom", "Eco-friendly Amenities"],
      size: "450 sq ft",
      occupancy: "2 Adults",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=800&q=80",
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Valley View Cottage",
      description: "Independent cottages offering stunning valley views and complete privacy.",
      features: ["Queen Size Bed", "Living Area", "Valley Views", "Kitchenette", "Garden Access"],
      size: "550 sq ft",
      occupancy: "2-3 Adults",
      price: "₹15,000",
      image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
      color: "bg-secondary"
    },
    {
      id: 3,
      name: "Family Villa",
      description: "Spacious villas designed for families, with multiple bedrooms and common areas.",
      features: ["2 Bedrooms", "Living Room", "Dining Area", "Kitchen", "Private Garden"],
      size: "850 sq ft",
      occupancy: "4-6 Adults",
      price: "₹25,000",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      color: "bg-accent"
    }
  ];

  const amenities = [
    {
      icon: "🌿",
      title: "Eco-Friendly Design",
      description: "Sustainable architecture using local materials and renewable energy"
    },
    {
      icon: "🍃",
      title: "Organic Gardens",
      description: "Fresh herbs and vegetables grown in our permaculture gardens"
    },
    {
      icon: "💧",
      title: "Rainwater Harvesting",
      description: "Complete water conservation system with natural filtration"
    },
    {
      icon: "🧘",
      title: "Wellness Spaces",
      description: "Dedicated areas for yoga, meditation, and holistic healing"
    },
    {
      icon: "🔥",
      title: "Traditional Cooking",
      description: "Stone ovens and traditional cooking methods for authentic flavors"
    },
    {
      icon: "📚",
      title: "Nature Library",
      description: "Curated collection of books on ecology, culture, and mindfulness"
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
          backgroundImage: "url('https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Stay With Us</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            Sustainable luxury accommodations in harmony with nature
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-secondary text-secondary tracking-widest uppercase mb-4">
            Eco-Luxury Accommodation
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-8">
            Where Comfort Meets Consciousness
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto mb-8"></div>
          <p className="text-lg font-secondary text-main-text/80 leading-relaxed">
            Our accommodations are thoughtfully designed to minimize environmental impact while maximizing comfort and connection with nature. Each room tells a story of sustainable luxury, crafted with local materials and powered by renewable energy.
          </p>
        </div>
      </section>

      {/* Room Types */}
      <section ref={roomsRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 transform ${
            isRoomsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Choose Your Sanctuary
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
          </div>

          <div className="space-y-16">
            {roomTypes.map((room, index) => (
              <div
                key={room.id}
                className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-700 transform ${
                  isRoomsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full aspect-[4/3] object-cover shadow-2xl"
                  />
                </div>
                
                <div className={`${room.color} p-12 text-light ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                  <h3 className="text-3xl font-primary mb-4">{room.name}</h3>
                  <p className="text-light/90 font-secondary text-lg mb-6 leading-relaxed">
                    {room.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="font-semibold">Size:</span> {room.size}
                    </div>
                    <div>
                      <span className="font-semibold">Occupancy:</span> {room.occupancy}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Features:</h4>
                    <ul className="space-y-2 text-light/90">
                      {room.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-light/60 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-primary">{room.price}</span>
                      <span className="text-light/70"> / night</span>
                    </div>
                    <button className="bg-light text-primary px-6 py-3 font-secondary font-semibold hover:bg-accent hover:text-light transition-all duration-300">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* Sustainability Commitment */}
      <section ref={sustainabilityRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-light">
          <div className={`transition-all duration-700 transform ${
            isSustainabilityVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className="text-4xl md:text-5xl font-primary mb-8">
              Our Sustainability Promise
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-primary mb-2">100%</div>
                <p className="font-secondary">Carbon Neutral</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-primary mb-2">0</div>
                <p className="font-secondary">Single-Use Plastics</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-primary mb-2">90%</div>
                <p className="font-secondary">Local Sourcing</p>
              </div>
            </div>
            <p className="text-xl font-secondary leading-relaxed mb-8">
              Every aspect of your stay contributes to our regenerative mission. From solar-powered rooms to organic amenities, we ensure your comfort comes with a positive environmental impact.
            </p>
            <button className="bg-light text-primary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-secondary hover:text-light transition-all duration-300 shadow-lg">
              LEARN MORE ABOUT OUR MISSION
            </button>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center text-light">
          <h2 className="text-4xl md:text-5xl font-primary mb-6">
            Ready to Experience Sustainable Luxury?
          </h2>
          <p className="text-xl font-secondary mb-8 leading-relaxed">
            Book your stay and become part of our regenerative tourism story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-light text-secondary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-primary hover:text-light transition-all duration-300 shadow-lg">
              CHECK AVAILABILITY
            </button>
            <button className="border-2 border-light text-light px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-light hover:text-secondary transition-all duration-300">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Stay;
