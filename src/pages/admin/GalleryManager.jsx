import { useState, useEffect } from 'react';
import { supabaseHelpers } from '../../config/supabase';

const GalleryManager = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImageSelector, setShowImageSelector] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [gallery, images] = await Promise.all([
        supabaseHelpers.getGalleryImages(),
        supabaseHelpers.getImages(),
      ]);
      setGalleryImages(gallery || []);
      setAllImages(images || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToGallery = async (image) => {
    try {
      await supabaseHelpers.addGalleryImage({
        image_id: image.id,
        image_url: image.url,
        order_index: galleryImages.length,
      });
      await loadData();
      setShowImageSelector(false);
      alert('Image added to gallery!');
    } catch (error) {
      console.error('Error adding to gallery:', error);
      alert('Failed to add image to gallery');
    }
  };

  const removeFromGallery = async (id) => {
    if (!confirm('Remove this image from gallery?')) return;

    try {
      await supabaseHelpers.deleteGalleryImage(id);
      await loadData();
      alert('Image removed from gallery!');
    } catch (error) {
      console.error('Error removing from gallery:', error);
      alert('Failed to remove image');
    }
  };

  const availableImages = allImages.filter(
    (img) => !galleryImages.some((gImg) => gImg.image_id === img.id)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Gallery Manager</h1>
          <p className="text-gray-600">Manage images displayed in your gallery</p>
        </div>
        <button
          onClick={() => setShowImageSelector(true)}
          className="bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add to Gallery
        </button>
      </div>

      {/* Current Gallery */}
      <div className="bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Gallery Images ({galleryImages.length})
        </h2>

        {galleryImages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p>No images in gallery. Add some images to display in your gallery!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 hover:border-red-400 transition-all overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={item.image_url}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => removeFromGallery(item.id)}
                      className="bg-red-500 text-white p-2 hover:bg-red-600 transition shadow-lg"
                      title="Remove from gallery"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">Select Images for Gallery</h3>
              <button
                onClick={() => setShowImageSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {availableImages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>All uploaded images are already in the gallery!</p>
                  <p className="text-sm mt-2">Upload more images to add them to the gallery.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {availableImages.map((image) => (
                    <div
                      key={image.id}
                      className="border border-gray-200 hover:border-blue-400 transition-all cursor-pointer"
                      onClick={() => addToGallery(image)}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={image.url}
                          alt={image.filename}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="text-xs text-gray-600 truncate">{image.filename}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
