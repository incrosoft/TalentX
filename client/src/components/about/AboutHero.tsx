'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutHero() {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/brain/1a935bd0-9de0-49e3-b202-5f568255f370/about_hero_bg_1766121209546.png"
                    alt="TalentX Team"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1a1a2e]/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-secondary uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        About TalentX
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        We connect the world's <br />
                        <span className="text-secondary">top talent</span> with the world's <br />
                        top organizations.
                    </h1>
                </motion.div>
            </div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
        </section>
    );
}
