import { useState, useEffect } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import GalleryHero from "../components/gallery/GalleryHero";
import FilterSection from "../components/gallery/FilterSection";
import GalleryGrid from "../components/gallery/GalleryGrid";
import LightboxModal from "../components/gallery/LightboxModal";
import CallToAction from "../components/gallery/CallToAction";
import { supabaseHelpers } from "../config/supabase";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      const data = await supabaseHelpers.getGalleryImages();
      // Transform data to match component format
      const formattedImages = data
        .map(img => ({
          id: img.id,
          src: img.image_url,
          category: img.category || 'all',
          title: img.title || "Toroland Gallery",
          description: img.description || ''
        }));
        console.log('Formatted gallery images:', formattedImages); // Debug log
      setImages(formattedImages);
    } catch (error) {
      console.error('Error loading gallery images:', error);
      setImages([]);
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

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'nature', name: 'Nature' },
    { id: 'accommodation', name: 'Accommodation' },
    { id: 'activities', name: 'Activities' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <GalleryHero />
      <FilterSection 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        categories={categories} 
      />
      <GalleryGrid 
        filteredImages={filteredImages} 
        setSelectedImage={setSelectedImage} 
      />
      <LightboxModal 
        selectedImage={selectedImage} 
        setSelectedImage={setSelectedImage} 
      />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Gallery;
