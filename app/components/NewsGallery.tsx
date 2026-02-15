// app/components/NewsGallery.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface NewsEvent {
  _id: string;
  type: 'news' | 'event';
  title: string;
  date: string;
  summary: string;
  location?: string;
  image: string;
}

export default function NewsGallery() {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1); // -1 = no selection

  const fetchItems = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/news-events?page=${pageNum}&limit=8`);
      const json = await res.json();

      if (pageNum === 1) {
        setItems(json.data || []);
      } else {
        setItems((prev) => [...prev, ...(json.data || [])]);
      }

      setTotalPages(json.totalPages);
    } catch (err) {
      console.error('Error fetching news/events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchItems(nextPage);
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex >= 0 && selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const closeModal = () => setSelectedIndex(-1);

  const selectedItem = selectedIndex >= 0 ? items[selectedIndex] : null;

  return (
    <div className="container mx-auto max-w-7xl py-20">
        <h1 className='text-3xl font-poppins font-semibold text-center pb-20'>News Gallery</h1>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div key={item._id} className="group cursor-pointer relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg">
              <button
                onClick={() => setSelectedIndex(index)}
                className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {page < totalPages && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-[#7AA859] text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal} // Close when clicking overlay
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full overflow-hidden shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button - Enhanced with better styling */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
              aria-label="Close modal"
            >
              <AiOutlineClose size={24} />
            </button>

            {/* Image with Navigation */}
            <div className="relative flex items-center justify-center bg-black">
              {selectedIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 bg-white/80 rounded-full p-2 hover:bg-white z-10"
                  aria-label="Previous image"
                >
                  <AiOutlineLeft size={24} />
                </button>
              )}
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full max-h-[500px] object-contain"
              />
              {selectedIndex < items.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 bg-white/80 rounded-full p-2 hover:bg-white z-10"
                  aria-label="Next image"
                >
                  <AiOutlineRight size={24} />
                </button>
              )}
            </div>
            
            {/* Content Section */}
            {/* <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
              <div className="flex justify-between items-center mb-4 text-gray-600">
                <span>{new Date(selectedItem.date).toLocaleDateString()}</span>
                {selectedItem.location && (
                  <span>{selectedItem.location}</span>
                )}
              </div>
              <p className="text-gray-700">{selectedItem.summary}</p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}