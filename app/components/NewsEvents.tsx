'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaNewspaper, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

interface NewsEvent {
    _id: string;
    title: string;
    date: string;
    summary: string;
    image: string;
    type: 'news' | 'event';
    location?: string;
}

export default function NewsAndEventsPage() {
    const [news, setNews] = useState<NewsEvent[]>([]);
    const [events, setEvents] = useState<NewsEvent[]>([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const limit = 6; // items per page

    useEffect(() => {
        const fetchNewsEvents = async () => {
            try {
                const res = await fetch(`/api/news-events?page=${page}&limit=${limit}`, {
                    cache: 'no-store',
                });
                const json = await res.json();

                const newsItems = json.data.filter((item: NewsEvent) => item.type === 'news');
                const eventItems = json.data.filter((item: NewsEvent) => item.type === 'event');

                setNews(newsItems);
                setEvents(eventItems);
                setTotalItems(json.total);
            } catch (error) {
                console.error('Error fetching news and events:', error);
            }
        };

        fetchNewsEvents();
    }, [page]);

    const totalPages = Math.ceil(totalItems / limit);

    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Hero Section with Background Image */}

            {/* News Section */}
            <section id="news-section" className="px-4 py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Back to Home Button */}
                    <div className="mb-6"></div>
                    <h3 className="text-2xl md:text-3xl font-semibold mb-8 flex items-center text-gray-900 dark:text-gray-50">
                        <FaNewspaper className="mr-3 text-[#7AA859]" />
                        Latest News
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.map((item) => (
                            <NewsCard key={item._id} item={item} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Professional Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center my-12">
                    <nav className="flex items-center space-x-2">
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            disabled={page === 1}
                            className="flex items-center justify-center w-10 h-10 text-gray-500 transition-colors duration-150 rounded-full dark:text-gray-400 hover:bg-[#7AA859] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous page"
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                            // Show limited page numbers with ellipsis for many pages
                            if (
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= page - 1 && pageNumber <= page + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNumber}
                                        onClick={() => setPage(pageNumber)}
                                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-150 ${
                                            page === pageNumber
                                                ? 'bg-[#7AA859] text-white'
                                                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`}
                                        aria-label={`Page ${pageNumber}`}
                                        aria-current={page === pageNumber ? 'page' : undefined}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            } else if (
                                (pageNumber === page - 2 && page > 3) ||
                                (pageNumber === page + 2 && page < totalPages - 2)
                            ) {
                                return (
                                    <span key={pageNumber} className="px-2 text-gray-500 dark:text-gray-400">
                                        ...
                                    </span>
                                );
                            }
                            return null;
                        })}

                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={page === totalPages}
                            className="flex items-center justify-center w-10 h-10 text-gray-500 transition-colors duration-150 rounded-full dark:text-gray-400 hover:bg-[#7AA859] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next page"
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}

// Card Components (remain the same as before)
function NewsCard({ item }: { item: NewsEvent }) {
    return (
        <div className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300">
            <div className="h-auto overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
                <span className="text-sm text-[#7AA859]">{item.date}</span>
                <h4 className="text-xl font-semibold my-2 group-hover:text-[#7AA859] transition-colors duration-300">
                    {item.title.length > 50
                        ? `${item.title.slice(0, 50)}...`
                        : item.title}
                </h4>
                <p className="text-gray-500 text-sm">
                    {item.summary.length > 100
                        ? `${item.summary.slice(0, 100)}...`
                        : item.summary}
                </p>
            </div>
            <div className="px-6 pb-6">
                <Link href={`/news-events/${item._id}`}>
                    <button className="text-[#7AA859] font-medium hover:underline">Read More →</button>
                </Link>
            </div>
        </div>
    );
}