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

const ActivitiesPage = () => {
  const heroRef = useRef(null);
  const includedRef = useRef(null);
  const paidRef = useRef(null);
  const sustainabilityRef = useRef(null);
  
  const isHeroVisible = useOnScreen(heroRef);
  const isIncludedVisible = useOnScreen(includedRef);
  const isPaidVisible = useOnScreen(paidRef);
  const isSustainabilityVisible = useOnScreen(sustainabilityRef);

  const includedActivities = [
    {
      id: 1,
      title: "Song of the Woods",
      subtitle: "Forest Walk & Nature Talk",
      description: "Start your day in harmony with nature. This mindful walk is led by local naturalists who share insights about native Flora, Fauna, and Forest conservation. Designed to cultivate ecological awareness and respect for the western ghats biosphere.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Easy",
      groupSize: "6-12 people"
    },
    {
      id: 2,
      title: "Cups & Brew",
      subtitle: "Tea Tasting Ceremony",
      description: "A structured activity focused on evaluating the quality, flavor, and aroma of different teas. It involves careful observation of the tea leaves, the infused leaves, and the brewed liquor.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      duration: "1-2 hours",
      difficulty: "Easy",
      groupSize: "4-10 people"
    },
    {
      id: 3,
      title: "Fire & Stone",
      subtitle: "Tribal Cooking Class",
      description: "Enjoy tribal cooking classes led by our chef, who shares traditional recipes and techniques passed down through generations. This unique culinary experience offers a hands-on opportunity to learn about local ingredients, tribal culture, and heritage.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "4-8 people"
    },
    {
      id: 4,
      title: "Tiger Cave & Hanging Bridge",
      subtitle: "Adventure Walk",
      description: "Discover the nearby Tiger Cave, a short adventure from Toroland. Guests enjoy a scenic walk, cross a hanging bridge, and climb rocks to reach the legendary cave once home to a tiger. Surrounded by lush forest, it's a perfect blend of nature, folklore, and gentle adventure.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Moderate",
      groupSize: "6-10 people"
    },
    {
      id: 5,
      title: "Viripara Waterfalls",
      subtitle: "Natural Swimming",
      description: "Viripara Waterfalls, a nearby natural wonder, offers guests the joy of a refreshing shower under cascading waters and a quick swim. Surrounded by lush greenery, it's an inviting spot to unwind and connect with nature. The calm, shallow pools also make it a safe and ideal place for children to enjoy a cool dip.",
      image: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      duration: "Half day",
      difficulty: "Easy",
      groupSize: "Family friendly"
    },
    {
      id: 6,
      title: "Soulscape",
      subtitle: "Wellness Space",
      description: "Soulscape is a serene space at Toroland designed for wellness and reflection. Perfect for yoga, meditation, or simply unwinding, it invites guests to reconnect with mind and body. Thoughtfully inclusive, it also offers activities suitable for children, making it a holistic retreat for families and individuals alike.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
      duration: "Flexible",
      difficulty: "Easy",
      groupSize: "Individual/Group"
    }
  ];

  const paidActivities = [
    {
      id: 7,
      title: "Conscious Hours",
      subtitle: "Sunrise Experience",
      description: "Start your morning with a short trip to a nearby viewpoint, where breathtaking sunrise views await. Guests can sip a warm cup of tea or coffee and enjoy light snacks while watching the hills awaken. A serene, picture-perfect experience to begin the day in harmony with nature.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "4-12 people",
      price: "₹1,500 per person"
    },
    {
      id: 8,
      title: "Jungle Safari",
      subtitle: "Wildlife Adventure",
      description: "Embark on an exciting Jeep Safari from Toroland, exploring rolling tea gardens, scenic waterfalls, and thrilling off-road trails. The journey leads to Anakulam, famed for wild elephant sightings in their natural habitat. A perfect blend of adventure, nature, and unforgettable moments amidst Kerala's pristine landscapes.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      duration: "Full day",
      difficulty: "Moderate",
      groupSize: "4-6 people",
      price: "₹3,500 per person"
    },
    {
      id: 9,
      title: "Bush Dinner",
      subtitle: "Unique Dining Experience",
      description: "As the sun sets and the forest glows with golden light, we welcome you to a truly unique dining experience—Bush Dinner. Nestled deep within the jungle, the warmth of a crackling bonfire and the aroma of earthy spices set the stage for an unforgettable evening. Guided by local tribal wisdom, our chefs bring heritage to life through stone-grilling, bamboo cooking, and age-old techniques passed down through generations.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "6-12 people",
      price: "₹4,500 per person"
    },
    {
      id: 10,
      title: "Tuk Tuk Chai",
      subtitle: "Tea Trails Adventure",
      description: "Discover the soul of Toroland with our Tuk Tuk Tea Trails. Ride through winding hills with a local guide, exploring tea plantations and scenic countryside. Enjoy stories, traditions, and a picnic with fresh tea, coffee, and snacks—an authentic journey blending culture, flavors, and the charm of local life.",
      image: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&q=80",
      duration: "Half day",
      difficulty: "Easy",
      groupSize: "4-8 people",
      price: "₹2,500 per person"
    }
  ];

  const additionalActivities = [
    {
      title: "Whispering Pages",
      description: "Our cozy library offers books for all ages, inviting guests to relax and read amidst nature's calm. With our unique book-swap tradition, travelers can exchange finished reads for new ones, keeping the collection fresh and ever-changing.",
      icon: "📚"
    },
    {
      title: "Indoor Games",
      description: "A variety of indoor games are thoughtfully selected to entertain guests of all ages. From board games, card games & Toys for the little ones. These activities promote fun, relaxation, and bonding.",
      icon: "🎯"
    },
    {
      title: "Sprouts",
      description: "A unique and heartwarming program where both young children and adults take part in planting microgreens, a hands-on way to create awareness about sustainability, food origins, and the joy of growing what we eat.",
      icon: "🌱"
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
          backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Our Activities</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            Every activity is a step toward regenerative tourism, where luxury meets responsibility
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-secondary text-secondary tracking-widest uppercase mb-4">
            Regenerative Experiences
          </p>
          <h2 className="text-4xl md:text-5xl font-primary text-primary mb-8">
            Luxury That Heals the Earth
          </h2>
          <div className="w-24 h-[2px] bg-secondary mx-auto mb-8"></div>
          <div className="space-y-6 text-lg font-secondary text-main-text/80 leading-relaxed">
            <p>
              At Toroland, every activity is a step toward regenerative tourism. We believe luxury doesn't have to cost the Earth. From food to footprints, our experiences are designed to enrich the traveler and restore the land.
            </p>
            <p>
              From nature walks and cultural immersions to fun-filled games and interactive sessions, our activities are thoughtfully planned to suit every mood and every guest. While many of these experiences are included in your package, a few special ones come with an additional charge, ensuring you have the freedom to choose what delights you the most.
            </p>
            <p>
              Every moment at Toroland is an opportunity to create memories—whether it's embracing the wilderness, learning something new, understanding sustainability, or simply having fun together.
            </p>
          </div>
        </div>
      </section>

      {/* Included Activities */}
      <section ref={includedRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 transform ${
            isIncludedVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Included in Your Package
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Rooted in Responsibility
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {includedActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-background shadow-xl transition-all duration-700 transform hover:scale-105 ${
                  isIncludedVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary text-light px-3 py-1 text-xs font-secondary font-semibold">
                      INCLUDED
                    </span>
                    <span className="text-secondary font-secondary text-sm font-semibold">
                      {activity.duration}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-primary text-primary mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-secondary font-secondary font-semibold mb-4">
                    {activity.subtitle}
                  </p>
                  <p className="text-main-text/80 font-secondary leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex gap-4">
                      <span className="text-main-text/60">
                        <strong>Difficulty:</strong> {activity.difficulty}
                      </span>
                      <span className="text-main-text/60">
                        <strong>Group:</strong> {activity.groupSize}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paid Activities */}
      <section ref={paidRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-700 transform ${
            isPaidVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <p className="font-secondary text-secondary tracking-widest uppercase mb-2">
              Premium Experiences
            </p>
            <h2 className="text-4xl md:text-5xl font-primary text-primary mb-6">
              Our Conscious Hours
            </h2>
            <div className="w-24 h-[2px] bg-secondary mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {paidActivities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-light shadow-xl transition-all duration-700 transform hover:scale-105 ${
                  isPaidVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-secondary text-light px-3 py-1 text-xs font-secondary font-semibold">
                        PREMIUM
                      </span>
                      <span className="text-primary font-secondary text-sm font-semibold">
                        {activity.duration}
                      </span>
                    </div>
                    <span className="text-2xl font-primary text-primary">
                      {activity.price}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-primary text-primary mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-secondary font-secondary font-semibold mb-4">
                    {activity.subtitle}
                  </p>
                  <p className="text-main-text/80 font-secondary leading-relaxed mb-6">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-sm text-main-text/60">
                      <span>
                        <strong>Difficulty:</strong> {activity.difficulty}
                      </span>
                      <span>
                        <strong>Group:</strong> {activity.groupSize}
                      </span>
                    </div>
                    <button className="bg-primary text-light px-6 py-2 font-secondary font-semibold text-sm hover:bg-secondary transition-colors">
                      BOOK NOW
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      

     

      <Footer />
    </div>
  );
};

export default ActivitiesPage;
