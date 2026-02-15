'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title = "Gallery" }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null; // Don't render anything if no images
  }

  const openModal = (index: number) => {
    setSelectedIndex(index);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedIndex(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>
        
        <div className={`grid gap-4 ${
          images.length === 1 
            ? 'grid-cols-1 max-w-md mx-auto'
            : images.length === 2 
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {images.map((imageUrl, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-100 aspect-square"
              onClick={() => openModal(index)}
            >
              <Image
                src={imageUrl}
                alt={`${title} image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-2">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed z-[100] inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-30 p-3 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 border-2 border-white border-opacity-20 hover:border-opacity-40"
            onClick={closeModal}
            aria-label="Close gallery"
          >
            <FaTimes className="text-white text-2xl" />
          </button>

          {/* Navigation Arrows - Only show if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 border-2 border-white border-opacity-20 hover:border-opacity-40"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft className="text-white text-2xl" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 border-2 border-white border-opacity-20 hover:border-opacity-40"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                <FaChevronRight className="text-white text-2xl" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex]}
              alt={`${title} image ${selectedIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black bg-opacity-50 rounded-full text-white text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;