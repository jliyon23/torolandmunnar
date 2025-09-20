import { useState, useRef, useEffect } from "react";
import { MapPin, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import logo from '../../assets/logo/logo.png';

// Import the data and utility function from their new homes
import { aboutGalleryImages } from '../../data/imageData';
import { optimizeCloudinaryImage } from '../../utils/cloudinary';

function About() {
  // Define transformations and generate the final image list
  const imageTransformations = "w_1000,ar_9:16,c_fill,f_auto,q_auto:good";
  const galleryImages = aboutGalleryImages.map(url => 
    optimizeCloudinaryImage(url, imageTransformations)
  );

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 1);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => checkArrows(), 100);
    window.addEventListener('resize', checkArrows);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkArrows);
    };
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="about" className="bg-background py-16">
      {/* 1. CONTAINER FOR CENTERED TEXT CONTENT */}
      <div className="max-w-3xl mx-auto text-center px-4 mb-12">
        <img src={logo} className="w-28 mx-auto mb-6" alt="Toroland Munnar Logo" />
        <h1 className="text-3xl font-bold font-primary text-primary mb-2">
          TOROLAND MUNNAR
        </h1>
        <p className="text-lg text-secondary font-secondary mb-1">
          ENVOYS OF ECO MAKERS
        </p>
        <div className="w-28 h-[0.1px] bg-amber-500 mx-auto mb-8"></div>
        <div className="space-y-3 mb-10 font-secondary">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
            <div className="flex items-center">
              <Phone className="text-amber-500 mr-2" size={18} />
              <p className="text-gray-700">+91 1234567890</p>
            </div>
            <div className="flex items-center">
              <Mail className="text-amber-500 mr-2" size={18} />
              <p className="text-gray-700">info@torolandmunnar.com</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <MapPin className="text-amber-500 mr-2" size={18} />
            <p className="text-gray-700 font-secondary">
              Viripara, Mankulam, Opp Tiger Cave, Munnar
            </p>
          </div>
        </div>
        <div className="space-y-4 mb-18 text-secondary font-secondary text-center sm:text-center">
          <p>
            Toroland blends the architectural heritage of the Western Ghats with the sophistication of modern luxury, creating a retreat that balances tradition and sustainability. We are committed to responsible tourism, where guests can experience authentic culture while preserving the beauty of Munnar for future generations.
          </p>
        </div>
      </div>

      {/* 2. FULL-WIDTH CONTAINER FOR THE GALLERY */}
      <div className="w-full relative">
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          >
            <ChevronLeft size={28} className="text-gray-800" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkArrows}
          className="flex space-x-6 overflow-x-scroll no-scrollbar snap-x snap-mandatory scroll-smooth px-4 sm:px-8"
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] sm:w-[60vw] md:w-[45vw] lg:w-[30vw] aspect-[9/16] overflow-hidden snap-center "
            >
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          >
            <ChevronRight size={28} className="text-gray-800" />
          </button>
        )}
      </div>

      <div className="space-y-4 mb-18 text-secondary font-tertiary text-xl md:text-2xl text-center sm:text-center mt-8 max-w-4xl mx-auto px-4">
        <p>
          Our vision is to inspire eco-conscious travel, where modern luxury meets the preservation of biodiversity and heritage in the Western Ghats and across the globe.
        </p>
      </div>
    </section>
  );
}

export default About;