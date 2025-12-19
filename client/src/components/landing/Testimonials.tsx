'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "TalentX's quality of talent is exceptional. We were able to hire a senior engineer within 48 hours who hit the ground running.",
        author: "Sarah Mitchell",
        role: "CTO, TechStart Inc",
        company: "TechStart",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
    },
    {
        quote: "The screening process is rigorous. Every candidate we interviewed was technically strong and culturally aligned with our team.",
        author: "Michael Chen",
        role: "VP Engineering, DataFlow",
        company: "DataFlow",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        quote: "We scaled our design team from 2 to 10 in just two months. TalentX made what seemed impossible, possible.",
        author: "Emily Rodriguez",
        role: "Head of Design, Innovate Co",
        company: "Innovate Co",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
];

export default function Testimonials() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        See what our clients say about working with TalentX talent
                    </p>
                </motion.div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.author}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow"
                        >
                            {/* Quote Icon */}
                            <Quote className="w-10 h-10 text-[#00c853]/20 mb-4" />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-700 leading-relaxed mb-6">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.author}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-[#1a1a2e]">{testimonial.author}</p>
                                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}