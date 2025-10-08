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

const Gallery = () => {
  const heroRef = useRef(null);
  const galleryRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const isHeroVisible = useOnScreen(heroRef);
  const isGalleryVisible = useOnScreen(galleryRef);

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
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`relative z-10 text-center text-white px-4 max-w-4xl transition-all duration-1000 transform ${
          isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-primary mb-6">Gallery</h1>
          <p className="text-xl md:text-2xl font-secondary leading-relaxed">
            Capturing the essence of Munnar's natural beauty and our sustainable luxury experiences
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-8 py-3 font-secondary font-semibold tracking-wider transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-primary text-light shadow-lg'
                    : 'bg-light text-primary hover:bg-secondary hover:text-light'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-12 px-4 sm:px-6 lg:px-8 bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`group cursor-pointer overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${
                  isGalleryVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-lg font-primary mb-2">{image.title}</h3>
                      <p className="text-sm font-secondary opacity-90">{image.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-accent transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-6">
              <h3 className="text-xl font-primary mb-2">{selectedImage.title}</h3>
              <p className="font-secondary">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center text-light">
          <h2 className="text-4xl md:text-5xl font-primary mb-6">
            Experience It Yourself
          </h2>
          <p className="text-xl font-secondary mb-8 leading-relaxed">
            These moments are waiting for you. Book your sustainable luxury experience at Toroland today.
          </p>
          <button className="bg-light text-primary px-8 py-4 font-secondary font-semibold tracking-wider hover:bg-accent hover:text-light transition-all duration-300 shadow-lg hover:shadow-xl">
            BOOK NOW
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
