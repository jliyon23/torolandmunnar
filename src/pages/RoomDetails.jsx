import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { supabaseHelpers } from "../config/supabase";
import { 
  FaArrowLeft, 
  FaUsers, 
  FaBed, 
  FaRuler,
  FaEye,
  FaBath,
  FaStar,
  FaWifi,
  FaParking,
  FaCoffee,
  FaSnowflake,
  FaTv,
  FaCheck,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      loadRoom();
    }
  }, [id]);

  const loadRoom = async () => {
    try {
      const data = await supabaseHelpers.getRoomById(id);
      if (!data.is_published) {
        setError("This room is not available.");
        return;
      }
      
      const formattedRoom = {
        id: data.id,
        title: data.title,
        description: data.description,
        image: data.image,
        galleryImages: data.gallery_images || [],
        size: data.size || data.room_area || 'Spacious',
        guests: data.guests || `${data.max_occupancy || 2} Guests`,
        bed: data.bed,
        amenities: data.amenities || [],
        pricePerNight: data.price_per_night || 'Contact for pricing',
        maxOccupancy: data.max_occupancy || 2,
        roomArea: data.room_area || data.size,
        viewType: data.view_type || 'Nature View',
        bathroomDetails: data.bathroom_details || 'Private bathroom',
        specialFeatures: data.special_features || '',
        bookingNotes: data.booking_notes || ''
      };
      
      setRoom(formattedRoom);
    } catch (error) {
      console.error('Error loading room:', error);
      setError("Room not found.");
    } finally {
      setLoading(false);
    }
  };

  const allImages = room ? [room.image, ...(room.galleryImages || [])] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'Wi-Fi': <FaWifi />,
      'WiFi': <FaWifi />,
      'Parking': <FaParking />,
      'Coffee': <FaCoffee />,
      'TV': <FaTv />,
      'Air Conditioning': <FaSnowflake />,
      'AC': <FaSnowflake />,
      'Bathroom': <FaBath />,
    };
    
    // Find matching icon (case insensitive)
    const matchedKey = Object.keys(icons).find(key => 
      amenity.toLowerCase().includes(key.toLowerCase())
    );
    
    return matchedKey ? icons[matchedKey] : <FaCheck />;
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

  if (error || !room) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-primary text-primary mb-4">Room Not Found</h1>
            <p className="text-main-text/80 mb-8">{error}</p>
            <Link 
              to="/stay" 
              className="inline-flex items-center gap-2 bg-primary text-light px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <FaArrowLeft /> Back to Rooms
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with Image Gallery */}
      <section className="relative">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-primary hover:text-secondary mb-6 transition-colors font-secondary"
          >
            <FaArrowLeft /> Back to Rooms
          </button>
        </div>
        
        {/* Image Gallery */}
        <div className="relative h-[60vh] overflow-hidden">
          {allImages.length > 0 && (
            <>
              <img 
                src={allImages[currentImageIndex]} 
                alt={`${room.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Gallery Navigation */}
              {allImages.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 hover:bg-black/70 transition-colors"
                  >
                    <FaArrowLeft />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 hover:bg-black/70 transition-colors"
                  >
                    <FaArrowLeft className="rotate-180" />
                  </button>
                  
                  {/* Image Counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 text-sm font-secondary">
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Thumbnail Gallery */}
        {allImages.length > 1 && (
          <div className="container mx-auto px-4 py-4">
            <div className="flex gap-2 overflow-x-auto">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-primary' : 'border-gray-300'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Room Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Room Title and Basic Info */}
              <div>
                <h1 className="text-4xl font-primary text-primary mb-4">{room.title}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-light border border-gray-200">
                  <div className="text-center">
                    <FaRuler className="text-2xl text-primary mx-auto mb-2" />
                    <p className="text-sm font-secondary text-main-text/80">Area</p>
                    <p className="font-secondary font-semibold text-primary">{room.roomArea}</p>
                  </div>
                  <div className="text-center">
                    <FaUsers className="text-2xl text-primary mx-auto mb-2" />
                    <p className="text-sm font-secondary text-main-text/80">Guests</p>
                    <p className="font-secondary font-semibold text-primary">{room.guests}</p>
                  </div>
                  <div className="text-center">
                    <FaBed className="text-2xl text-primary mx-auto mb-2" />
                    <p className="text-sm font-secondary text-main-text/80">Bed</p>
                    <p className="font-secondary font-semibold text-primary">{room.bed}</p>
                  </div>
                  <div className="text-center">
                    <FaEye className="text-2xl text-primary mx-auto mb-2" />
                    <p className="text-sm font-secondary text-main-text/80">View</p>
                    <p className="font-secondary font-semibold text-primary">{room.viewType}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-2xl font-primary text-primary mb-4">About This Room</h3>
                <p className="font-secondary text-main-text/80 leading-relaxed text-lg">
                  {room.description}
                </p>
              </div>

              {/* Amenities */}
              {room.amenities && room.amenities.length > 0 && (
                <div>
                  <h3 className="text-2xl font-primary text-primary mb-6">Room Amenities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-light border border-gray-200">
                        <span className="text-primary text-lg">
                          {getAmenityIcon(amenity)}
                        </span>
                        <span className="font-secondary text-main-text">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Features */}
              {room.specialFeatures && (
                <div>
                  <h3 className="text-2xl font-primary text-primary mb-4">Special Features</h3>
                  <p className="font-secondary text-main-text/80 leading-relaxed">
                    {room.specialFeatures}
                  </p>
                </div>
              )}

              {/* Bathroom Details */}
              {room.bathroomDetails && (
                <div>
                  <h3 className="text-2xl font-primary text-primary mb-4">Bathroom</h3>
                  <div className="flex items-center gap-3 p-4 bg-light border border-gray-200">
                    <FaBath className="text-xl text-primary" />
                    <span className="font-secondary text-main-text">{room.bathroomDetails}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Pricing Card */}
                <div className="bg-white border border-gray-200 p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-primary text-primary mb-2">{room.pricePerNight}</div>
                    <p className="text-sm font-secondary text-main-text/60">per night</p>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-secondary text-main-text/70">Max Occupancy</span>
                      <span className="font-secondary font-semibold">{room.maxOccupancy} guests</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-secondary text-main-text/70">Room Size</span>
                      <span className="font-secondary font-semibold">{room.roomArea}</span>
                    </div>
                  </div>

                  {/* Booking Buttons */}
                  <div className="space-y-3">
                    <Link 
                      to="/enquire"
                      className="w-full bg-primary text-light text-center py-3 hover:bg-primary/90 transition-colors font-secondary font-semibold block"
                    >
                      Book This Room
                    </Link>
                    <Link 
                      to="/contact"
                      className="w-full bg-secondary text-light text-center py-3 hover:bg-secondary/90 transition-colors font-secondary font-semibold block"
                    >
                      Get More Info
                    </Link>
                  </div>
                </div>

                {/* Booking Notes */}
                {room.bookingNotes && (
                  <div className="bg-primary/5 border border-primary/20 p-4">
                    <h4 className="font-primary text-primary text-lg mb-3">Important Notes</h4>
                    <p className="font-secondary text-sm text-main-text/80 leading-relaxed">
                      {room.bookingNotes}
                    </p>
                  </div>
                )}

                {/* Contact Info */}
                <div className="bg-light border border-gray-200 p-6">
                  <h4 className="font-primary text-primary text-lg mb-4">Need Help?</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-primary" />
                      <span className="font-secondary text-sm">+91 [Your Phone]</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-primary" />
                      <span className="font-secondary text-sm">reservations@torolandmunnar.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Rooms Section */}
      <section className="py-16 px-4 bg-light">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-primary text-primary mb-4">Other Rooms</h2>
            <p className="font-secondary text-main-text/80">Explore our other accommodation options</p>
          </div>
          
          <div className="text-center">
            <Link 
              to="/stay"
              className="inline-flex items-center gap-2 bg-primary text-light px-8 py-3 hover:bg-primary/90 transition-colors font-secondary font-semibold"
            >
              View All Rooms
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RoomDetails;
