'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ClientsHero() {
    return (
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/brain/1a935bd0-9de0-49e3-b202-5f568255f370/clients_hero_bg_1766122526029.png"
                    alt="Clients Partnership"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#1a1a2e]/50 backdrop-blur-[1px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Client Case Studies
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-medium">
                        Trusted by Leading Companies Around the World
                    </p>
                </motion.div>
            </div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    );
}
