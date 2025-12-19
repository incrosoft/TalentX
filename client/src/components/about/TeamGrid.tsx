'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface TeamGridProps {
    title: string;
    members: TeamMember[];
}

export default function TeamGrid({ title, members }: TeamGridProps) {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-[#1a1a2e]">{title}</h2>
                    <div className="mt-4 w-20 h-1 bg-[#204ecf] mx-auto rounded-full" />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a2e] mb-1">{member.name}</h3>
                            <p className="text-[#204ecf] font-medium text-sm uppercase tracking-wider">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
