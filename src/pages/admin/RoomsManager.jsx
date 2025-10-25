import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const RoomsManager = () => {
  const [rooms, setRooms] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [imageSelectionMode, setImageSelectionMode] = useState('featured');
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    size: '',
    guests: '',
    bed: '',
    image: '',
    gallery_images: [],
    amenities: [],
    price_per_night: '',
    max_occupancy: 2,
    room_area: '',
    view_type: '',
    bathroom_details: '',
    special_features: '',
    booking_notes: '',
    display_order: 0,
    is_published: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [roomsData, imagesData] = await Promise.all([
        supabaseHelpers.getRooms(),
        supabaseHelpers.getImages(),
      ]);
      setRooms(roomsData || []);
      setAllImages(imagesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Saving room with data:', {
        ...formData,
        gallery_images: formData.gallery_images,
        gallery_count: formData.gallery_images?.length || 0
      });
      
      if (editingRoom) {
        await supabaseHelpers.updateRoom(editingRoom.id, formData);
      } else {
        await supabaseHelpers.createRoom(formData);
      }
      loadData();
      resetForm();
      alert(`Room saved successfully! Gallery images: ${formData.gallery_images?.length || 0}`);
    } catch (error) {
      console.error('Error saving room:', error);
      alert('Failed to save room');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this room?')) return;
    try {
      await supabaseHelpers.deleteRoom(id);
      loadData();
      alert('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
      alert('Failed to delete room');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      title: room.title || '',
      description: room.description || '',
      size: room.size || '',
      guests: room.guests || '',
      bed: room.bed || '',
      image: room.image || '',
      gallery_images: room.gallery_images || [],
      amenities: room.amenities || [],
      price_per_night: room.price_per_night || '',
      max_occupancy: room.max_occupancy || 2,
      room_area: room.room_area || room.size || '',
      view_type: room.view_type || '',
      bathroom_details: room.bathroom_details || '',
      special_features: room.special_features || '',
      booking_notes: room.booking_notes || '',
      display_order: room.display_order || 0,
      is_published: room.is_published !== false,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      size: '',
      guests: '',
      bed: '',
      image: '',
      gallery_images: [],
      amenities: [],
      price_per_night: '',
      max_occupancy: 2,
      room_area: '',
      view_type: '',
      bathroom_details: '',
      special_features: '',
      booking_notes: '',
      display_order: 0,
      is_published: true,
    });
    setEditingRoom(null);
    setShowModal(false);
  };

  // Helper functions for gallery images
  const addGalleryImage = (imageUrl) => {
    if (imageUrl && !formData.gallery_images.includes(imageUrl)) {
      setFormData(prev => ({
        ...prev,
        gallery_images: [...prev.gallery_images, imageUrl]
      }));
    }
  };

  const removeGalleryImage = (index) => {
    setFormData(prev => ({
      ...prev,
      gallery_images: prev.gallery_images.filter((_, i) => i !== index)
    }));
  };

  // Helper functions for amenities
  const addAmenity = (amenity) => {
    if (amenity.trim() && !formData.amenities.includes(amenity.trim())) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, amenity.trim()]
      }));
    }
  };

  const removeAmenity = (index) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index)
    }));
  };

  const selectImage = (image) => {
    if (imageSelectionMode === 'featured') {
      setFormData({ ...formData, image: image.url });
    } else if (imageSelectionMode === 'gallery') {
      addGalleryImage(image.url);
    }
    setShowImageSelector(false);
  };

  const openImageSelector = (mode) => {
    setImageSelectionMode(mode);
    setShowImageSelector(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Rooms Manager</h1>
          <p className="text-gray-600">Manage your accommodation offerings</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Room
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{room.title}</h3>
                    <span
                      className={`inline-block px-3 py-1 text-xs ${
                        room.is_published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {room.is_published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(room)}
                      className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{room.description}</p>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Size:</span> {room.size || room.room_area}
                  </div>
                  <div>
                    <span className="font-medium">Guests:</span> {room.guests || room.max_occupancy}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> {room.price_per_night || 'Contact for pricing'}
                  </div>
                </div>
                <div className="mt-4">
                  {room.gallery_images && room.gallery_images.length > 0 ? (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Gallery Images: {room.gallery_images.length}</p>
                      <div className="flex gap-2">
                        {room.gallery_images.slice(0, 3).map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                        {room.gallery_images.length > 3 && (
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                            +{room.gallery_images.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">📸 No gallery images</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {rooms.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <p className="text-gray-500">No rooms found. Create your first room!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g., Cave Suite"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Describe the room features and amenities..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="50 m²"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="2 Guests"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bed *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bed}
                    onChange={(e) => setFormData({ ...formData, bed: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="1 Large Double Bed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image *
                </label>
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover mb-2" />
                    <button
                      type="button"
                      onClick={() => openImageSelector('featured')}
                      className="w-full bg-gray-100 text-gray-700 px-4 py-2 hover:bg-gray-200 transition"
                    >
                      Change Image
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => openImageSelector('featured')}
                    className="w-full border-2 border-dashed border-gray-300 p-8 hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-500">Select Image</p>
                  </button>
                )}
              </div>

              {/* Gallery Images Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images
                </label>
                <div className="space-y-2">
                  {formData.gallery_images.map((imageUrl, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded">
                      <img src={imageUrl} alt={`Gallery ${index + 1}`} className="w-12 h-12 object-cover rounded" />
                      <span className="text-sm text-gray-600 flex-1 truncate">{imageUrl}</span>
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => openImageSelector('gallery')}
                    className="w-full border border-dashed border-gray-300 p-4 hover:border-blue-500 hover:bg-blue-50 transition text-sm text-gray-600"
                  >
                    + Add Gallery Image
                  </button>
                </div>
              </div>

              {/* Enhanced Room Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Night
                  </label>
                  <input
                    type="text"
                    value={formData.price_per_night}
                    onChange={(e) => setFormData({ ...formData, price_per_night: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="₹5,000 per night"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Occupancy
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.max_occupancy}
                    onChange={(e) => setFormData({ ...formData, max_occupancy: parseInt(e.target.value) || 2 })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Area
                  </label>
                  <input
                    type="text"
                    value={formData.room_area}
                    onChange={(e) => setFormData({ ...formData, room_area: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="350 sq ft"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    View Type
                  </label>
                  <input
                    type="text"
                    value={formData.view_type}
                    onChange={(e) => setFormData({ ...formData, view_type: e.target.value })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Mountain View, Garden View, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathroom Details
                </label>
                <input
                  type="text"
                  value={formData.bathroom_details}
                  onChange={(e) => setFormData({ ...formData, bathroom_details: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Private bathroom with hot water"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Features
                </label>
                <input
                  type="text"
                  value={formData.special_features}
                  onChange={(e) => setFormData({ ...formData, special_features: e.target.value })}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Eco-friendly amenities, private balcony, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Notes
                </label>
                <textarea
                  value={formData.booking_notes}
                  onChange={(e) => setFormData({ ...formData, booking_notes: e.target.value })}
                  rows={2}
                  className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Advance booking recommended, special packages available, etc."
                />
              </div>

              {/* Amenities Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="space-y-2">
                  {formData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border border-gray-200 rounded">
                      <span className="flex-1">{amenity}</span>
                      <button
                        type="button"
                        onClick={() => removeAmenity(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add amenity (e.g., Wi-Fi, Air Conditioning)"
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addAmenity(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        addAmenity(input.value);
                        input.value = '';
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.value === 'true' })}
                    className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition font-medium"
                >
                  {editingRoom ? 'Update Room' : 'Create Room'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Image - {imageSelectionMode === 'featured' ? 'Featured Image' : 'Gallery Image'}
              </h2>
              <button onClick={() => setShowImageSelector(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {allImages.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {allImages.map((image) => (
                    <div
                      key={image.id}
                      onClick={() => selectImage(image)}
                      className="cursor-pointer group relative border-2 border-transparent hover:border-blue-500 transition"
                    >
                      <img src={image.url} alt={image.name} className="w-full h-40 object-cover" />
                      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 font-medium">Select</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Images Available</h3>
                  <p className="text-gray-500 mb-4">Please upload some images to the gallery first.</p>
                  <p className="text-sm text-gray-400">Go to Images Manager to upload images.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsManager;
