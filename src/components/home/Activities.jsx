import { useState, useEffect, useRef } from "react";

// Activities data with web images
const activitiesData = [
  {
    id: 1,
    title: "Song of the Woods",
    subtitle: "Forest walk & Nature Talk",
    description: "Start your day in harmony with nature. This mindful walk is led by local naturalists who share insights about native Flora, Fauna, and Forest conservation.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    color: "bg-accent"
  },
  {
    id: 2,
    title: "Cups & Brew",
    subtitle: "Tea Tasting Ceremony",
    description: "A structured activity focused on evaluating the quality, flavor, and aroma of different teas with careful observation and tasting.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    color: "bg-primary"
  },
  {
    id: 3,
    title: "Fire & Stone",
    subtitle: "Tribal Cooking Class",
    description: "Enjoy tribal cooking classes led by our chef, sharing traditional recipes and techniques passed down through generations.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    color: "bg-secondary"
  },
  {
    id: 4,
    title: "Tiger Cave Adventure",
    subtitle: "Hanging Bridge Visit",
    description: "Discover the nearby Tiger Cave with a scenic walk, cross a hanging bridge, and climb rocks to reach the legendary cave.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    color: "bg-accent"
  },
  {
    id: 5,
    title: "Viripara Waterfalls",
    subtitle: "Natural Wonder",
    description: "Enjoy a refreshing shower under cascading waters and a quick swim surrounded by lush greenery.",
    type: "Included",
    imageUrl: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
    color: "bg-primary"
  },
  {
    id: 6,
    title: "Jungle Safari",
    subtitle: "Wildlife Adventure",
    description: "Embark on an exciting Jeep Safari exploring tea gardens, waterfalls, and thrilling off-road trails to Anakulam.",
    type: "Paid",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
    color: "bg-secondary"
  },
  {
    id: 7,
    title: "Bush Dinner",
    subtitle: "Unique Dining Experience",
    description: "A truly unique dining experience nestled deep within the jungle with stone-grilling and bamboo cooking.",
    type: "Paid",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    color: "bg-accent"
  },
  {
    id: 8,
    title: "Tuk Tuk Chai",
    subtitle: "Tea Trails Adventure",
    description: "Ride through winding hills with a local guide, exploring tea plantations and scenic countryside.",
    type: "Paid",
    imageUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&q=80",
    color: "bg-primary"
  }
];

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

const Activities = () => {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(true);
  const isVisible = useOnScreen(sectionRef);

  // Auto scroll effect for 3D carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (!showAll && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % Math.min(4, activitiesData.length);
        setActiveIndex(nextIndex);
        
        const scrollAmount = nextIndex * (window.innerWidth > 768 ? 350 : 280);
        scrollRef.current.scrollTo({
          left: scrollAmount,
          behavior: 'smooth'
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, showAll]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = window.innerWidth > 768 ? 350 : 280;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };

  const displayedActivities = showAll ? activitiesData : activitiesData.slice(0, 4);

  return (
    <section ref={sectionRef} id="activities" className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Regenerative Tourism
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Our Activities
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto mb-6"></div>
          </div>
          
          <div className={`transition-all duration-700 delay-200 transform max-w-4xl mx-auto ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-main-text/80 font-secondary text-lg leading-relaxed mb-4">
              At Toroland, every activity is a step toward regenerative tourism. We believe luxury doesn't have to cost the Earth. From food to footprints, our experiences are designed to enrich the traveler and restore the land.
            </p>
            <p className="text-main-text/70 font-secondary text-base">
              From nature walks and cultural immersions to fun-filled games and interactive sessions, our activities are thoughtfully planned to suit every mood and every guest.
            </p>
          </div>
        </div>

        {/* 3D Horizontal Scroll Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar pb-8 scroll-smooth"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {displayedActivities.map((activity, index) => {
              const isCenter = index === activeIndex;
              const isAdjacent = Math.abs(index - activeIndex) === 1;
              
              return (
                <div
                  key={activity.id}
                  className={`flex-shrink-0 transition-all duration-500 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                  } ${
                    isCenter 
                      ? 'scale-105 z-20 shadow-2xl' 
                      : isAdjacent 
                        ? 'scale-95 z-10 shadow-lg' 
                        : 'scale-90 z-0 shadow-md'
                  }`}
                  style={{ 
                    scrollSnapAlign: 'center',
                    transitionDelay: `${index * 100}ms`,
                    width: window.innerWidth > 768 ? '320px' : '260px'
                  }}
                >
                  <div className="relative group cursor-pointer">
                    {/* Activity Type Badge */}
                    <div className={`absolute top-4 right-4 z-30 px-3 py-1 rounded text-xs font-secondary font-semibold text-light ${
                      activity.type === 'Included' ? 'bg-secondary' : 'bg-primary'
                    }`}>
                      {activity.type}
                    </div>

                    {/* Image Container */}
                    <div className="relative overflow-hidden h-64 bg-gray-200">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    {/* Content Card */}
                    <div className={`relative ${activity.color} p-6 text-light min-h-[200px]`}>
                      <h3 className="text-xl font-primary mb-2 text-light">
                        {activity.title}
                      </h3>
                      <p className="text-light/90 font-secondary text-sm mb-3 font-semibold">
                        {activity.subtitle}
                      </p>
                      <p className="text-light/80 font-secondary text-sm leading-relaxed">
                        {activity.description}
                      </p>
                      
                      {/* Decorative Element */}
                      <div className="absolute bottom-4 right-6">
                        <div className="w-8 h-8 rounded-full bg-light/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.min(4, activitiesData.length) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  if (scrollRef.current) {
                    const scrollAmount = index * (window.innerWidth > 768 ? 350 : 280);
                    scrollRef.current.scrollTo({
                      left: scrollAmount,
                      behavior: 'smooth'
                    });
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-primary scale-125' : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className={`inline-flex items-center gap-3 px-8 py-4 bg-primary text-light font-secondary font-semibold transition-all duration-300 hover:bg-secondary hover:scale-105 shadow-lg hover:shadow-xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {showAll ? 'Show Less Activities' : 'View More Activities'}
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Carbon Neutral Message */}
        <div className={`mt-16 text-center transition-all duration-700 delay-400 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-background/50 backdrop-blur-sm p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-primary text-primary mb-4">Zero Footprints - Carbon Neutral Stay</h3>
            <p className="text-main-text/80 font-secondary leading-relaxed">
              Every experience, from your room to your jeep ride, is part of our measured sustainability plan. We calculate and offset your entire stay's emissions via certified programs, and we encourage guests to contribute to local tree planting and clean water initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
