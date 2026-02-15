'use client';

import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';
import { useState } from 'react';

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
    setLoading(false);
    (e.target as HTMLFormElement).reset(); // ফর্ম রিসেট
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2070&q=80"
            alt="Office workspace background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" />
        </div>

        <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl text-white sm:text-5xl lg:text-6xl">Let's Connect</h1>
            <p className="mt-6 text-xl text-blue-100">
              We'd love to hear from you! Fill out the form below and we'll get back to you soon.
            </p>
            <div className="mt-10 flex justify-center">
              <a href="#contact-form" className="inline-flex items-center px-6 py-3 text-[#7AA859] bg-white rounded-md">
                <HiOutlineMail className="-ml-1 mr-2 h-5 w-5" /> Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="py-10 px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
          <div className="mb-6">
            <Link href="/">
              <button className="flex items-center text-[#7AA859] hover:text-green-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Home
              </button>
            </Link>
          </div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-poppins text-gray-900 sm:text-3xl">
              Send us a message
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 sm:mt-4">
              Have a project in mind or want to collaborate? Fill out the form below and we'll get back to you soon.
            </p>
          </div>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Info */}
            <div className="bg-gradient-to-br from-[#7AA859] to-green-700 p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="mb-8">Fill out the form or use the contact details below to get in touch with us.</p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaEnvelope className="h-5 w-5 text-blue-200 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-100">Email</h3>
                    <p>info@biobuildbd.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaPhone className="h-5 w-5 text-blue-200 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-100">Phone</h3>
                    <p>+88017 51 51 12 12</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-5 w-5 text-blue-200 mt-1" />
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-blue-100">Office</h3>
                    <a href='https://maps.app.goo.gl/ZJ7UaMR8i1KNWVPM7' target='_blank'><p>Head Office: House: 05, Road 20, Sector 13, Uttara, Dhaka-1230</p></a>
                    <a href='https://maps.app.goo.gl/i2JDPi3FHYFwsf3T8' target='_blank'><p className='pt-2'>Jolshiri Abashon: House: 06, Road: 503A, Sector: 16, Jolshiri Abashon.</p></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <input name="name" type="text" required placeholder="Your Name"
                  className="w-full p-3 border rounded-md" />
                <input name="email" type="email" required placeholder="Your Email"
                  className="w-full p-3 border rounded-md" />
                <input name="phone" type="tel" placeholder="+8801 000 0000"
                  className="w-full p-3 border rounded-md" />
                <textarea name="message" required rows={4} placeholder="How can we help you?"
                  className="w-full p-3 border rounded-md"></textarea>

                <button type="submit" disabled={loading}
                  className="w-full flex justify-center items-center px-6 py-3 text-white bg-[#7AA859] hover:bg-green-700 rounded-md">
                  {loading ? "Sending..." : "Send Message"}
                  <FiSend className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
