import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const DatabaseDebugger = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await supabaseHelpers.getRooms();
      console.log('Debug - Raw room data:', data);
      setRooms(data || []);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGalleryImage = async (roomId, imageUrl) => {
    try {
      const room = rooms.find(r => r.id === roomId);
      const currentGallery = room.gallery_images || [];
      const updatedGallery = [...currentGallery, imageUrl];
      
      await supabaseHelpers.updateRoom(roomId, {
        gallery_images: updatedGallery
      });
      
      loadRooms();
      setNewImageUrl('');
      alert('Gallery image added successfully!');
    } catch (error) {
      console.error('Error adding gallery image:', error);
      alert('Failed to add gallery image');
    }
  };

  const removeGalleryImage = async (roomId, imageIndex) => {
    try {
      const room = rooms.find(r => r.id === roomId);
      const currentGallery = room.gallery_images || [];
      const updatedGallery = currentGallery.filter((_, index) => index !== imageIndex);
      
      await supabaseHelpers.updateRoom(roomId, {
        gallery_images: updatedGallery
      });
      
      loadRooms();
      alert('Gallery image removed successfully!');
    } catch (error) {
      console.error('Error removing gallery image:', error);
      alert('Failed to remove gallery image');
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Database Debugger - Gallery Images</h1>
      
      <div className="space-y-6">
        {rooms.map(room => (
          <div key={room.id} className="border border-gray-300 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{room.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Room Info */}
              <div>
                <h4 className="font-medium mb-2">Room Information:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>ID:</strong> {room.id}</p>
                  <p><strong>Published:</strong> {room.is_published ? 'Yes' : 'No'}</p>
                  <p><strong>Featured Image:</strong> {room.image ? 'Set' : 'Not set'}</p>
                  <p><strong>Gallery Images Count:</strong> {room.gallery_images?.length || 0}</p>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Raw Gallery Data:</h4>
                  <pre className="text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(room.gallery_images, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Gallery Management */}
              <div>
                <h4 className="font-medium mb-2">Gallery Images:</h4>
                
                {room.gallery_images && room.gallery_images.length > 0 ? (
                  <div className="space-y-2 mb-4">
                    {room.gallery_images.map((imageUrl, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <img 
                          src={imageUrl} 
                          alt={`Gallery ${index + 1}`} 
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64?text=Error';
                          }}
                        />
                        <span className="flex-1 text-sm truncate">{imageUrl}</span>
                        <button
                          onClick={() => removeGalleryImage(room.id, index)}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mb-4">No gallery images</p>
                )}

                {/* Add New Image */}
                <div className="space-y-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                  <button
                    onClick={() => {
                      if (newImageUrl.trim()) {
                        addGalleryImage(room.id, newImageUrl.trim());
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                  >
                    Add Gallery Image
                  </button>
                </div>

                {/* Quick Add Sample Images */}
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Quick Add Sample Images:</h5>
                  <div className="space-y-1">
                    {[
                      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
                      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
                    ].map((url, index) => (
                      <button
                        key={index}
                        onClick={() => addGalleryImage(room.id, url)}
                        className="block w-full text-left px-2 py-1 bg-gray-100 text-xs rounded hover:bg-gray-200"
                      >
                        Add Sample Image {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No rooms found in database</p>
        </div>
      )}
    </div>
  );
};

export default DatabaseDebugger;
