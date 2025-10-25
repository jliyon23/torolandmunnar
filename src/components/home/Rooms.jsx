import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Ruler, Users, BedDouble } from "lucide-react";
import { supabaseHelpers } from "../../config/supabase";

// --- Custom Hook for Intersection Observer ---
const useOnScreen = (ref, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(true); // Start as TRUE

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once visible, keep it visible (don't revert to false)
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

const Rooms = () => {
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await supabaseHelpers.getRooms();
      console.log('Raw room data from database:', data);
      
      // Check what fields are available
      if (data && data.length > 0) {
        console.log('First room fields:', Object.keys(data[0]));
        console.log('First room gallery_images:', data[0].gallery_images);
      }
      
      // Only show published rooms and map to correct field names
      const formattedRooms = data
        .filter(room => room.is_published)
        .map(room => ({
          id: room.id,
          title: room.title,
          description: room.description,
          image: room.image,
          size: room.room_size || room.size || 'Spacious',
          guests: `${room.max_guests || room.max_occupancy || 2} Guests`,
          bed: room.bed_type || room.bed || 'Comfortable Bed',
          galleryImages: room.gallery_images || []
        }));
      
      console.log('Loaded gallery images:', formattedRooms.map(room => room.galleryImages));
      setRooms(formattedRooms);
      console.log('Rooms loaded:', formattedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </section>
    );
  }

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
        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {rooms.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-main-text/70 font-secondary">No rooms available at the moment.</p>
            </div>
          ) : (
            rooms.map((room, index) => (
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

                <Link to={`/room/${room.id}`} className="font-secondary text-secondary font-semibold inline-flex items-center group/link">
                  Discover More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Rooms;