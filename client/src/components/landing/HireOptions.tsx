'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { User, Users, Building2 } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function HireOptions() {
    return (
        <section className="bg-white py-20 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] mb-4">
                        Flexible Hiring Options
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                        Whether you need individual talent, a complete team, or a full-service agency,
                        we have the perfect solution for your project
                    </p>
                    <Link href="/global-map">
                        <Button variant="link" className="text-[#204ecf] font-bold hover:no-underline group">
                            Explore our Global Talent Map <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
                        </Button>
                    </Link>
                </motion.div>

                {/* Options Grid - Toptal Style */}
                <div className="grid md:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100 items-center justify-center"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#204ecf] transition-colors">
                            <User className="w-6 h-6 text-[#204ecf] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 text-center">
                            Hire Individual Talent
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-center">
                            Connect with individual experts who are in the top 3% of their field. Perfect for focused expertise and flexible engagement.
                        </p>
                        <Link href={createPageUrl('BrowseTalent')} className='mt-auto w-full'>
                            <Button
                                className="w-full bg-blue-50 text-[#204ecf] hover:bg-[#204ecf] hover:text-white font-medium"
                            >
                                Browse Talent
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100 items-center justify-center"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#204ecf] transition-colors">
                            <Users className="w-6 h-6 text-[#204ecf] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 text-center">
                            Hire Complete Teams
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-center">
                            Get ready-made teams with complementary skills. They've already worked together and can start immediately.
                        </p>
                        <Link href={createPageUrl('BrowseTeams')} className='mt-auto w-full'>
                            <Button
                                className="w-full bg-blue-50 text-[#204ecf] hover:bg-[#204ecf] hover:text-white font-medium"
                            >
                                Browse Teams
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-lg p-8 shadow-md hover:shadow-xl transition-all group flex flex-col h-full border border-gray-100 items-center justify-center"
                    >
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#204ecf] transition-colors">
                            <Building2 className="w-6 h-6 text-[#204ecf] group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-[#1a1a2e] mb-3 text-center">
                            Hire Full Agencies
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed text-center">
                            Partner with established agencies for end-to-end project delivery with full project management and support.
                        </p>
                        <Link href={createPageUrl('BrowseAgencies')} className='mt-auto w-full'>
                            <Button
                                className="w-full bg-blue-50 text-[#204ecf] hover:bg-[#204ecf] hover:text-white font-medium"
                            >
                                Browse Agencies
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}