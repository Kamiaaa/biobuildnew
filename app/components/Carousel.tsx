'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiPhone } from "react-icons/fi";
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

const images = [
  '/img/slider/slide-01.jpg',
  '/img/slider/slide-02.jpg',
  '/img/slider/slide-03.jpg',
  '/img/slider/slide-04.jpg',
  '/img/slider/slide-05.jpg',
  '/img/slider/slide-06.jpg',
];

const iconLinks = [
  { href: '/project-status/ongoing', src: '/img/icons/category1.svg', alt: 'Category 1', label: 'Ongoing' },
  { href: '/project-status/completed', src: '/img/icons/category2.svg', alt: 'Category 2', label: 'Completed' },
  { href: '/project-status/upcoming', src: '/img/icons/category3.svg', alt: 'Category 3', label: 'Upcoming' },
];

type NavigationDirection = 'prev' | 'next';

export default function Slider() {
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const length = images.length;

  useEffect(() => {
    const startTransition = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % length);
        setIsTransitioning(false);
      }, 10000);
    };

    const timer = setInterval(startTransition, 10000);
    return () => clearInterval(timer);
  }, [length]);

  const handleNavigation = (direction: NavigationDirection) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) =>
        direction === 'next'
          ? (prev + 1) % length
          : (prev - 1 + length) % length
      );
      setIsTransitioning(false);
    }, 10000);
  };

  return (
    <div className="w-full mt-16 relative">
      {/* Main Image Slider */}
      <div className="relative w-full h-48 md:w-full md:h-[90vh] overflow-hidden shadow-md">
        {/* Slides with zoom effect */}
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[5000ms] ease-in-out ${index === current
                ? 'opacity-100 z-10 scale-100'
                : 'opacity-0 z-0 scale-150'
              }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Arrows (Desktop Only) */}
        {/* <div className="hidden md:block">
          <button
            onClick={() => handleNavigation('prev')}
            className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-40 hover:scale-110 transition-transform ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isTransitioning}
          >
            <FaCircleArrowLeft />
          </button>
          <button
            onClick={() => handleNavigation('next')}
            className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-40 hover:scale-110 transition-transform ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isTransitioning}
          >
            <FaCircleArrowRight />
          </button>
        </div> */}

        {/* Thumbnails (Desktop Only) */}
        <div className="hidden md:flex absolute bottom-44 right-4 z-50 gap-3 bg-black/40 px-4 py-2 rounded-md">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer rounded-md border-5 transition duration-300 ${current === index ? 'border-[#fff]' : 'border-transparent'
                }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={60}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Icons Bar (Desktop Only) */}
        <div className="hidden md:flex absolute bottom-0 w-full h-40 z-50">
          <div className="absolute inset-0 bg-black/40 flex items-center px-10 z-50">
            <div className="text-white text-3xl font-poppins w-1/3">
              <div className="flex items-center gap-2 text-white font-semibold text-xl">
                <FiPhone className="text-xl" />
                <span>+880 17 51 51 12 12</span>
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
              {iconLinks.map((icon, idx) => (
                <Link
                  key={idx}
                  href={icon.href}
                  className="flex flex-col items-center text-white group relative z-50"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-1 text-lg">{icon.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Number (Mobile Only) */}
        <div className="flex md:hidden absolute bottom-5 inset-x-0 items-center justify-center z-50">
          <a
            href="tel:+8801751511212"
            className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-md text-white text-lg font-semibold text-center"
          >
            +880 17 51 51 12 12
          </a>
        </div>
      </div>
    </div>
  );
}
