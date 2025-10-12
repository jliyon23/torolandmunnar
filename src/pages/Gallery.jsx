import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import GalleryHero from "../components/gallery/GalleryHero";
import FilterSection from "../components/gallery/FilterSection";
import GalleryGrid from "../components/gallery/GalleryGrid";
import LightboxModal from "../components/gallery/LightboxModal";
import CallToAction from "../components/gallery/CallToAction";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      category: "nature",
      title: "Misty Mountains",
      description: "Early morning mist over the Western Ghats"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      category: "nature",
      title: "Forest Trails",
      description: "Lush forest paths leading to hidden treasures"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      category: "activities",
      title: "Tea Gardens",
      description: "Rolling tea plantations as far as the eye can see"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      category: "nature",
      title: "Pristine Waterfalls",
      description: "Crystal clear waters cascading through rocks"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1586227740560-8cf2732c1531?w=800&q=80",
      category: "accommodation",
      title: "Luxury Suites",
      description: "Elegantly designed rooms with nature views"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      category: "activities",
      title: "Culinary Experiences",
      description: "Traditional cooking classes and local cuisine"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80",
      category: "activities",
      title: "Wildlife Safari",
      description: "Adventure through pristine wilderness"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800&q=80",
      category: "accommodation",
      title: "Eco Cottages",
      description: "Sustainable architecture blending with nature"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      category: "activities",
      title: "Bush Dinners",
      description: "Unique dining experiences under the stars"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&q=80",
      category: "activities",
      title: "Cultural Tours",
      description: "Immersive local culture experiences"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&q=80",
      category: "accommodation",
      title: "Wellness Spaces",
      description: "Serene spaces for yoga and meditation"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      category: "nature",
      title: "Sunset Views",
      description: "Breathtaking sunsets over the valleys"
    }
  ];

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
