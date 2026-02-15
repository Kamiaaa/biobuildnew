import Link from 'next/link';
import React from 'react';
import { RiArtboard2Fill } from 'react-icons/ri';
import { FaUserTie, FaChartLine, FaHandshake } from 'react-icons/fa';

interface Director {
    name: string;
    title: string;
    image: string;
    bio: string;
    link: string;
    linkedin?: string;
    twitter?: string;
}

export default function ManagementTeam() {
    const directors: Director[] = [
        {
            name: "Architect Md. Mamunur Rahman (Munim)",
            title: "MANAGING DIRECTOR",
            image: "/img/bod/md.jpg",
            bio: "Our managing director Architect Md Mamunur Rahman (Munim) plays a pivotal role as an organizer at BIOBUILD Development Ltd, bringing visionary leadership to our projects.",
            link: "/managing-director",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "M. M. Rahman Mamun",
            title: "DEPUTY MANAGING DIRECTOR",
            image: "/img/bod/dmd.jpg",
            bio: "Since 2012, M. M. RAHMAN MAMUN has been actively engaged in the Real Estate Industry, bringing extensive expertise, deep sincerity, and unwavering dedication.",
            link: "/dm-director",
            linkedin: "#",
            twitter: "#"
        },
        {
            name: "Md. Sujal Ahmed Talukder",
            title: "DIRECTOR & CEO",
            image: "/img/bod/ceo.jpg",
            bio: "Our journey begins with a shared vision—to create innovative, eco-friendly spaces that redefine urban living while contributing to a sustainable future.",
            link: "/ceo",
            linkedin: "#",
            twitter: "#"
        },
        {
          name: "Lt Cdr Tauhid Hossain (Retd)",
          title: "HEAD OF OPERATIONS",
          image: "/img/bod/hoo.jpg",
          bio: "Lt Cdr Tauhid Hossain (Retd) currently acting as the Head of Operations, leveraging his notable military background to effectively manage substantial responsibilities within the company’s operational structure. He supervises a range of tasks and initiatives, ensuring their seamless implementation and alignment with company protocols. His leadership style embodies a dedication to excellence and a comprehensive grasp of operational intricacies. Through his guidance, operational goals are attained with efficiency and precision.",
          link: "coo",
          linkedin: "#",
          twitter: "#"
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Hero Section with Background Image */}
            <section className="relative px-4 py-32 text-center bg-gray-900 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Corporate boardroom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins tracking-tight text-white mb-6">
                        Management Team
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-gray-100">
                        Meet the visionary leaders guiding our company's strategic direction and operational excellence.
                    </p>
                </div>
            </section>

            {/* Directors Grid - Stylish Card Design */}
            <section className="px-4 py-10 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
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
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-poppins font-bold text-center dark:text-gray-50 mb-4">
                            Our Management Team
                        </h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
                            Experienced professionals committed to innovation and sustainable development
                        </p>
                        <div className="flex flex-col items-center p-10">
  {/* Board of Directors */}
  <div className="relative flex flex-col items-center">
    <div className="bg-[#7AA859] rounded-full px-6 py-3 text-white text-center">
      Board of Directors
    </div>

    {/* Curved connector to Head of Operations */}
    <svg className="w-10 h-10" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 C10 10, 10 30, 10 40" stroke="black" strokeWidth="2"/>
    </svg>
  </div>

  {/* Head of Operations */}
  <div className="relative flex flex-col items-center mt-2">
    <div className="bg-[#7AA859] rounded-full px-6 py-3 text-white text-center">
      Head of Operations
    </div>

    {/* Curved connector down to department line */}
    <svg className="w-10 h-10" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 C10 10, 10 30, 10 40" stroke="black" strokeWidth="2"/>
    </svg>
  </div>

  {/* Departments */}
  <div className="relative flex flex-col items-center mt-4 w-full max-w-6xl">
    {/* Horizontal Line across departments */}
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-black"></div>

    {/* Departments in a row */}
    <div className="flex justify-between w-full">
      {[
        "HR & Admin",
        "Marketing",
        "Sales",
        "Accounts & Purchase",
        "Finance",
        "Construction Management",
        "Land & Legal",
      ].map((dept, index) => (
        <div key={index} className="flex flex-col items-center">
          {/* Curved vertical connector */}
          <svg className="w-10 h-10" viewBox="0 0 20 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0 C10 10, 10 30, 10 40" stroke="black" strokeWidth="2"/>
          </svg>

          {/* Department oval */}
          <div className="bg-[#7AA859] rounded-full px-4 py-2 text-white text-center whitespace-nowrap mt-1">
            {dept}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {directors.map((director, index) => (
                            <div key={index} className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                                <img
                                    src={director.image}
                                    alt={director.name}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold dark:text-gray-50 mb-1">{director.name}</h3>
                                    <p className="text-[#7AA859] mb-4">{director.title}</p>
                                    <p className="text-gray-600 dark:text-gray-300">
                                        {director.bio.length > 150
                                            ? `${director.bio.slice(0, 150)}...`
                                            : director.bio}
                                    </p>
                                </div>
                                <div className="py-10 flex justify-center items-center">
                                    <Link href={director.link}>
                                        <button className="px-4 py-2 bg-[#7AA859] hover:bg-[#6a974f] text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2">
                                            View Profile
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
            {/* CTA Section */}
            {/* <section className="px-4 py-20 bg-gradient-to-r from-[#7AA859] to-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More About Our Leadership?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-100">
            Discover how our board's expertise drives innovation and excellence in every project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#7AA859] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              Our Governance
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#7AA859] transition shadow-lg">
              Contact the Board
            </button>
          </div>
        </div>
      </section> */}
        </div>
    );
}