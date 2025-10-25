// src/components/Activities.jsx
import { useState, useRef, useEffect } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const activitiesData = [
  {
    id: 1,
    title: "Song of the Woods",
    subtitle: "Forest walk & Nature Talk",
    description: "Start your day in harmony with nature. This mindful walk is led by local naturalists who share insights about native Flora, Fauna, and Forest conservation.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
  },
  {
    id: 2,
    title: "Cups & Brew",
    subtitle: "Tea Tasting Ceremony",
    description: "A structured activity focused on evaluating the quality, flavor, and aroma of different teas with careful observation and tasting.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
  },
  {
    id: 3,
    title: "Fire & Stone",
    subtitle: "Tribal Cooking Class",
    description: "Enjoy tribal cooking classes led by our chef, sharing traditional recipes and techniques passed down through generations.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
  },
  {
    id: 4,
    title: "Tiger Cave Adventure",
    subtitle: "Hanging Bridge Visit",
    description: "Discover the nearby Tiger Cave with a scenic walk, cross a hanging bridge, and climb rocks to reach the legendary cave.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
  },
  {
    id: 5,
    title: "Viripara Waterfalls",
    subtitle: "Natural Wonder",
    description: "Enjoy a refreshing shower under cascading waters and a quick swim surrounded by lush greenery.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80"
  },
  {
    id: 6,
    title: "Jungle Safari",
    subtitle: "Wildlife Adventure",
    description: "Embark on an exciting Jeep Safari exploring tea gardens, waterfalls, and thrilling off-road trails to Anakulam.",
    type: "Paid",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80"
  }
];
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

const Activities = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const isVisible = useOnScreen(sectionRef); 

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section id="activities" className="py-20 px-4 md:px-8 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-20">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              GREAT ADVENTURES
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary">
              Our Activities
            </h2>
            <div className="w-24 h-[2px] bg-secondary mt-4"></div>
          </div>
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed">
              At Toroland, every activity is a step toward regenerative tourism. We believe luxury doesn't have to cost the Earth. 
            Our experiences are designed to enrich the traveler and restore the land.
            </p>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Navigation Arrows - Positioned above the scroll container */}
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={scrollLeft}
              className="bg-white border border-gray-300 p-3 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            
            <button 
              onClick={scrollRight}
              className="bg-white border border-gray-300 p-3 hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <ArrowRight size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide"
          >
            {activitiesData.map((activity) => (
              <div 
                key={activity.id}
                className="flex-shrink-0 w-80 bg-white border border-gray-200 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  {/* <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-semibold font-secondary ${
                      activity.type === 'Included' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-amber-600 text-white'
                    }`}>
                      {activity.type}
                    </span>
                  </div> */}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 font-primary">
                    {activity.title}
                  </h3>
                  <p className="text-amber-600 font-medium text-sm mb-3 font-secondary">
                    {activity.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Neutral Message */}
        <div className="mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-gray-50 p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-primary">
              Zero Footprints - Carbon Neutral Stay
            </h3>
            <p className="text-gray-600 leading-relaxed font-secondary">
              Every experience is part of our measured sustainability plan. We calculate and offset your entire stay's emissions, 
              and encourage guests to contribute to local tree planting and clean water initiatives.
            </p>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Activities;