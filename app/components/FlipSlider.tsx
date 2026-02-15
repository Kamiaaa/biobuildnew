'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { FiX } from "react-icons/fi";

interface Slide {
  id: number;
  image: string;
}

const slides: Slide[] = [
  { id: 1, image: "/img/bro/page-01.png" },
  { id: 2, image: "/img/bro/page-02.png" },
  { id: 3, image: "/img/bro/page-03.png" },
  { id: 4, image: "/img/bro/page-04.png" },
  { id: 5, image: "/img/bro/page-05.png" },
  { id: 6, image: "/img/bro/page-06.png" },
  { id: 1, image: "/img/bro/page-07.png" },
  { id: 2, image: "/img/bro/page-08.png" },
  { id: 3, image: "/img/bro/page-09.png" },
  { id: 4, image: "/img/bro/page-10.png" },
  { id: 5, image: "/img/bro/page-11.png" },
  { id: 6, image: "/img/bro/page-12.png" },
  { id: 1, image: "/img/bro/page-13.png" },
  { id: 2, image: "/img/bro/page-14.png" },
  { id: 3, image: "/img/bro/page-15.png" },
  { id: 4, image: "/img/bro/page-16.png" },
  { id: 5, image: "/img/bro/page-17.png" },
  { id: 6, image: "/img/bro/page-18.png" },
  { id: 1, image: "/img/bro/page-19.png" },
  { id: 2, image: "/img/bro/page-20.png" },
  { id: 3, image: "/img/bro/page-21.png" },
  { id: 4, image: "/img/bro/page-22.png" },
  { id: 5, image: "/img/bro/page-23.png" },
  { id: 6, image: "/img/bro/page-24.png" },
  { id: 2, image: "/img/bro/page-25.png" },
  { id: 3, image: "/img/bro/page-26.png" },
  { id: 4, image: "/img/bro/page-27.png" },
  { id: 5, image: "/img/bro/page-28.png" },
  { id: 6, image: "/img/bro/page-29.png" },
  { id: 1, image: "/img/bro/page-30.png" },
  { id: 2, image: "/img/bro/page-31.png" },
  { id: 3, image: "/img/bro/page-32.png" },
  { id: 4, image: "/img/bro/page-33.png" },
  { id: 5, image: "/img/bro/page-34.png" },
];

