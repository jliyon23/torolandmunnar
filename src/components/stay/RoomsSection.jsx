import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabaseHelpers } from "../../config/supabase";

const RoomsSection = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await supabaseHelpers.getRooms();
      console.log('Raw rooms data:', data);
      
      if (!data || data.length === 0) {
        setRoomTypes([]);
        return;
      }

      const formattedRooms = data
        .filter(room => room.is_published)
        .map((room, index) => ({
          id: room.id,
          name: room.title || 'Room',
          description: room.description || 'A comfortable and luxurious room for your stay.',
          features: [
            room.bed_type || 'Comfortable Bed',
            'Private Bathroom',
            'Scenic Views',
            'Eco-friendly Amenities',
            'Premium Linens'
          ],
          size: room.room_size || 'Spacious',
          occupancy: `${room.max_guests || 2} Guests`,
          price: room.price ? `₹${room.price}` : 'Contact for pricing',
          image: room.image || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        }));
      
      console.log('Formatted rooms:', formattedRooms);
      setRoomTypes(formattedRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
      setError('Failed to load rooms. Please try again later.');
      setRoomTypes([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 md:px-8 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadRooms}
              className="mt-4 px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (roomTypes.length === 0) {
    return (
      <section className="py-20 px-4 md:px-8 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Rooms Available</h3>
            <p className="text-gray-600">There are currently no rooms available for booking.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rooms" className="py-20 px-4 md:px-8 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="translate-y-0 opacity-100">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-primary">
              OUR ROOMS
            </h2>
            <p className="text-xl text-gray-600 mb-2 font-secondary">Choose Your Sanctuary</p>
            <div className="w-20 h-1 bg-amber-500 mx-auto mt-4"></div>
          </div>
        </div>

        {/* Rooms Grid */}
<div className="space-y-16">
  {roomTypes.map((room, index) => (
    <div
      key={room.id}
      className="grid md:grid-cols-2 gap-8 items-center"
    >
      {/* Image - Alternates sides */}
      <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
        <div className="overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-80 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80';
            }}
          />
        </div>
      </div>
      
      {/* Content - Alternates sides */}
      <div className={`p-8 bg-gray-50 border border-gray-200 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4 font-primary">{room.name}</h3>
        <p className="text-gray-600 font-secondary mb-6 leading-relaxed">
          {room.description}
        </p>
        
        {/* Room Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
          <div>
            <span className="font-semibold">Size:</span> {room.size}
          </div>
          <div>
            <span className="font-semibold">Occupancy:</span> {room.occupancy}
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
          <ul className="space-y-2 text-gray-600">
            {room.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {/* Price and Booking */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-300">
          <div>
            <span className="text-xl font-semibold text-gray-800">{room.price}</span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
          <Link 
            to={`/room/${room.id}`}
            className="bg-amber-600 text-white px-6 py-2 font-medium hover:bg-amber-700 transition-colors inline-block text-center"
          >
            VIEW DETAILS
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </section>
  );
};

export default RoomsSection;