import { useState, useEffect } from "react";
import { supabaseHelpers } from "../../config/supabase";

export default function Hero() {
  const [heroSettings, setHeroSettings] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHeroSettings();
  }, []);

  const loadHeroSettings = async () => {
    try {
      const settings = await supabaseHelpers.getHeroSettings();
      setHeroSettings(settings);
    } catch (error) {
      console.error('Error loading hero settings:', error);
      // Fallback to default
      setHeroSettings({
        type: 'video',
        video_url: 'https://res.cloudinary.com/dlgdmu6gq/video/upload/v1755532928/wedsite_zqa7ym.webm',
        images: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-rotate carousel images
  useEffect(() => {
    if (heroSettings?.type === 'image' && heroSettings?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroSettings.images.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [heroSettings]);

  if (loading) {
    return (
      <section className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      {heroSettings?.type === 'video' ? (
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source
            src={heroSettings.video_url || 'https://res.cloudinary.com/dlgdmu6gq/video/upload/v1755532928/wedsite_zqa7ym.webm'}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      ) : heroSettings?.images && heroSettings.images.length > 0 ? (
        <>
          {heroSettings.images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Toroland Hero ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </>
      ) : (
        <img
          src="https://res.cloudinary.com/dlgdmu6gq/image/upload/v1756795607/5_uvx5wt.jpg"
          alt="Toroland Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Bottom gradient overlay */}
      {/* <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black via-black/70 to-transparent z-5"></div> */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent z-5"></div>

      {/* All Text at Bottom */}
      <div className="absolute bottom-10 w-full flex flex-col items-center text-center text-white z-10 px-4">
        <h1 className="text-xl md:text-3xl font-bold font-primary mb-3 text-secondary">
          Welcome to Toroland Munnar
        </h1>

        {/* Quote */}
        <p className="italic text-md md:text-xl font-secondary text-accent">
          “Awake to whispers of the forest, rest in conscious elegance.”
        </p>
      </div>
    </section>
  );
}
