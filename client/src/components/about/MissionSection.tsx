'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MissionSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-[#204ecf] uppercase mb-4">Our Mission</h2>
                        <h3 className="text-4xl font-bold text-[#1a1a2e] mb-8 leading-tight">
                            Democratizing access to the world's best talent.
                        </h3>
                        <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                            <p>
                                TalentX was founded with a simple yet ambitious goal: to break down the barriers between the world's most talented professionals and the organizations that need their expertise.
                            </p>
                            <p>
                                We believe that talent is distributed globally, but opportunity is not. By building an exclusive network of the top 3% of freelance talent, we enable companies to scale faster, innovate harder, and build better products, regardless of geography.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071823991-b96c0d3bbcc3?w=800&h=600&fit=crop"
                                alt="Collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/10 rounded-full -z-10 blur-2xl" />
                        <div className="absolute -top-6 -left-6 w-48 h-48 bg-primary/10 rounded-full -z-10 blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
