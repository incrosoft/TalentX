'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function CTASection() {
    return (
        <section className="bg-white border-t border-gray-200 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e]">
                        Ready to Hire Top Talent?
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                        Join thousands of companies who trust TalentX to find their next great hire.
                        Get started in minutes.
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8">
                        {[
                            "No hiring fees",
                            "Risk-free trial period",
                            "24-hour matching"
                        ].map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-gray-700">
                                <CheckCircle className="w-5 h-5 text-[#00c853]" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                        <Link href={createPageUrl('BrowseTalent')}>
                            <Button className="bg-[#204ecf] hover:bg-[#1a3da8] text-white font-medium px-8 py-6 text-lg rounded-md">
                                Hire Top Talent
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </Link>
                        <Link href={createPageUrl('Pricing')}>
                            <Button variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-8 py-6 text-lg rounded-md">
                                View Pricing
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}