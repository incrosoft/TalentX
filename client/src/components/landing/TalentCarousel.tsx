'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, Palette, TrendingUp, BarChart3, Briefcase, Megaphone } from 'lucide-react';

const talents = [
    {
        id: 1,
        name: "Michael Torres",
        role: "Product Designer",
        expertise: "Design",
        company: "Apple",
        companyLogo: "🍎",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop",
        icon: Palette
    },
    {
        id: 2,
        name: "Emma Johnson",
        role: "React Developer",
        expertise: "Engineering",
        company: "Meta",
        companyLogo: "∞",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop",
        icon: Code
    },
    {
        id: 3,
        name: "David Park",
        role: "Financial Analyst",
        expertise: "Management Consulting",
        company: "McKinsey",
        companyLogo: "M",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
        icon: BarChart3
    },
    {
        id: 4,
        name: "Lisa Wang",
        role: "iOS Developer",
        expertise: "Engineering",
        company: "Google",
        companyLogo: "G",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop",
        icon: Code
    },
    {
        id: 5,
        name: "James Wilson",
        role: "Product Manager",
        expertise: "Product Management",
        company: "SpaceX",
        companyLogo: "🚀",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop",
        icon: Briefcase
    },
    {
        id: 6,
        name: "Anna Martinez",
        role: "Marketing Strategist",
        expertise: "Marketing",
        company: "Uber",
        companyLogo: "U",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop",
        icon: Megaphone
    }
];

export default function TalentCarousel() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = 320;
            const newPosition = direction === 'left'
                ? Math.max(0, scrollPosition - scrollAmount)
                : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);

            container.scrollTo({ left: newPosition, behavior: 'smooth' });
            setScrollPosition(newPosition);
        }
    };

    return (
        <section className="bg-white py-8 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative">
                    {/* Navigation Arrows */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Carousel */}
                    <div
                        ref={containerRef}
                        className="flex gap-4 overflow-x-auto scrollbar-hide px-12 pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {talents.map((talent, index) => (
                            <motion.div
                                key={talent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-72"
                            >
                                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
                                    <div className="flex flex-col h-full">
                                        {/* Image */}
                                        <div className="w-full h-48 relative overflow-hidden">
                                            <img
                                                src={talent.image}
                                                alt={talent.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                                                <talent.icon className="w-4 h-4 text-primary" />
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            <h3 className="font-bold text-[#1a1a2e] text-lg">{talent.name}</h3>
                                            <p className="text-sm text-primary font-medium mb-4">{talent.role}</p>

                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Previously at</p>
                                                    <div className="flex items-center gap-1.5 mt-1">
                                                        <span className="text-lg">{talent.companyLogo}</span>
                                                        <span className="text-sm font-semibold text-gray-700">{talent.company}</span>
                                                    </div>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}