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

const RoomsSection = () => {
  const roomsRef = useRef(null);
  const isRoomsVisible = useOnScreen(roomsRef);

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

  return (
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
  );
};

export default RoomsSection;
