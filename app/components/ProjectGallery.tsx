'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  _id: string;
  title: string;
  image: string;
  hoverTitle: string;
  hoverText: string;
  status: 'ongoing' | 'completed' | 'upcoming' | 'soldout';
  isActive: boolean;
  category?: string;
}

const ViewProjectsPage: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // shared position state
  const [position, setPosition] = useState(0);

  // fixed card width (px)
  const itemWidth = 288;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const res = await fetch('/api/projects');
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle different API response structures
        let projects: Project[] = [];
        
        if (Array.isArray(data)) {
          // If the API returns an array directly
          projects = data;
        } else if (data.data && Array.isArray(data.data)) {
          // If the API returns { data: [], success: boolean }
          projects = data.data;
        } else if (data.projects && Array.isArray(data.projects)) {
          // If the API returns { projects: [] }
          projects = data.projects;
        } else {
          throw new Error('Unexpected API response format');
        }
        
        setAllProjects(projects);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(projects.map((project: Project) => project.category || 'uncategorized'))
        );
        setCategories(['all', ...uniqueCategories]);

        // Filter only active projects for display
        const active = projects.filter((project: Project) => project.isActive);
        setActiveProjects(sortProjectsByStatus(active));
        setShowArrows(active.length > 0);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        console.error('Failed to fetch projects:', errorMessage);
        setError(`Failed to load projects: ${errorMessage}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Sort projects with soldout first, then by status
  const sortProjectsByStatus = (projects: Project[]): Project[] => {
    return [...projects].sort((a, b) => {
      // Sold out projects come first
      if (a.status === 'soldout' && b.status !== 'soldout') return -1;
      if (a.status !== 'soldout' && b.status === 'soldout') return 1;
      
      // Then sort by other statuses if needed
      const statusOrder: Record<string, number> = { 
        soldout: 0, 
        ongoing: 1, 
        completed: 2, 
        upcoming: 3 
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

  // Filter projects by selected category
  useEffect(() => {
    if (allProjects.length === 0) return;
    
    let filtered = allProjects.filter((project: Project) => project.isActive);
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (project: Project) => (project.category || 'uncategorized') === selectedCategory
      );
    }
    
    setActiveProjects(sortProjectsByStatus(filtered));
    setShowArrows(filtered.length > 0);
    
    // Reset position when category changes
    setPosition(0);
  }, [selectedCategory, allProjects]);

  // Auto scroll
  useEffect(() => {
    if (activeProjects.length === 0) return;

    let animationFrameId: number;
    const speed = 1; // scroll speed (px/frame)
    const totalWidth = itemWidth * activeProjects.length;

    const animate = () => {
      if (!isPaused.current && sliderRef.current) {
        setPosition(prev => {
          let newPos = prev - speed;
          if (Math.abs(newPos) >= totalWidth) {
            newPos = 0; // seamless reset
          }
          return newPos;
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const slider = sliderRef.current;
    if (slider) {
      const handleMouseEnter = () => { isPaused.current = true };
      const handleMouseLeave = () => { isPaused.current = false };

      slider.addEventListener('mouseenter', handleMouseEnter);
      slider.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        cancelAnimationFrame(animationFrameId);
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [activeProjects, itemWidth]);

  // Apply transform whenever position changes
  useEffect(() => {
    if (sliderRef.current) {
      if (!isPaused.current) {
        // auto-scroll: no transition (immediate frame updates)
        sliderRef.current.style.transition = 'none';
      } else {
        // arrow click: smooth transition
        sliderRef.current.style.transition = 'transform 0.5s ease';
      }
      sliderRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position]);

  // Pause helper for arrows
  const pauseAutoScroll = () => {
    isPaused.current = true;
    setTimeout(() => {
      isPaused.current = false;
    }, 1500); // 1.5s pause
  };

  // Next button (slide one by one)
  const handleNext = () => {
    if (activeProjects.length === 0) return;
    pauseAutoScroll();

    setPosition(prev => {
      const totalWidth = itemWidth * activeProjects.length;
      let newPos = prev - itemWidth;

      if (Math.abs(newPos) >= totalWidth) {
        return 0; // reset to start
      }
      return newPos;
    });
  };

  // Prev button (slide one by one)
  const handlePrev = () => {
    if (activeProjects.length === 0) return;
    pauseAutoScroll();

    setPosition(prev => {
      let newPos = prev + itemWidth;

      if (newPos > 0) {
        const totalWidth = itemWidth * activeProjects.length;
        return -(totalWidth - itemWidth); // go to last card
      }
      return newPos;
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <FaSpinner className="animate-spin text-4xl text-[#7AA859]" />
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-red-600 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#7AA859] text-white px-4 py-2 rounded-md hover:bg-[#698c4e] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (activeProjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-600 text-lg">
          {allProjects.length === 0 
            ? 'No projects found.' 
            : 'No active projects available at the moment.'
          }
        </p>
        {allProjects.length > 0 && (
          <p className="text-gray-500 text-sm">
            Check back later for new projects!
          </p>
        )}
      </div>
    );
  }

  return (
    <section className="container mx-auto px-3 flex flex-col max-w-7xl gap-10 w-full justify-center mt-20 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-poppins font-bold text-center text-gray-700">
        Turning Ordinary Into Extraordinary!
      </h1>

      {/* Category Filter */}
      {/* {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#7AA859] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )} */}

      <div className="relative w-full overflow-hidden">
        {showArrows && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous projects"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next projects"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </>
        )}
        <div
          ref={sliderRef}
          className="flex gap-10 w-max py-5"
          style={{ willChange: 'transform' }}
        >
          {[...activeProjects, ...activeProjects].map((project, index) => (
            <div key={`${project._id}-${index}`} className="relative group w-72 flex-shrink-0">
              <div
                className={`absolute top-2 right-2 z-10 text-xs font-semibold px-3 py-1 rounded-full shadow capitalize ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'ongoing'
                    ? 'bg-yellow-100 text-yellow-800'
                    : project.status === 'upcoming'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-red-100 text-red-800' // soldout
                }`}
              >
                {project.status}
              </div>

              {/* Sold Out Overlay Image - Reduced to 50% size */}
              {project.status === 'soldout' && (
                <div className="absolute inset-0 z-20 flex justify-start">
                  <div className="relative w-1/2 h-1/2">
                    <Image
                      src="/img/soldout.png"
                      alt="Sold Out"
                      fill
                      className="object-contain opacity-90"
                    />
                  </div>
                </div>
              )}

              <span className="flex flex-col justify-center items-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={320}
                  height={240}
                  className="w-full h-full object-cover rounded-xl"
                />
                <h1 className="-mt-10 text-xl font-poppins font-semibold bg-black text-white w-full py-2 text-center rounded-b-xl">
                  {project.title}
                </h1>
              </span>

              <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center opacity-0 rounded-xl group-hover:opacity-70 transition-opacity duration-300 p-5 text-center font-sans">
                <h2 className="text-xl font-bold text-gray-100">{project.hoverTitle}</h2>
                <p className="text-gray-50 text-lg mt-2 mb-6">
                  {project.hoverText.length > 100
                    ? `${project.hoverText.slice(0, 100)}...`
                    : project.hoverText}
                </p>
                <Link
                  href={`/projects/${project._id}`}
                  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewProjectsPage;