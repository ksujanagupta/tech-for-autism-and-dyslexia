import React, { useState } from 'react';
import gallery from '../../assets/Media/gallery.jpg';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';

const Photos = () => {
  const imageModules = import.meta.glob('/src/assets/Media/PhotoGallery/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
  });

  const galleryImages = Object.entries(imageModules).map(([path, src], index) => ({
    id: index + 1,
    src,
  }));

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-50">
      <img src={gallery} alt="gallery" className="w-full object-cover" />

      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold text-gray-800">Photo Gallery</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-sm shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={`Gallery Image ${image.id}`}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <FiX size={28} />
          </button>

          <button
            onClick={goToPrev}
            className="absolute left-4 text-white text-2xl p-2 bg-black bg-opacity-50 rounded-full"
          >
            <FiChevronLeft size={28} />
          </button>

          <div className="max-w-4xl w-full max-h-screen overflow-auto">
            <img
              src={galleryImages[currentImageIndex].src}
              alt={`Gallery Image ${currentImageIndex + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white text-2xl p-2 bg-black bg-opacity-50 rounded-full"
          >
            <FiChevronRight size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Photos;