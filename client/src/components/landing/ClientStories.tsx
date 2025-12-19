'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Story {
    id: string;
    clientName: string;
    role: string;
    company: string;
    quote: string;
    thumbnail: string;
    videoUrl: string; // In a real app, this would be a video ID or URL
}

const stories: Story[] = [
    {
        id: '1',
        clientName: 'Sarah Jenkins',
        role: 'CTO',
        company: 'TechFlow',
        quote: "TalentX helped us scale our engineering team from 5 to 50 in just 3 months. The quality of talent is unmatched.",
        thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        videoUrl: '#'
    },
    {
        id: '2',
        clientName: 'David Chen',
        role: 'Founder',
        company: 'InnovateAI',
        quote: "We needed specialized AI researchers, and traditional hiring wasn't working. TalentX found us the perfect match in 48 hours.",
        thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
        videoUrl: '#'
    },
    {
        id: '3',
        clientName: 'Elena Rodriguez',
        role: 'VP of Product',
        company: 'GlobalPay',
        quote: "The ability to hire entire pre-vetted teams changed our roadmap. We launched our mobile app 2 months ahead of schedule.",
        thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
        videoUrl: '#'
    }
];

export default function ClientStories() {
    const [selectedStory, setSelectedStory] = useState<Story | null>(null);

    return (
        <section className="py-24 bg-white text-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Organizations Choose TalentX</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Hear directly from the leaders who are building the future with our talent.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                            onClick={() => setSelectedStory(story)}
                        >
                            {/* Card Content */}
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800 shadow-2xl">
                                <img
                                    src={story.thumbnail}
                                    alt={story.clientName}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
                                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-white">
                                    <Quote className="w-8 h-8 text-white mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                                    <p className="text-lg font-medium leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                                        "{story.quote}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center font-bold text-white">
                                            {story.company[0]}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{story.clientName}</h4>
                                            <p className="text-sm text-white/80">{story.role}, {story.company}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                        onClick={() => setSelectedStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
                                onClick={() => setSelectedStory(null)}
                            >
                                <X className="w-6 h-6" />
                            </Button>

                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-[#204ecf] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Playing Story: {selectedStory.clientName}</h3>
                                    <p className="text-gray-400">Video playback simulation</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
