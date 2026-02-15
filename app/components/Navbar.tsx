"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <nav className="h-24 bg-gray-900 shadow-lg fixed w-full z-80">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-24 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/img/header-logo.png"
                alt="logo"
                height={200}
                width={200}
                className="w-40 h-auto"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="flex md:flex">
            {!isOpen && (
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      {isDesktop && (
        <div
          ref={menuRef}
          className={`fixed top-0 right-0 min-h-screen w-80 bg-gray-900/70 shadow-lg transform transition-transform duration-500 ease-in-out ${isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
            }`}
        >
          <div className="px-8 py-56 space-y-4">
            {/* Close button positioned at top right */}
            <div className="absolute top-24 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className=""
              >
                <RxCrossCircled className="text-gray-50 hover:text-red-500 font-bold text-4xl transition" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-white"
              >
                HOME
              </Link>

            </div>


            {/* About */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("about")}
                className="flex items-center gap-1 text-lg font-medium text-gray-300 hover:text-white"
              >
                ABOUT US{" "}
                {openSubmenu === "about" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "about" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    href="/story"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/bod"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Board of Directors
                  </Link>
                  <Link
                    href="/management-team"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Management Team
                  </Link>
                  <Link
                    href="/mission-vision"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Mission and Vision
                  </Link>
                  <Link
                    href="/clients"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Our Clients
                  </Link>
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("projects")}
                className="flex items-center gap-1 text-lg font-medium text-gray-300 hover:text-white"
              >
                PROJECTS{" "}
                {openSubmenu === "projects" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "projects" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    href="/project-status/ongoing"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Ongoing Projects
                  </Link>
                  <Link
                    href="/project-status/completed"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Completed Projects
                  </Link>
                  <Link
                    href="/project-status/upcoming"
                    onClick={() => {
                      setIsOpen(false);
                      setOpenSubmenu(null); // ✅ Close submenu too
                    }}
                    className="block text-lg text-gray-300 hover:text-white font-semibold"
                  >
                    Upcoming Projects
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/news-events"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-300 hover:text-white"
            >
              NEWS & EVENTS
            </Link>
            <Link
              href="/career"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-300 hover:text-white"
            >
              CAREER
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-300 hover:text-white"
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {!isDesktop && (
        <div
          ref={menuRef}
          className={`fixed top-16 left-0 w-full bg-white z-40 shadow-lg transform transition-transform duration-500 ease-in-out ${isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-10 opacity-0 pointer-events-none"
            }`}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-800 hover:text-red-500 font-bold text-2xl w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:border-red-500 transition"
              >
                &times;
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]"
            >
              HOME
            </Link>

            {/* About */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("about")}
                className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]"
              >
                ABOUT US{" "}
                {openSubmenu === "about" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "about" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    href="/story"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Our Story
                  </Link>
                  <Link
                    href="/bod"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Board of Directors
                  </Link>
                  <Link
                    href="/management-team"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Management Team
                  </Link>
                  <Link
                    href="/mission-vision"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Mission and Vision
                  </Link>
                  <Link
                    href="/clients"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Our Clients
                  </Link>
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="relative">
              <button
                onClick={() => toggleSubmenu("projects")}
                className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]"
              >
                PROJECTS{" "}
                {openSubmenu === "projects" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "projects" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link
                    href="/project-status/ongoing"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Ongoing Project
                  </Link>
                  <Link
                    href="/project-status/completed"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Completed Project
                  </Link>
                  <Link
                    href="/project-status/upcoming"
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-gray-700 hover:text-[#7AA859]"
                  >
                    Upcoming Projects
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/news-events"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]"
            >
              NEWS & EVENTS
            </Link>
            <Link
              href="/career"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]"
            >
              CAREER
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]"
            >
              CONTACT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