export default function FlipSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"left" | "right">("right");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const flipDuration = 0.8;

  // Calculate left and right page indices
  const leftPageIndex = currentIndex;
  const rightPageIndex = currentIndex + 1;

  const nextPage = () => {
    if (isFlipping || rightPageIndex >= slides.length - 1) return;
    
    setIsFlipping(true);
    setFlipDirection("right");
    setTimeout(() => {
      setCurrentIndex(prev => prev + 2);
      setIsFlipping(false);
    }, flipDuration * 1000);
  };

  const prevPage = () => {
    if (isFlipping || currentIndex === 0) return;
    
    setIsFlipping(true);
    setFlipDirection("left");
    setTimeout(() => {
      setCurrentIndex(prev => prev - 2);
      setIsFlipping(false);
    }, flipDuration * 1000);
  };

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => { setShowForm(false); setError(""); }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[0-9]+$/.test(phone)) {
      setError("Phone number must contain only digits.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });

      const result = await res.json();
      alert(result.message);

      if (result.success) {
        setName("");
        setPhone("");
        setShowForm(false);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Variants for the flipping page animation
  const flipVariants = {
    initial: (flipDirection: "left" | "right") => ({
      rotateY: flipDirection === "right" ? 0 : -180,
      zIndex: 30,
    }),
    animate: (flipDirection: "left" | "right") => ({
      rotateY: flipDirection === "right" ? -90 : 90,
      zIndex: 30,
    }),
    exit: {
      rotateY: -180,
      zIndex: 10,
    }
  };

  // Define transition separately
  const flipTransition = {
    duration: flipDuration / 2,
    ease: [0.65, 0.05, 0.36, 1] as [number, number, number, number] // Custom cubic bezier for realistic flip
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-4 text-center font-sans">
      {/* Title Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl md:text-3xl font-poppins font-bold text-gray-800 mb-3">
          Get Your <span className="text-[#7AA859]">BIOBUILD</span> Brochure
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
          Flip through our brochure and request your copy today.
        </p>
      </motion.div>

      {/* 3D Book Container */}
      <div className="relative w-full max-w-4xl mx-auto mb-8">
        {/* Book Shadow */}
        <div className="absolute -bottom-4 left-5 right-5 h-4 bg-gray-200 blur-md rounded-xl opacity-70"></div>
        
        {/* Book */}
        <div className="relative w-full h-[490px] perspective-1200 flex justify-center items-center">
          {/* Left Page (static) */}
          <div className="absolute left-0 w-1/2 h-full origin-right transition-transform duration-500 z-20">
            <div className="absolute top-0 left-0 w-full h-full bg-white border-r border-gray-300 rounded-l-lg shadow-lg overflow-hidden">
              {leftPageIndex < slides.length ? (
                <Image
                  src={slides[leftPageIndex].image}
                  alt={`Brochure page ${leftPageIndex + 1}`}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-white flex flex-col justify-center items-center p-8">
                  <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                  <p className="mb-4">For more information about our services</p>
                  <button 
                    onClick={handleShowForm}
                    className="px-4 py-2 bg-[#7AA859] text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Request Info
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Page (static) */}
          <div className="absolute right-0 w-1/2 h-full origin-left transition-transform duration-500 z-10">
            <div className="absolute top-0 right-0 w-full h-full bg-white border-l border-gray-300 rounded-r-lg shadow-lg overflow-hidden">
              {rightPageIndex < slides.length ? (
                <Image
                  src={slides[rightPageIndex].image}
                  alt={`Brochure page ${rightPageIndex + 1}`}
                  fill
                  className="object-contain p-4"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-white flex flex-col justify-center items-center p-8">
                  <h3 className="text-xl font-semibold mb-4">Thank You</h3>
                  <p className="mb-4">We hope you enjoyed our brochure</p>
                </div>
              )}
            </div>
          </div>

          {/* Flipping Page (animated) - Right Flip */}
          <AnimatePresence custom={flipDirection}>
            {isFlipping && flipDirection === "right" && (
              <motion.div
                key={`flip-right-${currentIndex}`}
                custom={flipDirection}
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={flipTransition}
                className="absolute right-0 w-1/2 h-full origin-left transform-style-3d"
              >
                <div className="absolute top-0 right-0 w-full h-full bg-white border-l border-gray-300 rounded-r-lg shadow-xl overflow-hidden">
                  <Image
                    src={slides[rightPageIndex].image}
                    alt={`Brochure page ${rightPageIndex + 1}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flipping Page (animated) - Left Flip */}
          <AnimatePresence custom={flipDirection}>
            {isFlipping && flipDirection === "left" && (
              <motion.div
                key={`flip-left-${currentIndex}`}
                custom={flipDirection}
                variants={flipVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={flipTransition}
                className="absolute left-0 w-1/2 h-full origin-right transform-style-3d"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-white border-r border-gray-300 rounded-l-lg shadow-xl overflow-hidden">
                  <Image
                    src={slides[leftPageIndex].image}
                    alt={`Brochure page ${leftPageIndex + 1}`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Book Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-700 to-gray-800 -translate-x-1/2 -z-10"></div>
        </div>

        {/* Page Indicator */}
        <div className="mt-6 flex justify-center items-center space-x-2">
          <span className="text-sm text-gray-600">
            Pages {leftPageIndex + 1}-{Math.min(rightPageIndex + 1, slides.length)} of {slides.length}
          </span>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center absolute top-1/2 left-0 right-0 transform -translate-y-1/2 px-2 z-30">
          <button 
            onClick={prevPage} 
            disabled={currentIndex === 0 || isFlipping}
            className={`p-3 bg-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg group ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            <IoMdArrowBack size={24} className="text-gray-700 group-hover:text-emerald-600" />
          </button>
          <button 
            onClick={nextPage} 
            disabled={rightPageIndex >= slides.length - 1 || isFlipping}
            className={`p-3 bg-white rounded-full shadow-md transition-all duration-300 hover:shadow-lg group ${rightPageIndex >= slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
          >
            <IoMdArrowForward size={24} className="text-gray-700 group-hover:text-emerald-600" />
          </button>
        </div>
      </div>

      {/* Request Brochure Button */}
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleShowForm}
            className="mt-4 px-6 py-3 bg-[#7AA859] text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 mx-auto hover:shadow-lg text-sm"
          >
            Request Brochure
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mt-4 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg max-w-md mx-auto border border-gray-100 relative"
          >
            <button 
              onClick={handleCloseForm}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close form"
            >
              <FiX size={20} />
            </button>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Request Brochure</h2>
            <p className="mb-4 text-gray-600 text-sm">
              Share your details and we'll send you our complete brochure.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-sm"
                />
                {error && <p className="text-red-500 text-xs mt-1 text-left">{error}</p>}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full px-5 py-3 bg-[#7AA859] text-white font-medium rounded-lg shadow hover:bg-green-700 transition-all duration-300 hover:shadow-lg text-sm"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .perspective-1200 {
          perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}