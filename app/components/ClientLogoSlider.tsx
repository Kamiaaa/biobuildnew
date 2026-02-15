'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Client {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

export default function ClientLogoSlider() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();

        const uniqueClients = data.locations.filter(
          (client: Client, index: number, self: Client[]) =>
            index === self.findIndex((c) => c._id === client._id)
        );

        setClients(uniqueClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || clients.length === 0) return;

    let animationFrameId: number;
    let speed = 0.5;
    let position = 0;

    const totalWidth = slider.scrollWidth / 2; // since we duplicate items

    const animate = () => {
      if (!isPaused.current) {
        position -= speed;

        if (Math.abs(position) >= totalWidth) {
          // Reset when first batch has fully scrolled
          position = 0;
        }

        slider.style.transform = `translateX(${position}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleEnter = () => { isPaused.current = true };
    const handleLeave = () => { isPaused.current = false };

    slider.addEventListener('mouseenter', handleEnter);
    slider.addEventListener('mouseleave', handleLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      slider.removeEventListener('mouseenter', handleEnter);
      slider.removeEventListener('mouseleave', handleLeave);
    };
  }, [clients]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <FaSpinner className="animate-spin text-4xl text-[#7AA859]" />
      </div>
    );
  }

  if (!clients.length) {
    return (
      <div className="container mx-auto max-w-5xl bg-white py-8 text-center">
        No clients found
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl overflow-hidden bg-white py-8">
      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex w-max"
          style={{ willChange: 'transform' }}
        >
          {/* Duplicate clients for seamless infinite loop */}
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={`${client._id}-${idx}`}
              className="w-40 h-20 flex items-center justify-center flex-shrink-0 px-4"
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.image}
                  alt={client.name || `Client Logo`}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
