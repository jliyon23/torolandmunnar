import { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ActivitiesHero from "../components/activities/ActivitiesHero";
import IntroSection from "../components/activities/IntroSection";
import IncludedActivities from "../components/activities/IncludedActivities";
import PaidActivities from "../components/activities/PaidActivities";
import { supabaseHelpers } from "../config/supabase";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await supabaseHelpers.getActivities();
      console.log('Fetched activities:', data); // Debug log
      
      // Transform data to match component format
      const formattedActivities = data
        .filter(activity => activity.is_published)
        .map(activity => ({
          id: activity.id,
          title: activity.title,
          subtitle: activity.subtitle || '',
          description: activity.description,
          image: activity.image_url,
          duration: activity.duration || '2-3 hours',
          difficulty: activity.difficulty || 'Easy',
          groupSize: activity.group_size || '4-8 people',
          price: activity.price || null,
          isIncluded: !activity.price || activity.price.trim() === '' || activity.price === '0'
        }));
      
      console.log('Formatted activities:', formattedActivities); // Debug log
      setActivities(formattedActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <ActivitiesHero />
      <IntroSection />
      <IncludedActivities activities={activities} />
      <Footer />
    </div>
  );
};

export default ActivitiesPage;
