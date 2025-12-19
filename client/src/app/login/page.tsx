'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Briefcase, Shield, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { talentXApi } from '@/api/talentXApi';
import { UserRole } from '@/types';

export default function Login() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<UserRole>('client');

    const handleDemoLogin = async (role: UserRole) => {
        await talentXApi.auth.login(role);
        toast.success(`Logged in as Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`);
        router.push(createPageUrl('Dashboard'));
    };

    const tabs = [
        { id: 'client', label: 'Client', icon: User },
        { id: 'talent', label: 'Talent', icon: Briefcase },
        { id: 'agency', label: 'Agency', icon: Building2 },
        { id: 'admin', label: 'Admin', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side - Image/Brand */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a2e] relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 max-w-md px-8 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Hire the Top 3% of Freelance Talent</h2>
                    <p className="text-gray-300 text-lg leading-relaxed">
                        TalentX connects you with the world's best software developers, designers, and finance experts.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <Link href={createPageUrl('Home')} className="inline-flex items-center text-gray-500 hover:text-[#204ecf] mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your dashboard</p>
                    </div>

                    {/* Role Tabs */}
                    <div className="flex p-1 bg-gray-100 rounded-lg mb-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as UserRole)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab.id
                                    ? 'bg-white text-[#204ecf] shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <Link href="#" className="text-sm text-[#204ecf] hover:underline font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 bg-gray-50 border-gray-200 focus:bg-white transition-all"
                            />
                        </div>
                        <Button className="w-full bg-[#204ecf] hover:bg-[#1a3da8] text-white font-bold py-6 text-lg rounded-lg shadow-lg shadow-blue-900/20">
                            Sign In
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">Or for testing</span>
                            </div>
                        </div>

                        <Button
                            onClick={() => handleDemoLogin(activeTab)}
                            variant="outline"
                            className="w-full border-dashed border-2 border-[#00c853] text-[#00c853] hover:bg-green-50 font-bold py-6 text-lg rounded-lg"
                        >
                            <User className="w-5 h-5 mr-2" />
                            Quick Login (Demo {tabs.find(t => t.id === activeTab)?.label})
                        </Button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link href={createPageUrl('ApplyTalent')} className="text-[#204ecf] hover:underline font-bold">
                                Apply to Join
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
