import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ActivitiesHero from "../components/activities/ActivitiesHero";
import IntroSection from "../components/activities/IntroSection";
import IncludedActivities from "../components/activities/IncludedActivities";
import PaidActivities from "../components/activities/PaidActivities";

const ActivitiesPage = () => {

  const includedActivities = [
    {
      id: 1,
      title: "Song of the Woods",
      subtitle: "Forest Walk & Nature Talk",
      description:
        "Start your day in harmony with nature. This mindful walk is led by local naturalists who share insights about native flora, fauna, and forest conservation. Designed to cultivate ecological awareness and respect for the Western Ghats biosphere.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Easy",
      groupSize: "6-12 people"
    },
    {
      id: 2,
      title: "Cups & Brew",
      subtitle: "Tea Tasting Ceremony",
      description:
        "A structured activity focused on evaluating the quality, flavor, and aroma of different teas. It involves careful observation of the tea leaves, the infused leaves, and the brewed liquor.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      duration: "1-2 hours",
      difficulty: "Easy",
      groupSize: "4-10 people"
    },
    {
      id: 3,
      title: "Fire & Stone",
      subtitle: "Tribal Cooking Class",
      description:
        "Enjoy tribal cooking classes led by our chef, who shares traditional recipes and techniques passed down through generations. This hands-on experience lets you learn about local ingredients, tribal culture, and heritage.",
      image: "https://images.unsplash.com/photo-1625398407792-5f49df94e76f?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Moderate",
      groupSize: "4-8 people"
    },
    {
      id: 4,
      title: "Tiger Cave & Hanging Bridge Visit",
      subtitle: "Nature & Folklore Adventure",
      description:
        "Discover the nearby Tiger Cave on a scenic walk crossing a hanging bridge and gentle rock climbs to reach the legendary cave once home to a tiger. A perfect blend of nature, folklore, and gentle adventure.",
      image: "https://images.unsplash.com/photo-1562347810-1f5c3b7c0a59?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Moderate",
      groupSize: "4-10 people"
    },
    {
      id: 5,
      title: "Viripara Waterfalls",
      subtitle: "Waterfall Visit & Nature Dip",
      description:
        "Viripara Waterfalls offers guests the joy of a refreshing shower under cascading waters and a quick swim. Surrounded by lush greenery, it’s an inviting spot to unwind, relax, and connect with nature.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Easy",
      groupSize: "6-12 people"
    },
    {
      id: 6,
      title: "Soulscape",
      subtitle: "Yoga & Meditation Space",
      description:
        "Soulscape is a serene space designed for yoga, meditation, or simple relaxation. It invites guests to reconnect with mind and body and also offers inclusive activities for children, creating a holistic retreat for all.",
      image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
      duration: "1-2 hours",
      difficulty: "Easy",
      groupSize: "4-10 people"
    },
    {
      id: 7,
      title: "Whispering Pages",
      subtitle: "In-House Library",
      description:
        "Our cozy library offers books for all ages, inviting guests to relax and read amidst nature’s calm. With a unique book-swap tradition, travelers can exchange finished reads for new ones, connecting through stories from around the world.",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      duration: "Open hours",
      difficulty: "Easy",
      groupSize: "Individual or small groups"
    },
    {
      id: 8,
      title: "Indoor Games",
      subtitle: "Fun & Relaxation Activities",
      description:
        "A variety of indoor games like board games, cards, and toys for children—perfect for fun, bonding, and relaxation among families and friends.",
      image: "https://images.unsplash.com/photo-1627308595190-31d97e64cf75?w=800&q=80",
      duration: "Flexible",
      difficulty: "Easy",
      groupSize: "2-8 people"
    },
    {
      id: 9,
      title: "Sprouts",
      subtitle: "Microgreen Farming",
      description:
        "A unique and heartwarming program where children and adults plant microgreens, learning about sustainability, food origins, and the joy of growing what we eat.",
      image: "https://images.unsplash.com/photo-1600471973337-64a6b8e9a6c1?w=800&q=80",
      duration: "1 hour",
      difficulty: "Easy",
      groupSize: "4-10 people"
    }
  ];

  const paidActivities = [
    {
      id: 10,
      title: "Conscious Hours",
      subtitle: "Sunrise Experience",
      description:
        "Start your morning with a short trip to a nearby viewpoint, where breathtaking sunrise views await. Enjoy tea, coffee, and light snacks while watching the hills awaken—a serene experience to begin the day.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "4-12 people",
      price: "₹1,500 per person"
    },
    {
      id: 11,
      title: "Jungle Safari",
      subtitle: "Wildlife Adventure",
      description:
        "Embark on an exciting Jeep Safari exploring tea gardens, waterfalls, and off-road trails leading to Anakulam—famed for wild elephant sightings. A perfect blend of adventure and nature.",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      duration: "Full day",
      difficulty: "Moderate",
      groupSize: "4-6 people",
      price: "₹3,500 per person"
    },
    {
      id: 12,
      title: "Bush Dinner",
      subtitle: "Forest Dining Experience",
      description:
        "As the sun sets, enjoy a jungle dining experience with bonfire warmth, earthy aromas, and traditional tribal cooking using bamboo and stone-grilling methods. Guests can join in the preparation and savor authentic dishes under the stars.",
      image: "https://images.unsplash.com/photo-1529692236671-f1dc28e48c2b?w=800&q=80",
      duration: "3-4 hours",
      difficulty: "Easy",
      groupSize: "4-10 people",
      price: "₹2,500 per person"
    },
    {
      id: 13,
      title: "Tuk Tuk Chai",
      subtitle: "Tea Trails & Local Ride",
      description:
        "Ride through winding hills in a Tuk Tuk, exploring tea plantations and countryside views. Enjoy stories, traditions, and a picnic with tea, coffee, and snacks—a blend of culture, flavors, and fun.",
      image: "https://images.unsplash.com/photo-1610032912441-48a4ac29f10f?w=800&q=80",
      duration: "2-3 hours",
      difficulty: "Easy",
      groupSize: "2-4 people",
      price: "₹1,200 per person"
    }
  ];


  return (
    <div className="min-h-screen">
      <Navbar />
      <ActivitiesHero />
      <IntroSection />
      <IncludedActivities activities={includedActivities} />
      <PaidActivities activities={paidActivities} />
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
