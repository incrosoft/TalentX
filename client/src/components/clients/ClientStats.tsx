'use client';

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: '10,000+', label: 'Clients Served' },
    { value: '40+', label: 'Industries Served' },
    { value: '50,000+', label: 'Global Talent' },
    { value: '15+', label: 'Years in Business' },
    { value: '150+', label: 'Countries Served' }
];

export default function ClientStats() {
    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-1">{stat.value}</div>
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
