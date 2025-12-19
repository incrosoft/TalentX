'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, TrendingUp, BarChart3, Briefcase, Users, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: Code,
        title: "Developers",
        description: "Software engineers who build scalable solutions",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Palette,
        title: "Designers",
        description: "UX/UI experts creating beautiful experiences",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: TrendingUp,
        title: "Marketing Experts",
        description: "Growth specialists driving business results",
        color: "bg-green-50 text-green-600"
    },
    {
        icon: BarChart3,
        title: "Finance Experts",
        description: "CFOs and financial analysts for strategic insights",
        color: "bg-orange-50 text-orange-600"
    },
    {
        icon: Briefcase,
        title: "Product Managers",
        description: "Leaders who ship products users love",
        color: "bg-pink-50 text-pink-600"
    },
    {
        icon: Users,
        title: "Project Managers",
        description: "Experts who deliver projects on time",
        color: "bg-cyan-50 text-cyan-600"
    }
];

export default function WorldClassTalent() {
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
                        Leverage World-class Talent
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        We are the largest, globally distributed network of top business, design,
                        and technology talent, ready to tackle your most important initiatives.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-gray-300 transition-all cursor-pointer"
                        >
                            <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4`}>
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {service.description}
                            </p>
                            <div className="flex items-center gap-2 text-[#00c853] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <span>Hire {service.title}</span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}