const LightboxModal = ({ selectedImage, setSelectedImage }) => {
  if (!selectedImage) return null;

  return (
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
  );
};

export default LightboxModal;
