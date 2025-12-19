'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, Shield } from 'lucide-react';

const initiatives = [
    {
        icon: Heart,
        title: "TalentX Community",
        description: "We foster a global community where experts can collaborate, share knowledge, and grow together."
    },
    {
        icon: Zap,
        title: "Innovation Fund",
        description: "Supporting groundbreaking projects that push the boundaries of technology and design."
    },
    {
        icon: Shield,
        title: "Ethical Standards",
        description: "Maintaining the highest standards of integrity and transparency in every engagement."
    }
];

export default function ImpactSection() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-sm font-bold tracking-widest text-[#204ecf] uppercase mb-4">Our Impact</h2>
                    <h3 className="text-4xl font-bold text-[#1a1a2e]">Beyond the Network</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {initiatives.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <item.icon className="w-7 h-7 text-primary" />
                            </div>
                            <h4 className="text-xl font-bold text-[#1a1a2e] mb-4">{item.title}</h4>
                            <p className="text-gray-600 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
