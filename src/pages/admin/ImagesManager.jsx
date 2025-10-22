import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabaseHelpers } from '../../config/supabase';
import { uploadToCloudinary } from '../../config/cloudinary';

const ImagesManager = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await supabaseHelpers.getImages();
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      alert('Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    setIsUploading(true);

    try {
      for (const file of acceptedFiles) {
        // Upload to Cloudinary
        const cloudinaryData = await uploadToCloudinary(file);

        // Save to Supabase
        await supabaseHelpers.addImage({
          url: cloudinaryData.url,
          public_id: cloudinaryData.publicId,
          width: cloudinaryData.width,
          height: cloudinaryData.height,
          filename: file.name,
          size: file.size,
        });
      }

      await loadImages();
      alert('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif']
    },
    multiple: true
  });

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      await supabaseHelpers.deleteImage(id);
      await loadImages();
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Images Manager</h1>
        <p className="text-gray-600">Upload and manage your images</p>
      </div>

      {/* Upload Area */}
      <div className="bg-white p-6 shadow-md mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Upload New Images</h2>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Uploading images...</p>
            </div>
          ) : (
            <>
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-gray-700 text-lg mb-2">
                {isDragActive ? 'Drop the images here...' : 'Drag & drop images here'}
              </p>
              <p className="text-gray-500 text-sm">or click to select files</p>
              <p className="text-gray-400 text-xs mt-2">Supports: JPG, PNG, WEBP, GIF</p>
            </>
          )}
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white p-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">All Images ({images.length})</h2>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>No images uploaded yet. Upload some images to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="border border-gray-200 hover:border-blue-400 transition-all overflow-hidden group"
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-300"
                    onClick={() => setSelectedImage(image)}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="bg-white text-gray-800 px-4 py-2 mx-1 hover:bg-gray-100 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-700 truncate mb-2">{image.filename}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyUrl(image.url)}
                      className="flex-1 bg-blue-500 text-white text-xs py-2 px-3 hover:bg-blue-600 transition"
                    >
                      Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500 text-white text-xs py-2 px-3 hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">{selectedImage.filename}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img src={selectedImage.url} alt={selectedImage.filename} className="w-full h-auto" />
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="ml-2 font-medium">{selectedImage.width} × {selectedImage.height}</span>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <span className="ml-2 font-medium">{(selectedImage.size / 1024).toFixed(2)} KB</span>
                </div>
              </div>
              <div className="mb-2">
                <label className="text-gray-500 text-sm block mb-1">Image URL:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={selectedImage.url}
                    readOnly
                    className="flex-1 p-2 border border-gray-300 bg-white text-sm"
                  />
                  <button
                    onClick={() => copyUrl(selectedImage.url)}
                    className="bg-blue-500 text-white px-4 hover:bg-blue-600 transition"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagesManager;
