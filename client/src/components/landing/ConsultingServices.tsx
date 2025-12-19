import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, Target, Zap, Shield, ArrowRight } from 'lucide-react';

export default function ConsultingServices() {
    return (
        <section className="bg-[#1a1a2e] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#00c853] text-sm font-medium uppercase tracking-wider">
                            Consulting & Services
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 leading-tight">
                            High-impact Solutions Powered by World-class Talent and Agile Teams
                        </h2>
                        <p className="mt-6 text-lg text-gray-400 leading-relaxed">
                            TalentX solves complex business challenges with outcome-oriented services
                            and solutions tailored to your needs. From technology to marketing to
                            management consulting, we offer everything you need to achieve your goals.
                        </p>
                        <Button className="mt-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1a1a2e] font-medium px-8 py-6 text-base rounded-md transition-all">
                            Explore Consulting & Services
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </motion.div>

                    {/* Right Content - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 gap-6"
                    >
                        {[
                            { icon: Sparkles, title: "AI & Innovation", desc: "Cutting-edge solutions" },
                            { icon: Target, title: "Strategy", desc: "Data-driven insights" },
                            { icon: Zap, title: "Speed", desc: "Rapid deployment" },
                            { icon: Shield, title: "Quality", desc: "Top 3% talent" }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                            >
                                <feature.icon className="w-8 h-8 text-[#00c853] mb-4" />
                                <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                                <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}