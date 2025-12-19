'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, ChevronLeft, Upload, CheckCircle2 } from 'lucide-react';

interface ApplyFormProps {
    onSuccess: () => void;
}

export default function ApplyForm({ onSuccess }: ApplyFormProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        role: '',
        linkedin: '',
        portfolio: '',
        experience: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            onSuccess();
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-100 flex">
                <motion.div
                    className="h-full bg-[#204ecf]"
                    initial={{ width: '0%' }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <form onSubmit={handleSubmit} className="p-12">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">Basic Information</h2>
                                <p className="text-gray-500">Let's start with the basics to get to know you.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#204ecf] focus:ring-[#204ecf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#204ecf] focus:ring-[#204ecf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Primary Role</Label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full h-12 rounded-xl border border-gray-200 px-4 focus:outline-none focus:border-[#204ecf] focus:ring-1 focus:ring-[#204ecf] bg-white text-sm"
                                >
                                    <option value="">Select a role</option>
                                    <option value="developer">Software Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="finance">Finance Expert</option>
                                    <option value="product">Product Manager</option>
                                    <option value="project">Project Manager</option>
                                </select>
                            </div>

                            <Button
                                type="button"
                                onClick={nextStep}
                                className="w-full h-14 bg-[#204ecf] hover:bg-[#1a3da8] text-white font-bold rounded-xl mt-8"
                            >
                                Next Step
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">Professional Details</h2>
                                <p className="text-gray-500">Tell us about your professional background.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                                <Input
                                    id="linkedin"
                                    name="linkedin"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedin}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#204ecf] focus:ring-[#204ecf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                                <Input
                                    id="portfolio"
                                    name="portfolio"
                                    placeholder="https://yourportfolio.com"
                                    value={formData.portfolio}
                                    onChange={handleInputChange}
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#204ecf] focus:ring-[#204ecf]"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="experience">Years of Experience</Label>
                                <Input
                                    id="experience"
                                    name="experience"
                                    type="number"
                                    placeholder="5"
                                    value={formData.experience}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12 rounded-xl border-gray-200 focus:border-[#204ecf] focus:ring-[#204ecf]"
                                />
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    className="flex-1 h-14 border-2 border-gray-100 font-bold rounded-xl"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex-[2] h-14 bg-[#204ecf] hover:bg-[#1a3da8] text-white font-bold rounded-xl"
                                >
                                    Next Step
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#1a1a2e] mb-2">Resume & CV</h2>
                                <p className="text-gray-500">Upload your latest resume to complete the application.</p>
                            </div>

                            <div className="border-2 border-dashed border-gray-200 rounded-[2rem] p-12 text-center hover:border-[#204ecf] transition-colors cursor-pointer group">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#204ecf] group-hover:text-white transition-colors">
                                    <Upload className="w-8 h-8 text-[#204ecf] group-hover:text-white" />
                                </div>
                                <p className="font-bold text-[#1a1a2e] mb-1">Click to upload or drag and drop</p>
                                <p className="text-sm text-gray-500">PDF, DOCX (Max 10MB)</p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <CheckCircle2 className="w-5 h-5 text-[#204ecf]" />
                                <p className="text-xs text-gray-600">By submitting, you agree to our Terms of Service and Privacy Policy.</p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    className="flex-1 h-14 border-2 border-gray-100 font-bold rounded-xl"
                                >
                                    <ChevronLeft className="w-5 h-5 mr-2" />
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    className="flex-[2] h-14 bg-[#00c853] hover:bg-[#009624] text-white font-bold rounded-xl shadow-lg shadow-green-900/20"
                                >
                                    Submit Application
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </div>
    );
}
