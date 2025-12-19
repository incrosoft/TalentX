'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const caseStudies = [
    {
        title: "Bridgestone",
        description: "How TalentX helped Bridgestone build a next-gen digital solution.",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop",
        category: "Automotive"
    },
    {
        title: "Duolingo",
        description: "Scaling engineering capacity for the world's #1 education app.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        category: "Education"
    },
    {
        title: "Shopify",
        description: "Optimizing e-commerce infrastructure with elite developers.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        category: "E-commerce"
    },
    {
        title: "Cleveland Clinic",
        description: "Modernizing healthcare delivery through digital transformation.",
        image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=600&fit=crop",
        category: "Healthcare"
    }
];

export default function CaseStudiesGrid() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={study.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-6">
                                <img
                                    src={study.image}
                                    alt={study.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                        <Play className="w-6 h-6 text-[#204ecf] fill-current ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-[#204ecf] uppercase tracking-widest mb-2 block">{study.category}</span>
                                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2 group-hover:text-[#204ecf] transition-colors">{study.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{study.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
