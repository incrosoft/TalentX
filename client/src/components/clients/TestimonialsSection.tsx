'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "TalentX has been an invaluable partner in our growth. Their ability to provide top-tier talent on demand has allowed us to scale our engineering team at a pace we never thought possible.",
        author: "John Doe",
        role: "CTO at TechCorp",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
    },
    {
        quote: "The quality of talent we've found through TalentX is unmatched. They truly understand our needs and provide experts who hit the ground running from day one.",
        author: "Jane Smith",
        role: "VP of Engineering at InnovateSoft",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1a1a2e]">What Our Clients Say</h2>
                    <div className="mt-4 w-20 h-1 bg-[#204ecf] mx-auto rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative"
                        >
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-gray-100" />
                            <p className="text-lg text-gray-600 italic mb-8 relative z-10">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-4">
                                <img
                                    src={t.image}
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-bold text-[#1a1a2e]">{t.author}</div>
                                    <div className="text-sm text-gray-500">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
