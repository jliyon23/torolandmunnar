import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabaseHelpers } from '../../config/supabase';
import { uploadToCloudinary } from '../../config/cloudinary';

// Video Upload Component
const VideoUpload = ({ onVideoUploaded, currentVideoUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert('Video file size must be less than 100MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      // Upload to Cloudinary
      const result = await uploadToCloudinary(file, 'video');
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Call the callback with the video URL
      onVideoUploaded(result.secure_url);
      
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    } catch (error) {
      console.error('Video upload error:', error);
      alert('Failed to upload video: ' + error.message);
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onVideoUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi', '.webm'] },
    maxFiles: 1,
    disabled: uploading,
  });

  return (
    <div>
      {currentVideoUrl && !uploading && (
        <div className="mb-3">
          <video
            src={currentVideoUrl}
            controls
            className="w-full max-h-64 bg-black"
          />
        </div>
      )}
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : uploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div>
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600 font-medium mb-2">Uploading video...</p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{uploadProgress}%</p>
          </div>
        ) : (
          <>
            <svg
              className="w-12 h-12 text-gray-400 mx-auto mb-3"
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
            {isDragActive ? (
              <p className="text-blue-600 font-medium">Drop the video here</p>
            ) : (
              <>
                <p className="text-gray-600 font-medium mb-1">
                  Drag & drop a video, or click to select
                </p>
                <p className="text-sm text-gray-500">
                  MP4, MOV, AVI, WEBM (max 100MB)
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const HeroSettings = () => {
  const [settings, setSettings] = useState({
    type: 'video', // 'video' or 'image'
    video_url: '',
    video_cloudinary_url: '',
    images: [],
  });
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [heroSettings, images] = await Promise.all([
        supabaseHelpers.getHeroSettings().catch(() => null),
        supabaseHelpers.getImages(),
      ]);

      if (heroSettings) {
        setSettings(heroSettings);
      }
      setAllImages(images || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await supabaseHelpers.updateHeroSettings({
        id: 1, // Single record
        type: settings.type,
        video_url: settings.video_url,
        images: settings.images,
      });
      alert('Hero settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const addImage = (image) => {
    setSettings((prev) => ({
      ...prev,
      images: [...prev.images, image.url],
    }));
    setShowImageSelector(false);
  };

  const removeImage = (index) => {
    setSettings((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Hero Settings</h1>
        <p className="text-gray-600">Configure how your homepage hero section looks</p>
      </div>

      <div className="bg-white p-6 shadow-md max-w-3xl">
        {/* Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Hero Type</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setSettings({ ...settings, type: 'video' })}
              className={`p-6 border-2 transition-all ${
                settings.type === 'video'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <svg className="w-12 h-12 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-700">Video Background</span>
            </button>

            <button
              onClick={() => setSettings({ ...settings, type: 'image' })}
              className={`p-6 border-2 transition-all ${
                settings.type === 'image'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <svg className="w-12 h-12 mx-auto mb-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-700">Image Carousel</span>
            </button>
          </div>
        </div>

        {/* Video URL Input */}
        {settings.type === 'video' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
            <input
              type="url"
              value={settings.video_url}
              onChange={(e) => setSettings({ ...settings, video_url: e.target.value })}
              className="w-full p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="https://example.com/video.mp4 or /video/bg.mp4"
            />
            <p className="text-sm text-gray-500 mt-2">
              Enter the URL of your hero video (MP4 format recommended) or upload a new video below
            </p>
            
            {/* Video Upload Section */}
            <div className="mt-4">
              <VideoUpload
                onVideoUploaded={(url) => setSettings({ ...settings, video_url: url })}
                currentVideoUrl={settings.video_url}
              />
            </div>
          </div>
        )}

        {/* Image Carousel */}
        {settings.type === 'image' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Carousel Images ({settings.images?.length || 0})
              </label>
              <button
                onClick={() => setShowImageSelector(true)}
                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Image
              </button>
            </div>

            {(!settings.images || settings.images.length === 0) ? (
              <div className="border-2 border-dashed border-gray-300 p-12 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No images selected</p>
                <p className="text-gray-400 text-sm">Click "Add Image" to select images for the carousel</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {settings.images.map((imageUrl, index) => (
                  <div key={index} className="relative group border border-gray-200">
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img src={imageUrl} alt={`Carousel ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-600 text-white px-8 py-3 hover:bg-green-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Image Selector Modal */}
      {showImageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-xl font-bold text-gray-800">Select Image for Hero Carousel</h3>
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
              {allImages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No images uploaded yet. Upload images first!</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {allImages.map((image) => (
                    <div
                      key={image.id}
                      className="border border-gray-200 hover:border-blue-400 transition-all cursor-pointer"
                      onClick={() => addImage(image)}
                    >
                      <div className="aspect-video overflow-hidden bg-gray-100">
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

export default HeroSettings;
