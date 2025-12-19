'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Globe, Zap, Shield, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

export default function ApplyTalent() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-[#1a1a2e] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/90 to-transparent"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Join the <span className="text-[#00c853]">Top 3%</span> of Global Talent
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                            TalentX is an exclusive network of the world's top freelancers.
                            We connect the best software developers, designers, and finance experts
                            with top companies.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={createPageUrl('Apply')}>
                                <Button className="bg-[#00c853] hover:bg-[#009624] text-white font-bold py-6 px-8 text-lg rounded-lg shadow-lg shadow-green-900/20">
                                    Apply Now
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold py-6 px-8 text-lg rounded-lg">
                                How it Works
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#1a1a2e] mb-4">Why Top Talent Joins TalentX</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We provide the freedom of freelancing with the stability of full-time employment.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Globe,
                                title: 'Work from Anywhere',
                                description: 'Choose your own schedule and work from anywhere in the world. We are a 100% remote network.'
                            },
                            {
                                icon: DollarSign,
                                title: 'Top Compensation',
                                description: 'Set your own rates. Our experts earn significantly more than the industry average.'
                            },
                            {
                                icon: Zap,
                                title: 'Exciting Projects',
                                description: 'Work on challenging projects with leading Fortune 500 companies and innovative startups.'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <item.icon className="w-8 h-8 text-[#204ecf]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Process */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-6">The Screening Process</h2>
                            <p className="text-lg text-gray-600 mb-8">
                                Our rigorous screening process ensures that we only accept the very best.
                                It's tough, but the rewards are worth it.
                            </p>

                            <div className="space-y-8">
                                {[
                                    {
                                        step: '01',
                                        title: 'Language & Personality',
                                        desc: 'We evaluate communication skills and personality traits to ensure a great cultural fit.'
                                    },
                                    {
                                        step: '02',
                                        title: 'In-Depth Skill Review',
                                        desc: 'We test your technical knowledge and problem-solving abilities through various assessments.'
                                    },
                                    {
                                        step: '03',
                                        title: 'Live Screening',
                                        desc: 'You will be interviewed by screeners who are experts in your functional domain.'
                                    },
                                    {
                                        step: '04',
                                        title: 'Test Projects',
                                        desc: 'We assign a test project to see how you perform in a real-world scenario.'
                                    }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <div className="font-bold text-3xl text-gray-200">{step.step}</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">{step.title}</h4>
                                            <p className="text-gray-600">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl transform rotate-3 opacity-10"></div>
                            <div className="bg-white rounded-2xl shadow-xl p-8 relative z-10 border border-gray-100">
                                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-6">Ready to join?</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                        <CheckCircle className="w-5 h-5 text-[#00c853]" />
                                        <span className="font-medium text-gray-800">Access to top clients</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                        <CheckCircle className="w-5 h-5 text-[#00c853]" />
                                        <span className="font-medium text-gray-800">Guaranteed payments</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                        <CheckCircle className="w-5 h-5 text-[#00c853]" />
                                        <span className="font-medium text-gray-800">Career growth support</span>
                                    </div>
                                </div>
                                <Link href={createPageUrl('Interview')} className="w-full">
                                    <Button className="w-full mt-8 bg-[#204ecf] hover:bg-[#1a3da8] text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-blue-900/20">
                                        Start Your Application
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
