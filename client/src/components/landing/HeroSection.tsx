import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState('talent');

    return (
        <section className="bg-white pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <span>I'm looking for</span>
                        <div className="inline-flex bg-gray-100 rounded-full p-1">
                            <button
                                onClick={() => setActiveTab('talent')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'talent'
                                    ? 'bg-white text-[#1a1a2e] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Talent
                            </button>
                            <button
                                onClick={() => setActiveTab('consulting')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'consulting'
                                    ? 'bg-white text-[#1a1a2e] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Consulting & Services
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a2e] leading-tight">
                            Hire the{' '}
                            <span className="underline decoration-[#00c853] decoration-4 underline-offset-4">
                                Top 3%
                            </span>{' '}
                            of the World's Talent™
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            TalentX is an exclusive network of the top software developers, designers,
                            marketing experts, management consultants, product managers, and project managers
                            in the world. Top companies hire TalentX talent for their most important projects.
                        </p>
                        <Button className="mt-8 bg-[#00c853] hover:bg-[#00a844] text-white font-medium px-8 py-6 text-lg rounded-md">
                            Hire Top Talent
                        </Button>
                    </motion.div>

                    {/* Right Content - Featured Talent */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=700&fit=crop"
                                alt="Featured Talent"
                                className="w-full max-w-md mx-auto rounded-lg"
                            />

                            {/* World Map Background */}
                            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                    <circle cx="20" cy="30" r="1" fill="#1a1a2e" />
                                    <circle cx="40" cy="25" r="1" fill="#1a1a2e" />
                                    <circle cx="60" cy="35" r="1" fill="#1a1a2e" />
                                    <circle cx="80" cy="40" r="1" fill="#1a1a2e" />
                                    <circle cx="30" cy="50" r="1" fill="#1a1a2e" />
                                    <circle cx="50" cy="55" r="1" fill="#1a1a2e" />
                                    <circle cx="70" cy="60" r="1" fill="#1a1a2e" />
                                </svg>
                            </div>

                            {/* Talent Card Overlay */}
                            <div className="absolute top-8 right-0 lg:-right-8 bg-white rounded-xl shadow-xl p-6 w-64">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-2 h-2 bg-[#00c853] rounded-full"></div>
                                    <span className="text-xs text-gray-500">Available Now</span>
                                </div>
                                <h3 className="font-semibold text-[#1a1a2e]">Sarah Chen</h3>
                                <div className="flex items-center gap-1 mt-1">
                                    <CheckCircle className="w-4 h-4 text-[#00c853]" />
                                    <span className="text-sm text-[#00c853] font-medium">Verified Expert</span>
                                    <span className="text-sm text-gray-400">in Design</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Product Designer</p>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Previously at</p>
                                    <div className="mt-2 text-xl font-semibold text-gray-800">Apple</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}